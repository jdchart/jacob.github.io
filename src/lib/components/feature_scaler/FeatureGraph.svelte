<script>
    import Slider from '$lib/components/feature_scaler/Slider.svelte';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    import { onMount } from 'svelte';
    import { select } from 'd3-selection';
    import { scaleLinear, scaleBand } from 'd3-scale';
    import { line } from 'd3-shape';

    export let label = "";
    export let csv_data;
    export let weight;

    export let playhead_position = 0;

    let min_val;
    let max_val;

    let svg;
    let graph_bind;

    const graph_height = 100;
    const graph_margin = { top: 5, right: 0, bottom: 5, left: 0 };

    export const redraw_playhead = (time) => {
        const width = graph_bind.offsetWidth;
        const playdraw = width * time;
        select(graph_bind).select('svg').select('line').attr('x1', playdraw).attr('x2', playdraw)
    };

    onMount(() => {
        min_val = Math.min(...csv_data);
        max_val = Math.max(...csv_data);

        drawGraphs();

        window.addEventListener('resize', resize_graphs);
    });

    function resize_graphs(){
        select(graph_bind).select('svg').remove();
        drawGraphs();
    }

    function drawGraphs(){

        const width = graph_bind.offsetWidth;
        const playdraw = width * playhead_position;
       
        const svg = select(graph_bind)
            .append('svg')
            .attr('width', width)
            .attr('height', graph_height);

        const x = scaleBand()
            .domain(csv_data.map((d, i) => i))
            .range([graph_margin.left, width - graph_margin.right])
            .padding(0.1);

        const y = scaleLinear()
            .domain([min_val, max_val])
            .range([graph_height - graph_margin.bottom, graph_margin.top]);

        const lineGenerator = line()
            .x((d, i) => x(i) + x.bandwidth() / 2)
            .y(d => y(d));

        svg.append('path')
            .datum(csv_data)
            .attr('fill', 'none')
            .attr('stroke', '#787878')
            .attr('stroke-width', 1.5)
            .attr('d', lineGenerator);

        svg.append('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('x1', playdraw)
            .attr('y1', 0)
            .attr('x2', playdraw)
            .attr('y2', graph_height);

            graph_bind.addEventListener('click', function(event) {
                let clicked_pos = event.offsetX / width;
                dispatch('clicked_graph', {
                    clicked_pos: clicked_pos
                });
            });
    }
</script>

<div class="container">
    <div class="control_panel">
        <h3>
            {label} ({weight / 10}%)
        </h3>

        <Slider
            bind:value={weight}
            label="weight"
        />
    </div>

    <div class="graph_wrap" bind:this={graph_bind}></div>
</div>


<style>
    .container{
        width: 100%;
        /* border: 1px solid grey; */
        padding: 0.2em;
        margin-bottom: 0.2em;
        height: fit-content;

        display: flex;
    }

    .container:hover{
        background-color: rgb(251, 251, 251);
    }

    .graph_wrap{
        width: 80%;
    }

    h3{
        font-size: small;
        padding-bottom: 0.3em;
    }

    .control_panel{
        background-color: rgb(219, 219, 219);
        width: 20%;
        height: 100px;
        margin-right: 0.3em;
        padding: 0.5em;
        overflow: hidden;
    }
</style>
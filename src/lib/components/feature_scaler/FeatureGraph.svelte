<script>
    import Slider from '$lib/components/feature_scaler/Slider.svelte';
    import Toggle from '$lib/components/feature_scaler/Toggle.svelte';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    import { onMount, afterUpdate } from 'svelte';
    import { select } from 'd3-selection';
    import { scaleLinear } from 'd3-scale';
    import { line } from 'd3-shape';

    export let label = "";
    export let csv_data;
    export let weight;
    export let index;

    export let playhead_position = 0;

    let min_val;
    let max_val;

    let svg;
    let graph_bind;

    export let folded = false;

    const graph_height = 100;
    const graph_margin = { top: 5, right: 0, bottom: 5, left: 0 };

    export const redraw_playhead = (time) => {
        const width = graph_bind.offsetWidth;
        const playdraw = width * time;
        select(graph_bind).select('svg').select('line').attr('x1', playdraw).attr('x2', playdraw)
    };

    afterUpdate(() => {
		resize_graphs()
	});

    onMount(() => {
        

        drawGraphs();

        window.addEventListener('resize', resize_graphs);
    });

    export const resize_graphs = () => {
        select(graph_bind).select('svg').remove();
        drawGraphs();
    }

    function drawGraphs(){
        min_val = Math.min(...csv_data);
        max_val = Math.max(...csv_data);

        const width = graph_bind.offsetWidth;
        const playdraw = width * playhead_position;
       
        const svg = select(graph_bind)
            .append('svg')
            .attr('width', width)
            .attr('height', graph_height);

        const x = scaleLinear()
            .domain([0, csv_data.length - 1])
            .range([graph_margin.left, width - graph_margin.right]);

        const y = scaleLinear()
            .domain([min_val, max_val])
            .range([graph_height - graph_margin.bottom, graph_margin.top]);

        const lineGenerator = line()
            .x((d, i) => x(i))
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

    function move_graph(direction){
        dispatch('move_graph', {
            index: index,
            direction : direction
        });
    }
</script>

<div class="outer_container">
    <div class="container {folded == 1 ? 'hidden' : 'not_hidden'}">
        <div class="control_panel">
            <h3>
                {label} ({weight / 10}%)
            </h3>

            <p>{min_val}-{max_val}</p>
    
            <Slider
                bind:value={weight}
                label="weight"
            />
            
            <Toggle
                bind:value={folded}
                label="hide"
            />

            <div class="direction_cont">
                <button on:click={() => {move_graph(1)}}>↑</button>
                <button on:click={() => {move_graph(-1)}}>↓</button>
            </div>
            

        </div>
    
        <div class="graph_wrap" bind:this={graph_bind}></div>
    </div>
    <div class="small_container {folded == 1 ? 'small_not_hidden' : 'small_hidden'}">
        <div class="small_control_panel">
            <h3>
                {label} ({weight / 10}%)
            </h3>
    
            <Toggle
                bind:value={folded}
                label="hide"
            />

        </div>
    </div>
</div>
    


<style>
    .direction_cont{
        display: flex;
        flex-wrap: wrap;
        padding-top: 0.3em;
    }

    .hidden{
       display: none;
    }

    .not_hidden{
        display: flex;
    }

    .small_hidden{
       display: none;
    }

    .small_not_hidden{
        display: flex;
    }

    .small_container{
        width: 100%;
        /* border: 1px solid grey; */
        padding: 0.2em;
        height: fit-content;
    }



    .outer_container{
        width: 100%;
        margin-bottom: 0.2em;
        height: fit-content;
    }
    .container{
        width: 100%;
        /* border: 1px solid grey; */
        padding: 0.2em;
        height: fit-content;
    }

    .container:hover{
        background-color: rgb(251, 251, 251);
    }

    .graph_wrap{
        width: 80%;
    }

    h3{
        font-size: 0.7em;
        padding-bottom: 0.3em;
    }

    p{
        font-size: 0.5em;
    }

    .control_panel{
        background-color: rgb(219, 219, 219);
        width: 20%;
        height: 100px;
        margin-right: 0.3em;
        padding: 0.5em;
        overflow: hidden;
    }

    .small_control_panel{
        background-color: rgb(219, 219, 219);
        width: 100%;
        height: fit-content;
        margin-right: 0.3em;
        padding: 0.5em;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
    }

    button{
        font-size: xx-small;
    }
</style>
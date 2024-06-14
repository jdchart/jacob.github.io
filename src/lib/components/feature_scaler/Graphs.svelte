<script>
    import FeatureGraph from '$lib/components/feature_scaler/FeatureGraph.svelte';
    import Segmentor from '$lib/components/feature_scaler/Segmentor.svelte';
    import Papa from 'papaparse';
    import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
    import * as utils from '$lib/scripts/utils.js';

    let src;
    let media_type;

    let segmentor_container;
    let spacer;

    let csvData = "";
    let parsedData = [];

    let current_data = [];
    let current_data_labels = [];
    let current_weights = [];
    let current_folded = [];

    onMount(() => {
        resize_spacer();
        window.addEventListener('resize', resize_spacer);
    });

    function resize_spacer(){
        spacer.style.height = String(segmentor_container.offsetHeight)+ 'px'
    }

    

    export const load_src = async (source_file, data_in) => {
        src = source_file.name;
        media_type = source_file.type.split("/")[0];

        const reader = new FileReader();

        reader.onload = () => {
        csvData = reader.result;

        parsedData = Papa.parse(csvData, { header: false }).data;
            current_data = [];
            current_data_labels = [];
            feature_graphs = [];
            current_folded = [];
            for (let i = 0; i < parsedData.length; i++){
                if (parsedData[i].length > 1){
                    current_data_labels.push(parsedData[i][0]);
                    current_weights.push(1000);
                    current_folded.push(false)

                    parsedData[i] = parsedData[i].map(str => Number(str));
                    parsedData[i].shift();
                    current_data.push(parsedData[i])
                };
            };
        };

        reader.readAsText(source_file);
    };

    export let playhead_position = 0.5;
    let feature_graphs = [];

    export const update_playheads = (time) => {
        feature_graphs.forEach(instance => {
            instance.redraw_playhead(time);
        });
    };

    function handle_clicked_graph(e){
        dispatch('clicked_graph', {
            clicked_pos: e.detail.clicked_pos
        });
    };

    function handle_move_graph(e){
        let temp_current_data = current_data;
        let temp_current_data_labels= current_data_labels;
        let temp_current_weights = current_weights;
        let temp_current_folded = current_folded;

        current_data = [];
        current_data_labels = [];
        current_weights = [];
        current_folded = []

        if(e.detail.direction == 1){
            utils.shift_element_up(temp_current_data, e.detail.index);
            utils.shift_element_up(temp_current_data_labels, e.detail.index);
            utils.shift_element_up(temp_current_weights, e.detail.index);
            utils.shift_element_up(temp_current_folded, e.detail.index);
        }else{
            utils.shift_element_down(temp_current_data, e.detail.index);
            utils.shift_element_down(temp_current_data_labels, e.detail.index);
            utils.shift_element_down(temp_current_weights, e.detail.index);
            utils.shift_element_down(temp_current_folded, e.detail.index);
        };

        current_data = temp_current_data;
        current_data_labels = temp_current_data_labels;
        current_weights = temp_current_weights;
        current_folded = temp_current_folded;

        // feature_graphs.forEach(instance => {
        //     instance.resize_graphs();
        // });
    };
</script>

<Segmentor
    bind:container_element={segmentor_container}
/>




<div class="cont">

    <div bind:this={spacer} class="spacer"></div>
    
    {#each current_data as curve_data, i}
        <FeatureGraph
            bind:this={feature_graphs[i]}
            bind:label = {current_data_labels[i]}
            bind:csv_data = {curve_data}
            bind:weight = {current_weights[i]}
            playhead_position = {playhead_position}
            on:clicked_graph={(e) => {handle_clicked_graph(e)}}
            index = {i}
            on:move_graph={(e) => handle_move_graph(e)}
            bind:folded = {current_folded[i]}
        />
    {/each}
</div>

<style>
    .cont{
        padding: 0.5em;
        width: 100%;
        
        max-height: 100%;
        overflow-y: scroll;

        scrollbar-width: none;


        /* height: calc(100% - 1em); 
        overflow-y: auto;
        box-sizing: border-box;  */
    }

    .spacer{
        width: 100%;
    }
</style>
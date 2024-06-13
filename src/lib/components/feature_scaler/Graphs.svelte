<script>
    import FeatureGraph from '$lib/components/feature_scaler/FeatureGraph.svelte';
    import Papa from 'papaparse';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    let src;
    let media_type;

    let csvData = "";
    let parsedData = [];

    let current_data = [];
    let current_data_labels = [];
    let current_weights = [];

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
            for (let i = 0; i < parsedData.length; i++){
                if (parsedData[i].length > 1){
                    current_data_labels.push(parsedData[i][0]);
                    current_weights.push(1000);

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

    function handle_change(){
        update_playheads(time);
    };

    function handle_clicked_graph(e){
        dispatch('clicked_graph', {
            clicked_pos: e.detail.clicked_pos
        });
    };
</script>

<!-- <input type="number" bind:value={playhead_position} on:input={() => {handle_change()}}> -->

<div class="cont">
    {#each current_data as curve_data, i}
        <FeatureGraph
            bind:this={feature_graphs[i]}
            bind:label = {current_data_labels[i]}
            bind:csv_data = {curve_data}
            bind:weight = {current_weights[i]}
            playhead_position = {playhead_position}
            on:clicked_graph={(e) => {handle_clicked_graph(e)}}
        />
    {/each}
</div>

<style>
    .cont{
        width: 100%;
        height: fit-content;
        padding: 0.5em;
    }
</style>
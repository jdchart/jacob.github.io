<script>
    import FileUploader from '$lib/components/FileUploader.svelte';
    import MediaPlayer from '$lib/components/feature_scaler/MediaPlayer.svelte';
    import Graphs from '$lib/components/feature_scaler/Graphs.svelte';

    let media_player_load_trigger;
    let graph_data_load_trigger;

    let update_media_pos_trigger;
    let update_graph_playheads_trigger;
    let playhead_position = 0;

    let media_filename = "Load a media file";
    let analysis_filename = "Load an analysis file";

    let load_media_cbk = async (file_object, data) => {
        await media_player_load_trigger(file_object, data);
    };

    let load_analysis_cbk = async (file_object, data) => {
        await graph_data_load_trigger(file_object, data);
    };

    function handle_media_player_time_change(content){
        // console.log(content.detail.time)
        playhead_position = content.detail.time

        update_graph_playheads_trigger(content.detail.time);
    };

    function handle_clicked_graph(e){
        update_media_pos_trigger(e.detail.clicked_pos);
    };

</script>

<div class="container">
    <div class="main_controls">
        <h2>FEATURE SCALER</h2>
        <FileUploader 
            filename = {media_filename}
            accepts = "video/*,audio/*"
            label = "+ media"
            callback = {load_media_cbk}
        />
        <FileUploader 
            filename = {analysis_filename}
            accepts = ".csv"
            label = "+ analyses"
            callback = {load_analysis_cbk}
        />
    </div>
    
    <div class="lower_section">
        <div class="media_player_cont">
            <MediaPlayer
                bind:load_src={media_player_load_trigger}
                on:time_change={(content) => {handle_media_player_time_change(content)}}
                bind:update_pos = {update_media_pos_trigger}
            />
        </div>
    
        <div class="graphs_cont">
            <Graphs
                bind:load_src={graph_data_load_trigger}
                bind:update_playheads={update_graph_playheads_trigger}
                playhead_position = {playhead_position}
                on:clicked_graph={(e) => {handle_clicked_graph(e)}}
            />
        </div>
    </div>
    
</div>

<style>
    .container {
        width: 99vw;
        height: 98vh;
        margin: auto;
        display: flex;
        flex-direction: column;
    }

    .media_player_cont{
        width: 100%;
        height: fit-content;
    }

    .graphs_cont{
        width: 100%;
        height: 100%;
        margin-top: 0.5em;
        border: 1px solid grey;
        flex: 1;
        overflow-y: scroll;
        position: relative;
    }

    .lower_section{
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
    }

    .main_controls{
        padding-bottom: 0.5em;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        gap: 1em;
        height: fit-content;
    }

    h2{
        font-size: small;
        align-self: center;
        align-items: center;
        align-content: center;
    }
</style>
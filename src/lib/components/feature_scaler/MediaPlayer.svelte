<script>
    import { onMount } from 'svelte';
    import WaveSurfer from 'wavesurfer.js';
    import ControlButton from '$lib/components/feature_scaler/ControlButton.svelte';
    // import RegionsPlugin from '$lib/scripts/regions_plug.js';
    import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
    
    let wave_surfer_instance = null;
    let src = null;
    let playing = false;
    let media_type = null;
    let video_player;
    let ws_div;
    let wsRegions;

    let region_play = false;
    let selected_region = null;
    let selected_region_befroe_cick = null;

    let pos_report_interval = 50;

    onMount(async () => {
        initialize_wavesurfer();
    })

    function update_playhead(){
        dispatch('time_change', {
			time: get_current_time() / wave_surfer_instance.getDuration()
		});
    }
    
    export const get_duration = () =>{
        return wave_surfer_instance.getDuration();
    }

    export const update_pos = (pos) => {
        let computed_pos = pos * wave_surfer_instance.getDuration();
        video_player.currentTime = computed_pos;
        wave_surfer_instance.seekTo(pos);
        update_playhead();
    };

    const initialize_wavesurfer = () => {
        wave_surfer_instance = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#a8a8a8',
            progressColor: '#302f2f',
            cursorWidth: 2,
            height: 50,
            // fillParent : true,
            // dragToSeek : true,
            mediaControls : false
        });

        wsRegions = wave_surfer_instance.registerPlugin(RegionsPlugin.create());

        wave_surfer_instance.on('ready', () => {
            dispatch('changed_media_info', {
                duration: wave_surfer_instance.getDuration()
            });

            const waveform = document.getElementById('waveform');
            waveform.addEventListener('click', () => {
                if (!playing) {
                    //wave_surfer_instance.play();
                    video_player.currentTime = get_current_time();
                    //video_player.play();
                    playing = true;

                    update_playhead()
                    active_report_position()
                } else {
                    // //wave_surfer_instance.pause();
                    // playing = false;
                    // video_player.currentTime = get_current_time();
                    // //video_player.pause();

                    // update_playhead()
                    // active_report_position()

                    //wave_surfer_instance.play();
                    video_player.currentTime = get_current_time();
                    //video_player.play();
                    playing = true;

                    update_playhead()
                    active_report_position()
                }
            });
        });
    };

    const load_audio_wavesurfer = async (data, mime_type) => {
        const blob = new Blob([data], { type: mime_type });
        wave_surfer_instance.loadBlob(blob);
    };

    export const load_src = async (source_file, audio_data) => {
        src = source_file.name;
        media_type = source_file.type.split("/")[0]

        await load_audio_wavesurfer(audio_data, source_file.type);

        

        if (media_type === "video"){
            // wave_surfer_instance.height = 50;
            // ws_div.style.height = "50px";
            load_video(source_file);
        }else{
            // wave_surfer_instance.height = 200;
            // ws_div.style.height = "200px";
        }
    };

    function load_video(data){
        const videoURL = URL.createObjectURL(data);
        video_player.src = videoURL;
    }

    const stop_playback = () => {
        wave_surfer_instance.stop();
        video_player.pause();
        video_player.currentTime = 0;
        playing = false;

        update_playhead()
        stop_report_position()
    };

    const start_playback = () => {
        wave_surfer_instance.play();
        video_player.currentTime = get_current_time();
        video_player.play();
        playing = true;

        update_playhead()
        active_report_position()
    };

    const pause_playback = () => {
        wave_surfer_instance.pause();
        video_player.pause();
        video_player.currentTime = get_current_time();
        playing = false;

        update_playhead()
        stop_report_position()
    };

    const get_current_time = () => {
        return wave_surfer_instance.getCurrentTime();
    };

    let intervalId = null;
    function active_report_position() {
        if (intervalId === null) {
        intervalId = setInterval(() => {
            update_playhead();
        }, pos_report_interval); // Report every 500 milliseconds
        }
    }

    function stop_report_position() {
        if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        }
    }

    const random = (min, max) => Math.random() * (max - min) + min
    const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`
    export const update_slices = (slice_data) => {
        // https://wavesurfer.xyz/plugins/regions
        // https://wavesurfer.xyz/examples/?regions.js

        wsRegions.clearRegions();

        slice_data.forEach(slice => {
            wsRegions.addRegion({
                start: slice[0],
                end: slice[1],
                // content: 'Resize me',
                // color: "rgba(80, 170, 89, 0.21)",
                color: randomColor(),
                drag: false,
                resize: false,
            });
        });
        
        wsRegions.on('region-clicked', (region, e) => {
            e.stopPropagation();

            selected_region = region;

            region_play = true;

            let seek = region.start / wave_surfer_instance.getDuration()
            wave_surfer_instance.seekTo(seek + 0.000001);

            start_playback();
        });

        wsRegions.on('region-out', (region) => {
            if(region_play && selected_region === region){
                pause_playback();
                region_play = false;
            };
        });
    };
</script>

<div class="container">
    {#if media_type === "video"}
    <div class="video_wrapper">
        <video bind:this={video_player} muted></video>
    </div>

    {/if}
    {#if src == null}
            <p class="please_load">Load an audio or video file...</p>
        {/if}
    <div class="waveform_wrap">
        <div bind:this={ws_div} id="waveform"></div>
        
    </div>
    
    <div class="playback_controls">
        <ControlButton
            label = "⏵"
            func = {() => {region_play = false; start_playback()}}
        />
        <ControlButton
            label = "⏸"
            func = {() => {region_play = false; pause_playback()}}
        />
        <ControlButton
            label = "⏹"
            func = {() => {region_play = false; stop_playback()}}
        />
    </div>
</div>

<style>
    .please_load{
        font-style: italic;
        width: 100%;
        text-align: center;
        position: absolute;
        font-size: smaller;
        padding-top: 1em;
        padding-bottom: 1em;
    }
    .waveform_wrap{
        /* height: 100%; */
    }
    .container{
        width: 100%;
        height: 100%;
        border: 1px solid grey;
        position: relative;
    }

    #waveform {
        width: 100%;
        background-color: rgb(246, 246, 246);
        /* height: 100%; */
    }

    video{
        width: 100%;
        height: 150px;
    }

    .video_wrapper{
        background-color: black;
        width: 100%;
        height: fit-content;
    }

    .playback_controls{
        height: fit-content;
        /* width: 100%; */
        /* height: 100%; */
        display: flex;
        /* gap: 0.5em; */
        flex-wrap: wrap;
        z-index: 1000;
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>
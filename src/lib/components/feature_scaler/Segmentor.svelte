<script>
    // https://chatgpt.com/c/60c35d77-4c3d-4442-9af2-ae9e7b77be12

    //import { onMount } from 'svelte';
    import * as tss from '$lib/scripts/time_series_segmentation.js';
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    let selected_method = "0";
    export let container_element;
    export let feature_data;
    export let weight_data;
    export let label_data;
    export let media_duration;
    let kernel_width = 5;
    let threshold = 2;

    function process_segmentation(){
        let slices = tss.process_segmentation(
            {
                "feature_data" : feature_data,
                "weight_data" : weight_data,
                "label_data" : label_data,
                "media_duration" : media_duration
            },
            {
                "method" : selected_method,
                "kernel_width" : kernel_width,
                "threshold" : threshold
            }
        );

        // console.log(slices);
        // console.log(slices.length);
        dispatch('update_slices', {
			slice_list: slices
		});
    };

    function handle_method_select(){};
</script>

<div class="main_cont">
    <div class="container" bind:this={container_element}>
        <h2>Segmentation & Clustering</h2>
        <div class="top_menu">
            <button on:click={() => process_segmentation()}>Segment</button>
            <div class="input_field">
                <p>Method</p>
                <select bind:value={selected_method} on:change={() => handle_method_select()}>
                    <option value="0">Kernel change detection</option>
                    <option value="1">Self similarity matrix</option>
                </select>
            </div>
            {#if selected_method === "0"}
            <div class="input_field">
                <p>Kernel Width</p>
                <input type="number" bind:value={kernel_width} min="2" max="1000" step="1" />
            </div>  
            <div class="input_field">
                <p>Threshold</p>
                <input type="number" bind:value={threshold} min="0.1" max="1000" step="0.1" />
            </div>  
            {/if}
        </div>
    </div>
</div>

<style>
    .top_menu{
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
    }

    .main_cont{
        position: absolute;
        width: 99vw;
    }

    h2{
        padding-bottom: 1em;
    }

    .container{
        width: 100%;
        height: fit-content;
        background-color: white;
        position: absolute;
        top: 0;
        border-bottom: 1px solid grey;
        border-right: 1px solid grey;
        z-index: 100;
        padding: 1em;
    }

    .input_field{
        display: flex;
        gap: 0.7em;
        align-items: center;
    }
    .input_field p{
        font-size: 0.8em;
    }

    select{
        font-family: 'Input-Mono-Narrow-Thin', monospace;
        font-size: 0.8em;
    }

    input{
        font-family: 'Input-Mono-Narrow-Thin', monospace;
        font-size: 0.8em;
    }

    button{
        font-size: 0.75em;
        font-family: 'Input-Mono-Narrow-Thin', monospace;
    }
</style>
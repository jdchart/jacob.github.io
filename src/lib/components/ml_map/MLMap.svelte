<script>
    import NodeInfo from '$lib/components/ml_map/NodeInfo.svelte';
    import { onMount } from "svelte";
    import * as net_visu from '$lib/scripts/network_visualization.js';
    import * as net_anal from '$lib/scripts/network_analysis.js';

    let network_style = {
        "width" : 800,
        "height" : 600,
        "active_color" : "#515151",
        "inactive_color" : "#c4c4c4",
        "selected_color" : "red",
        "stroke_active_color" : "#999",
        "show_labels" : false,
        "color_palette" : [
            "#332288", "#117733", "#44AA99", "#88CCEE", "#DDCC77", "#CC6677", "#AA4499", "#882255", "#95FA4D", "#84AA50"
            // Tol color palette taken from here: https://davidmathlogic.com/colorblind/#%23332288-%23117733-%2344AA99-%2388CCEE-%23DDCC77-%23CC6677-%23AA4499-%23882255-%2395fa4d-%2384aa50-%23a31056
        ]
    };
    
    // Initialize data:
    import raw_data from '$lib/data/ml_map/v1.json';
    import category_data from '$lib/data/ml_map/categories.json';
    let data = net_anal.parse_raw_data(raw_data, network_style, category_data);

    console.log(data);

    import workflow_data from '$lib/data/ml_map/workflows.json';

    let node_info_instance;

    onMount(async () => {
        net_visu.draw_graph(data, network_style, node_info_instance);
    });

    function handle_select_workflow(e){
        net_visu.select_group(e.detail.path, data);

        net_visu.update_graph(data, network_style);

        net_visu.trigger_centre_func();
        //net_visu.center_on_group(data, network_style);
    };
</script>

<div class="main_container">
    <div class="svg_container">
        <svg id="network"></svg>
        <div id="tooltip" class="tooltip" style="opacity: 0;"></div>
    </div>
    
    <NodeInfo 
        bind:this={node_info_instance}
        network_style={network_style}
        on:trigger_update={() => {net_visu.update_graph(data, network_style);}}
        on:select_workflow={(e) => {handle_select_workflow(e)}}
        workflow_data={workflow_data}
    />
</div>

<style>
    svg{
        background-color: rgb(239, 239, 239);
    }

    .tooltip {
        position: absolute;
        text-align: center;
        width: auto;
        height: auto;
        padding: 8px;
        background: lightsteelblue;
        border: 0px;
        border-radius: 8px;
        pointer-events: none;
    }

    .main_container{
        width: 100%;
        height: 100%;
        display: flex;
        gap: 0.3em;
    }

    .svg_container{
        /* overflow: hidden; */
    }
</style>
<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    import * as net_anal from '$lib/scripts/network_analysis.js';

    export let width = 800;
    export let height = 600;

    import raw_data from '$lib/data/ml_map/v2.json';
    let data = net_anal.parse_raw_data(raw_data);

    let nodes = [];
    let links = [];
    let visible_nodes = new Set();
    let visible_links = new Set();

    let selected_group = null;

    let active_color = "#515151";
    let inactive_color = "#c4c4c4";
    let selected_color;

    let stroke_active_color = "#999";

    let zoom;
    let g;
    let svg;

    onMount(async () => {
        nodes = data.nodes;
        links = data.links;

        nodes.forEach(node => {
            if(node.starter){
                node.hidden = false;
                visible_nodes.add(node);
            }
            else{
                node.hidden = true;
            }
        });

        links.forEach(link => {
            if (visible_nodes.has(link.source) || visible_nodes.has(link.target)) {
                visible_links.add(link);
            };
        });

        net_anal.ensure_path_visibility(visible_nodes, visible_links, data);

        draw_graph();
    });

    // function get_visible_links(){
    //     visible_links.clear();

    //     links.forEach(link => {
    //         let found_source = false;
    //         let found_target = false;
    //         visible_nodes.forEach(node =>{
    //             if (typeof link.source === 'string' || link.source instanceof String){
    //                 if(node.id === link.source){found_source = true;};
    //                 if(node.id === link.target){found_target = true;};
    //             }else{
    //                 if(node.id === link.source.id){found_source = true;};
    //                 if(node.id === link.target.id){found_target = true;};
    //             };
    //         });
    //         if(found_source && found_target){visible_links.add(link);};
    //     });
    // };

    function draw_graph(){
        // Set up svg element
        svg = d3.select("#network")
            .attr("width", width)
            .attr("height", height)

        zoom = d3.zoom().on("zoom", ({ transform }) => {
            g.attr("transform", transform);
        });
        svg.call(zoom);

        g = svg.append("g");

        update_graph();
    };

    function update_graph(){  

        svg.on("click", () => {
            handle_canvas_click();
        });

        g.selectAll("*").remove();

        // Initialize force embedded simulation
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(d => d.size + 100));

        // Add links:
        const link = g.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(visible_links)
            .enter().append("line")
            .attr("stroke-width", 2)
            .attr("stroke", stroke_active_color)
            .attr("stroke-opacity", 0.6);

        // Add nodes:
        const node = g.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(visible_nodes)
            .enter().append("circle")
            .attr("r", d => d.size)
            .attr("stroke", "#fff")
            .attr("stroke-width", "1.5px")
            .attr("fill", active_color)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            .on("click", (event, d) => {
                event.stopPropagation()
                handle_node_click(d);
            });

        // Add labels:
        const labels = g.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(visible_nodes)
            .enter().append("text")
            .attr("dx", 0)
            .attr("dy", ".35em")
            .attr("fill","red")
            .attr("font-size", "2em")
            .text(d => d.name);

        simulation
            .nodes(nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(links);

        // What happens on every tick:
        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            labels
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        };

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        };

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        };

        function handle_node_click(d) {
            selected_group = d.group;
            // select_group();
            toggle_children_visibility(d);
        };

        function handle_canvas_click() {
            selected_group = null;
            //select_group();
        };

        // function select_group(){
        //     node.attr("fill", n => selected_group && n.group !== selected_group ? inactive_color : active_color);
        //     link.attr("stroke", l => selected_group && (l.source.group !== selected_group && l.target.group !== selected_group) ? "#999" : stroke_active_color);

        //     if (selected_group) {
        //         center_on_group(selected_group);
        //     } else {
        //         g.transition().duration(750).attr("transform", d3.zoomIdentity);
        //         svg.transition().duration(750).call(
        //             zoom.transform,
        //             d3.zoomIdentity
        //         );
        //     };
        // }

        // function center_on_group(group){
        //     const groupNodes = nodes.filter(n => n.group === group);
        //     if (groupNodes.length === 0) return;

        //     const padding = 50;
        //     const xExtent = d3.extent(groupNodes, d => d.x);
        //     const yExtent = d3.extent(groupNodes, d => d.y);

        //     const xCenter = (xExtent[0] + xExtent[1]) / 2;
        //     const yCenter = (yExtent[0] + yExtent[1]) / 2;
        //     const xRange = xExtent[1] - xExtent[0];
        //     const yRange = yExtent[1] - yExtent[0];

        //     const scale = Math.min(width / (xRange + padding * 2), height / (yRange + padding * 2));

        //     const translateX = width / 2 - xCenter * scale;
        //     const translateY = height / 2 - yCenter * scale;

        //     const transform = d3.zoomIdentity.translate(translateX, translateY).scale(scale);

        //     g.transition().duration(750).attr("transform", transform);

        //     svg.transition().duration(750).call(
        //         zoom.transform,
        //         transform
        //     );
        // };

        function toggle_children_visibility(nodeId){

            const neighbors = net_anal.get_neighbors(nodeId, data);
            
            neighbors.forEach(neighborId => {
                if (visible_nodes.has(neighborId)) {
                // Hide neighbor and remove links
                visible_nodes.delete(neighborId);
                visible_links = new Set(
                    [...visible_links].filter(
                    link => !(link.source === neighborId || link.target === neighborId)
                    )
                );
                } else {
                // Show neighbor and add links
                visible_nodes.add(neighborId);
                data.links.forEach(link => {
                    if (
                    (link.source === nodeId && link.target === neighborId) ||
                    (link.target === nodeId && link.source === neighborId)
                    ) {
                    visible_links.add(link);
                    }
                });
                }
            });

            // Ensure path visibility
            net_anal.ensure_path_visibility(visible_nodes, visible_links, data);

            update_graph();
        };
    };  
</script>

<svg id="network"></svg>

<style>
    svg{
        background-color: rgb(234, 234, 234);
    }
</style>
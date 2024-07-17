import * as d3 from "d3";
import * as net_anal from '$lib/scripts/network_analysis.js';

export const draw_graph = (svg, zoom, g, network_style) => {
    svg = d3.select("#network")
        .attr("width", network_style.width)
        .attr("height", network_style.height)
    zoom = d3.zoom().on("zoom", ({ transform }) => {
        g.attr("transform", transform);
    });
    svg.call(zoom);
    g = svg.append("g");

    // update_graph(data, visible_nodes, visible_links, svg, g, network_style);
};













export const update_graph = (data, visible_nodes, visible_links, svg, g, network_style) => {  

    // Get background clicks:
    svg.on("click", () => {
        handle_canvas_click();
    });

    // Reset all:
    g.selectAll("*").remove();

    // Initialize force embedded simulation
    const simulation = d3.forceSimulation(Array.from(visible_nodes))
        .force("link", d3.forceLink(Array.from(visible_links)).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(network_style.width / 2, network_style.height / 2))
        .force("collision", d3.forceCollide().radius(d => d.size + 100));

    // Add links:
    const link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(visible_links)
        .enter().append("line")
        .attr("stroke-width", 2)
        .attr("stroke", network_style.stroke_active_color)
        .attr("stroke-opacity", 0.6);

    // Add nodes:
    const node = g.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(visible_nodes)
        .enter().append("circle")
        .attr("r", d => 20)
        .attr("stroke", "#fff")
        .attr("stroke-width", "1.5px")
        .attr("fill", network_style.active_color)
        .attr("cursor", "pointer")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("click", (event, d) => {
            event.stopPropagation()
            handle_node_click(d)
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
        .attr("pointer-events","none")
        .text(d => d.name);

    simulation
        .nodes(Array.from(visible_nodes))
        .on("tick", ticked);

    simulation.force("link")
        .links(Array.from(visible_links));

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
        // selected_group = d.group;
        // select_group();

        toggle_children_visibility(d);
        visible_links = net_anal.get_visible_links(data, visible_nodes);
        update_graph(data, visible_nodes, visible_links, svg, g, network_style);
    };

    function handle_canvas_click() {
        // selected_group = null;
        //select_group();
    }; 

    // function select_group(){
    //     node.attr("fill", n => selected_group && n.group !== selected_group ? network_style.inactive_color : network_style.active_color);
    //     link.attr("stroke", l => selected_group && (l.source.group !== selected_group && l.target.group !== selected_group) ? "#999" : network_style.stroke_active_color);

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

    function toggle_children_visibility(node, set_mode = "toggle"){
        // This function should be followed by
        // visible_links = net_anal.get_visible_links(data, visible_nodes);
        // update_graph(data, visible_nodes, visible_links, svg, g, network_style);

        if(set_mode === "toggle"){
            if(node.unpacked){
                node.unpacked = false;
            }else{
                node.unpacked = true;
            }
        }
        else if(set_mode === "pack"){
            node.unpacked = false;
        }else{
            node.unpacked = true;
        };
        
        if(node.children.length > 0){
            node.children.forEach(child_id => {
                const child_node = data["nodes"].find(ob => (ob.id == child_id));
                if(child_node){
                    if(node.unpacked){
                        child_node.hidden = false;
                        visible_nodes.add(child_node);
                    }
                    else{
                        child_node.hidden = true;
                        visible_nodes.delete(child_node);
                        toggle_children_visibility(child_node, "pack");
                    };
                };
            });
        };
    };
};
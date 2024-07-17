import * as d3 from "d3";
import * as net_anal from '$lib/scripts/network_analysis.js';

let svg;
let zoom;
let g;
let simulation;
let tooltip;
let visible_nodes = [];
let visible_edges = [];
let selected_node = null;
let node_info_inst;
let group_currently_selected = false;
let tick_count = 0;
let tick_offset = 30;
let trigger_centre = false;

export const trigger_centre_func = () =>{
    simulation.alpha(1).restart();
    tick_count = 0;
    trigger_centre = true;
};

export const draw_graph = (data, network_style, node_info) => {
    // Link node info instance:
    node_info_inst = node_info;
    
    // Get initial lists:
    data["nodes"].forEach(node => {
        if(node.parent === null){
            node.hidden = false;
            visible_nodes.push(node);
        };
    });
    visible_edges = net_anal.get_visible_links(data, visible_nodes);

    // Initialize graph:
    svg = d3.select("#network")
        .attr("width", network_style.width)
        .attr("height", network_style.height)
    zoom = d3.zoom().on("zoom", ({ transform }) => {
        g.attr("transform", transform);
    });
    svg.call(zoom);
    g = svg.append("g");

    // // Initialize simulation:
    // simulation = d3.forceSimulation(visible_nodes)
    //     .force("link", d3.forceLink(visible_edges).id(d => d.id).distance(100))
    //     .force("charge", d3.forceManyBody().strength(-200))
    //     .force("center", d3.forceCenter(network_style.width / 2, network_style.height / 2))
    //     .force("collide", d3.forceCollide().radius(d => d.node_type === "category" ? 30 : 10))

    // Initialize tooltip
    tooltip = d3.select("#tooltip");

    // Trigger update:
    update_graph(data, network_style);
};

export const update_graph = (data, network_style) => {  
    // Init simulation:
    // simulation = d3.forceSimulation(visible_nodes)
    //     .force("link", d3.forceLink(visible_edges).id(d => d.id).distance(100))
    //     .force("charge", d3.forceManyBody().strength(-200))
    //     .force("center", d3.forceCenter(network_style.width / 2, network_style.height / 2))
    //     //.force("collide", d3.forceCollide().radius(d => d.node_type === "category" ? 30 : 10))

    simulation = d3.forceSimulation(visible_nodes)
        .force("link", d3.forceLink(visible_edges).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(network_style.width / 2, network_style.height / 2))
        .force("x", d3.forceX(network_style.width / 2).strength(0.1)) // Added x-axis centering force
        .force("y", d3.forceY(network_style.height / 2).strength(0.1)) // Added y-axis centering force

    // Get background clicks:
    svg.on("click", () => {handle_canvas_click();});

    // Reset all:
    g.selectAll("*").remove();

    // Add links:
    const link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(visible_edges)
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
        // .attr("r", d => d.node_type === "category" ? 30 : d.node_type === "subcategory" ? 10 : 5)
        .attr("r", d => {
            if(d.node_depth === 0){return 20}
            else if(d.node_depth === 1){return 15}
            else if(d.node_depth === 2){return 10}
            else if(d.node_depth === 3){return 5}
            else if(d.node_depth === 4){return 2}
            else{
                return 5;
            };
        })
        // .attr("stroke", "#fff")
        .attr("stroke", d => {
            if(d.selected_node){
                return network_style.selected_color;
            }else{
                return "#fff";
            }
        })
        .attr("stroke-width", "1.5px")
        .attr("opacity", d => {
            if(group_currently_selected){
                if(d.selected_group){
                    return "1";
                }else{
                    return "0.2";
                }
            }else{
                return "1";
            };
        })
        //.attr("fill", network_style.active_color)
        // .attr("fill", d => {
        //     if(d.selected_node){
        //         return network_style.selected_color
        //     }else{
        //         if(group_currently_selected){
        //             if(d.selected_group){
        //                 return network_style.active_color;
        //             }else{
        //                 return network_style.inactive_color;
        //             }
        //         }else{
        //             return network_style.active_color;
        //         };
        //     };
        // })
        .attr("fill", d => {
            return d.color;
        })
        .attr("cursor", "pointer")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("click", (event, d) => {
            event.stopPropagation()
            if (event.shiftKey) {
                handle_node_click(d, true);
            }else{
                handle_node_click(d, false);
            }; 
        })
        .on("mouseover", (event, d) => {
            handle_mouse_over_node(event, d);
        })
        .on("mouseout", (event, d) => {
            handle_mouse_out_node(event, d);
        })
        
    // Add labels:
    const labels = g.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(visible_nodes)
        .enter().append("text")
        .attr("dx", 0)
        .attr("dy", ".35em")
        .attr("fill","black")
        .attr("opacity", network_style.show_labels === true ? 1. : 0.)
        .attr("font-size", "2em")
        .attr("pointer-events","none")
        .text(d => d.name);

    simulation
        .nodes(Array.from(data.nodes))
        .on("tick", ticked);

    simulation.force("link")
        .links(Array.from(visible_edges));

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

        tick_count = tick_count + 1;
        if (tick_count === tick_offset) {
            if(trigger_centre){
                trigger_centre = false;
                center_on_group(data, network_style);
                tick_count = 0
            };
            
        }
        else if(tick_count > 100){
            tick_count = 0;
        };
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

    function handle_node_click(d, shift_key) {
        let trigger_update = false;
        
        if(shift_key === true){
            // Get the node's parent:
            const parent = data.nodes.filter(n => n.id === d.parent);

            // If the node has a parent:
            if(parent.length > 0){toggle_to_parent(parent[0]);};
            
            // Select this node:
            selected_node = parent[0];
            data["nodes"].forEach(item => item["selected_node"] = false);
            parent[0].selected_node = true;

            trigger_update = true;
        }
        else{
            data["nodes"].forEach(item => item["selected_node"] = false);
            d.selected_node = true;
            selected_node = d;
            
            // TODO: ADD JUST OPENING NEIGHTBOUR ? CAUSE THIS CAN LEAD TO DEAD ENDS
            if (d.node_type != "node"){
                // If node has children, hide it and show it's children:
                toggle_to_children(d);
            };

            trigger_update = true;
        };

        if(trigger_update === true){
            visible_edges = net_anal.get_visible_links(data, visible_nodes);
            update_graph(data, network_style);
        };

        node_info_inst.select_node(selected_node);
    };

    function toggle_to_parent(node){
        // The given node is a parent, make the node visible, and hide all of it's children:
        
        // Show the parent node:
        node.hidden = false;
        visible_nodes.push(node);

        // TODO: MAKE THE PARENT THE CENTRE OF GROUP OF NODES
        // node.x = 
        // node.y = 

        // Hide all of the node's chidren=
        const children = data.nodes.filter(n => n.parent === node.id);
        children.forEach(child => {remove_visibility_rec(child);}); 

        hide_tooltip();
    };

    function toggle_to_children(node){
        // The given node is a parent, hide the node, then show it's immediate children

        // Remove parent
        node.hidden = true;
        const index = visible_nodes.indexOf(node);
        if (index > -1) {visible_nodes.splice(index, 1);};

        // Get the node's children:
        const children = data.nodes.filter(n => n.parent === node.id);

        // Show each child:
        children.forEach(child => {
            if(child.hidden === true){
                child.hidden = false;
                child.x = node.x;
                child.y = node.y;
                visible_nodes.push(child);
            };
        });

        hide_tooltip();
    };

    function remove_visibility_rec(node){
        // Recursive function for removing a node's visibility and all of it's children:

        // Remove this node:
        node.hidden = true;
        const index = visible_nodes.indexOf(node);
        if (index > -1) {visible_nodes.splice(index, 1);};
        
        // Remove the node's children:
        data.nodes.forEach(vis_child => {
            if(vis_child.parent === node.id){
                remove_visibility_rec(vis_child);
            };
        });
    };

    function handle_canvas_click() {
        if(selected_node != null){
            selected_node.selected_node = false;
            selected_node = null;
            node_info_inst.select_node(null);
            update_graph(data, network_style);
        }
        
    }; 

    function handle_mouse_over_node(event, d){
        show_tooltip((event.pageX + 5) + "px", (event.pageY - 28) + "px", d);
    };

    function handle_mouse_out_node(event, d){
        hide_tooltip();
    };

    function show_tooltip(x_pos, y_pos, data){
        tooltip.transition()
            .duration(100)
            .style("opacity", .9);
        tooltip.html(data.name)
            .style("left", x_pos)
            .style("top", y_pos);
    };

    function hide_tooltip(){
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }; 
};

export const select_group = (group_list, data) =>{
    if(group_list.length > 0){
        group_currently_selected = true;

        let parent_matrix = {}

        // Reset visible nodes:
        visible_nodes = [];
        data["nodes"].forEach(node => {
            if(node.parent === null){
                node.hidden = false;
                visible_nodes.push(node);
            }else{
                node.hidden = true;
            }
            node.selected_node = false;
            node.selected_group = false;

            if(group_list.includes(node.id)){
                node.selected_group = true;

                parent_matrix[node.id] = get_node_parents(node, data);
            };
        });
        selected_node = null;

        group_list.forEach(node_id => {
            parent_matrix[node_id].forEach(parent_id => {
                let parent_node = data.nodes.filter(n => n.id === parent_id)[0]
                
                // Remove parent
                parent_node.hidden = true;
                const index = visible_nodes.indexOf(parent_node);
                if (index > -1) {visible_nodes.splice(index, 1);};

                // Get the node's children:
                const children = data.nodes.filter(n => n.parent === parent_node.id);

                // Show each child:
                children.forEach(child => {
                    if(child.hidden === true){
                        child.hidden = false;
                        child.x = parent_node.x;
                        child.y = parent_node.y;
                        visible_nodes.push(child);
                    };
                });
            });
        });

        // Select first node:
        const sel_node = data.nodes.filter(n => n.id === group_list[0])[0];
        sel_node.selected_node = true;
        selected_node = sel_node;
        node_info_inst.select_node(selected_node);
    }
    else{
        group_currently_selected = false;

        data["nodes"].forEach(node => {
            node.selected_group = false;
        });
    };
    
    visible_edges = net_anal.get_visible_links(data, visible_nodes);
};

function get_node_parents(node, data){
    let parent_list = [];
    let found_top = false;
    let current_node = node;

    while(found_top === false){
        if(current_node.parent != null || current_node.parent != undefined){
            parent_list.push(current_node.parent);
        }
        if(current_node.parent == null || current_node.parent == undefined){
            found_top = true;
        }else{
            let parent_node = data.nodes.filter(n => n.id === current_node.parent)[0];
            current_node = parent_node;
        };
    };

    return parent_list.reverse();
};

export const center_on_group = (data, network_style) => {
    const groupNodes = data.nodes.filter(n => n.selected_group === true);
    
    if (groupNodes.length === 0) return;

    const padding = 50;
    const xExtent = d3.extent(groupNodes, d => d.x);
    const yExtent = d3.extent(groupNodes, d => d.y);

    const xCenter = (xExtent[0] + xExtent[1]) / 2;
    const yCenter = (yExtent[0] + yExtent[1]) / 2;
    const xRange = xExtent[1] - xExtent[0];
    const yRange = yExtent[1] - yExtent[0];

    const scale = Math.min(network_style.width / (xRange + padding * 2), network_style.height / (yRange + padding * 2));

    const translateX = network_style.width / 2 - xCenter * scale;
    const translateY = network_style.height / 2 - yCenter * scale;

    const transform = d3.zoomIdentity.translate(translateX, translateY).scale(scale);

    g.transition().duration(750).attr("transform", transform);

    svg.transition().duration(750).call(
        zoom.transform,
        transform
    );
}; 
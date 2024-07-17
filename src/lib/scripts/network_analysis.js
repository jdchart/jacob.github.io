export const parse_raw_data = (raw_data, network_style) => {
    let ret = {"nodes" : [], "links" : [], "hierarchy" : {"name" : "Root", "children" : []}, "nodes_raw" : [], "links_raw" : []};
    
    let raw_node_list = [];
    let raw_link_list = [];
    let raw_node_attr_list = [];
    
    raw_data.forEach(item => {
      if("nodes" in item){raw_node_list = item["nodes"];}
      else if("edges" in item){raw_link_list = item["edges"];}
      else if("nodeAttributes" in item){raw_node_attr_list = item["nodeAttributes"];}
      else if("cyGroups" in item){raw_group_list = item["cyGroups"];};
    });

    raw_node_list.forEach(node_data => {
      let to_add = {"id" : String(node_data["@id"]), "name" : "", "method" : false, "categories" : [], "node_type" : "node", "parent" : null, "node_depth" : 0, "hidden" : true, "description" : "", "links" : [], "implementations" : [], "selected_node" : false, "selected_group" : false};
      if("n" in node_data){to_add["name"] = node_data["n"];};
      ret["nodes"].push(to_add);
    });

    raw_node_attr_list.forEach(node_attribute_data => {
      let associated_node_index = ret["nodes"].map(function(x) {return x.id; }).indexOf(String(node_attribute_data["po"]));
      if(node_attribute_data["n"] === "Method"){ret["nodes"][associated_node_index]["method"] = (node_attribute_data["v"] === 'true')}
      else if(node_attribute_data["n"] === "Categories"){ret["nodes"][associated_node_index]["categories"] = node_attribute_data["v"]}
      else if(node_attribute_data["n"] === "Description"){ret["nodes"][associated_node_index]["description"] = node_attribute_data["v"]}
      else if(node_attribute_data["n"] === "Links"){ret["nodes"][associated_node_index]["links"] = node_attribute_data["v"]}
      else if(node_attribute_data["n"] === "Implementations"){ret["nodes"][associated_node_index]["implementations"] = node_attribute_data["v"]};
    });

    ret["nodes"].forEach(node => {
      node["node_depth"] = node["categories"].length;
    });

    raw_link_list.forEach(link_data => {
      let to_add = {"id" : String(link_data["@id"]), "source" : String(link_data["s"]), "target" : String(link_data["t"]), "hidden" : true};
      ret["links"].push(to_add);
    });

    ret["nodes_raw"] = JSON.parse(JSON.stringify(ret["nodes"]));
    ret["links_raw"] = JSON.parse(JSON.stringify(ret["links"]));

    // Process categories:
    let hierarchies = {};
    ret["nodes"].forEach(node => {
      if(String(node.categories) in hierarchies === false){
        if(String(node.categories) != ""){
          hierarchies[String(node.categories)] = {"hierarchy_array" : node.categories}
        }; 
      };
    });

    let max_depth = 0;
    let cat_node_list = [];
    let cat_link_list = [];
    let added_keys = [];
    let add_edge_keys = [];
    for(var key in hierarchies){
      let this_id = "";
      let last_id = "";
      for(var i = 0; i < hierarchies[key].hierarchy_array.length; i++){
        this_id = this_id + "_" + hierarchies[key].hierarchy_array[i];
        let to_add = {"id" : this_id, "name" : hierarchies[key].hierarchy_array[i], "method" : false, "node_type" : "category", "parent" : null, "node_depth" : i, "hidden" : true, "description" : "", "links" : [], "implementations" : [], "selected_node" : false, "selected_group" : false};
        if(i > 0){
          to_add["node_type"] = "subcategory";
          to_add["parent"] = last_id;
          if(add_edge_keys.includes(last_id + this_id) === false){
            cat_link_list.push({"id" : last_id + this_id, "source" : last_id, "target" : this_id, "hidden" : true});
            add_edge_keys.push(last_id + this_id);
          };
        };
        if(added_keys.includes(this_id) === false){
          cat_node_list.push(to_add);
          added_keys.push(this_id);
          hierarchies[key]["node_id"] = this_id;
        };
        
        last_id = this_id;
        if (i > max_depth){
          max_depth = i
        }
      };
    };

    let node_to_sub_links = [];
    ret["nodes"].forEach(node => {
      if(String(node.categories) != ""){
        node.parent = hierarchies[String(node.categories)]["node_id"];
        node_to_sub_links.push({"id" : node.id + node.parent, "source" : node.parent, "target" : node.id, "hidden" : true});
      };
    });

    // Add to main lists:
    cat_node_list.forEach(node => {ret["nodes"].push(node);});
    cat_link_list.forEach(link => {ret["links"].push(link);});
    node_to_sub_links.forEach(link => {ret["links"].push(link);});

    // Make hierarchy:
    ret["nodes"].forEach(node => {
      if(node.parent === null){
        ret["hierarchy"].children.push({"name" : node.id, "children" : []});
      };
    });

    for(var i = 0; i < max_depth + 1; i++){
      ret["nodes"].forEach(node => {
        if(node.parent != null && node.node_type === "subcategory" && node.node_depth === i){
          place_subcategories(ret["hierarchy"], node);
        };
      });
    };

    ret["nodes"].forEach(node => {
      if(node.parent != null && node.node_type === "node"){
        place_nodes(ret["hierarchy"], node);
      };
    });

    // Add colors:
    for(var i = 0; i < ret["hierarchy"]["children"].length; i++){
      let top_id = ret["hierarchy"]["children"][i]["name"];
      let this_col = network_style["color_palette"][i];

      let this_node = ret["nodes"].filter(d => d.id === top_id)[0];
      
      this_node["color"] = this_col;

      if(ret["hierarchy"]["children"][i]["children"]){
        if(ret["hierarchy"]["children"][i]["children"].length > 0){
          set_children_colors(ret["hierarchy"]["children"][i]["children"], this_col, ret["nodes"])
        };
      };
      
    };

    return ret;
};

function set_children_colors(child_list, color, full_nodes){
  child_list.forEach(child_obj => {
    let this_id = child_obj.name;
    let this_child_node = full_nodes.filter(d => d.id === this_id)[0];
    this_child_node["color"] = color;

    if(child_obj.children){
      if(child_obj.children.length > 0){
        set_children_colors(child_obj.children, color, full_nodes)
      }
    }
  })
};

function place_subcategories(current_level, sub_category_node){
  let found = false;
  current_level.children.forEach(child =>{
    if(child.name === sub_category_node.parent){
      child.children.push({"name" : sub_category_node.id, "children" : []});
      found = true;
    };
  });
  if(found === false){
    current_level.children.forEach(child =>{
      place_subcategories(child, sub_category_node);
    });
  };
};

function place_nodes(current_level, sub_category_node){
  let found = false
  current_level.children.forEach(child => {
    if(child.name === sub_category_node.parent){
      child.children.push({"name" : sub_category_node.id})
      found = true;
    }
  })

  if(found === false){
    
    current_level.children.forEach(child =>{
      if("children" in child){
        place_nodes(child, sub_category_node);
      }
      
    })
  }
};

export const get_visible_links = (data, visible_nodes) => {
  let ret = [];
  
  const adjacencyList = build_adjacency_list(data);
  const child_matrix = build_child_matrix(data, visible_nodes);

  visible_nodes.forEach(source_node => {
    let full_sources = child_matrix[source_node.id];

    full_sources.forEach(this_source_id => {
      visible_nodes.forEach(target_node => {
        if(source_node != target_node){
          let found_path = false;

          let ignore_set = get_ignore_set(source_node.id, target_node.id, child_matrix);

          let full_targets = child_matrix[target_node.id];

          full_targets.forEach(this_target_id => {
            if(found_path === false){
              const path_state = does_path_exist(adjacencyList, this_source_id, this_target_id, ignore_set);

              if(path_state === true){
                found_path = true;
              };
            };
          });

          if(found_path === true){
            let can_add = true;
            ret.forEach(edge =>{
              if (edge.source == source_node.id || edge.target == source_node.id){
                if (edge.source == target_node.id || edge.target == target_node.id){
                  can_add = false;
                };
              };
            });
            
            if(can_add === true){
              ret.push({"source" : source_node.id, "target" : target_node.id});
            };
          }
        };
      });
    });
  });

  return ret
};

function get_ignore_set(source_id, target_id, child_matrix){
  let ret = new Set();

  for(let key in child_matrix){
    if(source_id != key && target_id != key){
      child_matrix[key].forEach(ignore_id => {
        ret.add(ignore_id);
      });
    };
  };
  
  return ret;
}

function build_adjacency_list(data) {
  const adjacencyList = {};
  data.nodes_raw.forEach(node => {
      adjacencyList[node.id] = [];
  });

  data.links_raw.forEach(link => {
      adjacencyList[link.source].push(link.target);
      adjacencyList[link.target].push(link.source);
  });
  
  return adjacencyList;
};

function does_path_exist(adjacencyList, start, end, visibleNodesSet) {
  const visited = new Set();

  const dfs = (current, target) => {
      if (current === target) return true;
      if (visited.has(current)) return false;

      visited.add(current);

      for (let neighbor of adjacencyList[current]) {
          if (visibleNodesSet.has(neighbor) && neighbor !== target) continue;
          if (!visited.has(neighbor)) {
              if (dfs(neighbor, target)) {
                  return true;
              }
          }
      }
      return false;
  };

  return dfs(start, end);
};

function build_child_matrix(data, visible_nodes){
  let child_matrix = {}

  visible_nodes.forEach(visibe_node => {
    let child_list = [];

    get_chidren(child_list, data.hierarchy.children, visibe_node)

    child_matrix[visibe_node.id] = child_list
  });

  return child_matrix;
};

function get_chidren(full_list, this_list, node){
  this_list.forEach(item => {
    if(item.name === node.id){
      if(item.children){
        if(item.children.length > 0){
          add_children(full_list, item.children);
        }else{
          full_list.push(node.id)
        }
        
      }else{
        full_list.push(node.id)
      }
    }
    else{
      if(item.children){
        if(item.children.length > 0){
          get_chidren(full_list, item.children, node)
        };
      };
    };
  });
};

function add_children(full_list, this_list){
  this_list.forEach(item => {
    
    if(item.children){
      if(item.children.length > 0){
        add_children(full_list, item.children);
      }
    }else{
      full_list.push(item.name)
    }
  });
};
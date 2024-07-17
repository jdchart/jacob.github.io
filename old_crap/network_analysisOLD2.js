export const parse_raw_data = (raw_data) => {
    let ret = {"nodes" : [], "links" : []}
    
    let raw_node_list = [];
    let raw_link_list = [];
    let raw_node_attr_list = [];
    let raw_link_attr_list = [];
    let raw_group_list = [];
    
    raw_data.forEach(item => {
      if("nodes" in item){raw_node_list = item["nodes"];}
      else if("edges" in item){raw_link_list = item["edges"];}
      else if("nodeAttributes" in item){raw_node_attr_list = item["nodeAttributes"];}
      else if("edgeAttributes" in item){raw_link_attr_list = item["edgeAttributes"];}
      else if("cyGroups" in item){raw_group_list = item["cyGroups"];};
    });

    raw_node_list.forEach(node_data => {
      let to_add = {"id" : node_data["@id"], "name" : "", "method" : false, "starter" : false, "children" : [], "external_edges" : [], "internal_edges" : [], "hidden" : true, "unpacked" : false};
      if("n" in node_data){to_add["name"] = node_data["n"];};
      ret["nodes"].push(to_add);
    });

    raw_node_attr_list.forEach(node_attribute_data => {
      let associated_node_index = ret["nodes"].map(function(x) {return x.id; }).indexOf(node_attribute_data["po"]);
      if(node_attribute_data["n"] === "Method"){ret["nodes"][associated_node_index]["method"] = (node_attribute_data["v"] === 'true')}
      else if(node_attribute_data["n"] === "Starter"){ret["nodes"][associated_node_index]["starter"] = (node_attribute_data["v"] === 'true')};
    });

    raw_link_list.forEach(link_data => {
      let to_add = {"id" : link_data["@id"], "source" : link_data["s"], "target" : link_data["t"]};
      ret["links"].push(to_add);
    });

    raw_group_list.forEach(group_data => {
      let associated_node_index = ret["nodes"].map(function(x) {return x.id; }).indexOf(group_data["@id"]);
      if("n" in group_data){ret["nodes"][associated_node_index]["name"] = group_data["n"]};
      if("nodes" in group_data){ret["nodes"][associated_node_index]["children"] = group_data["nodes"]};
      if("external_edges" in group_data){ret["nodes"][associated_node_index]["external_edges"] = group_data["external_edges"]};
      if("internal_edges" in group_data){ret["nodes"][associated_node_index]["internal_edges"] = group_data["internal_edges"]};
    });

    return ret;
};

export const get_starting_nodes = (data) => {
  let ret = new Set();

  data["nodes"].forEach(node => {
      if(node.starter){
          node.hidden = false;
          ret.add(node);
      }
      else{node.hidden = true;};
  });

  return ret;
};

export const get_visible_links = (data, visible_nodes) => {
  let ret = new Set();

  visible_nodes.forEach(visible_node => {
    const node_edges = data.links.filter(link => link.source === visible_node.id || link.target === visible_node.id);
    
    console.log("TREATING", visible_node.name);
    
    node_edges.forEach(edge => {
      const src = data["nodes"].find(ob => (ob.id == edge.source));
      const tgt = data["nodes"].find(ob => (ob.id == edge.target));

      console.log("   ", edge.id, ":", src.name, "-", tgt.name);

      if(visible_nodes.has(src) && visible_nodes.has(tgt)){
        if(ret.has(edge) == false){ret.add(edge); console.log("     added");}
        
      }
    });
  });
  console.log(ret)
  return ret;
};


// // function get_visible_links(){
// //     visible_links.clear();

// //     links.forEach(link => {
// //         let found_source = false;
// //         let found_target = false;
// //         visible_nodes.forEach(node =>{
// //             if (typeof link.source === 'string' || link.source instanceof String){
// //                 if(node.id === link.source){found_source = true;};
// //                 if(node.id === link.target){found_target = true;};
// //             }else{
// //                 if(node.id === link.source.id){found_source = true;};
// //                 if(node.id === link.target.id){found_target = true;};
// //             };
// //         });
// //         if(found_source && found_target){visible_links.add(link);};
// //     });
// // };
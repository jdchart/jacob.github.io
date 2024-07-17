export const get_neighbors = (node_id, network) => {
    return network.links
        .filter(link => link.source === node_id || link.target === node_id)
        .map(link => (link.source === node_id ? link.target : link.source));
};

export const has_path = (start, end, network, visible_nodes) => {
    const visited = new Set();
    const queue = [start];
  
    while (queue.length > 0) {
      const node = queue.shift();
      if (node === end) return true;
      if (!visited.has(node)) {
        visited.add(node);
        const neighbors = get_neighbors(node, network).filter(neighbor => visible_nodes.has(neighbor) || neighbor === end);
        queue.push(...neighbors);
      };
    };
  
    return false;
};

export const are_directly_connected = (node1, node2, visible_links) => {
    return [...visible_links].some(
      link =>
        (link.source === node1.id && link.target === node2.id ) ||
        (link.target === node1.id && link.source === node2.id )
    );
};

export const ensure_path_visibility = (visible_nodes, visible_links, network) => {
    visible_nodes.forEach(node1 => {
      visible_nodes.forEach(node2 => {
        if (node1 !== node2 && !are_directly_connected(node1, node2, visible_links)) {
          if (has_path(node1, node2, network, visible_nodes)) {
            visible_links.add({ source: node1, target: node2 });
          };
        };
      });
    });
};

export const parse_raw_data = (raw_data) => {
    let ret = {"nodes" : [], "links" : []}
    raw_data.elements.nodes.forEach(node => {
        let to_add = {
            "id" : String(node.data.SUID),
            "name" : node.data.name,
            "method" : false,
            "starter" : false,
            "size" : 20,
            "hidden" : true
        };

        if("Method" in node.data){to_add["method"] = node.data.Method}
        if("Starter" in node.data){to_add["starter"] = node.data.Starter}

        ret["nodes"].push(to_add)
    });

    raw_data.elements.edges.forEach(link => {
        let to_add = {
            "source" : link.data.source,
            "target" : link.data.target
        };

        ret["links"].push(to_add)
    });

    return ret;
};
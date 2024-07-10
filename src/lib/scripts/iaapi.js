// docs: https://archive.org/advancedsearch.php
// &sort%5B%5D= &sort%5B%5D= &sort%5B%5D= &rows=50 &page=1"

export const audio_search = async (terms) => {
    const accepted_format = "VBR MP3";
    const search_prefix = "https://archive.org/advancedsearch.php?q=";
    const inner_search_prefix = "https://archive.org/metadata/";
    const direct_link_prefix = "https://archive.org/download/";
    const return_fields = parse_return_fields_array(["identifier", "title", "mediatype"]);
    
    const search_url = search_prefix + parse_terms_array(terms) + return_fields + "&mediatype=audio&output=json";
    
    const response = await fetch(search_url);
    const data = await response.json();


    let permitted_results = [];
    for(var i = 0; i < data.response.docs.length; i++){
        if(data.response.docs[i].mediatype === "audio"){
            permitted_results.push(data.response.docs[i]);
        };
    };

    let final_results = [];

    for(var i = 0; i < permitted_results.length; i++){
        const identifier = permitted_results[i].identifier
        const title = permitted_results[i].title

        const inner_search_url = inner_search_prefix + identifier + "?output=json";
        const inner_rep = await fetch(inner_search_url);
        const responseBody = await inner_rep.text();
        const inner_data = JSON.parse(responseBody);

        let file_list = [];
        for(var j = 0; j < inner_data.files.length; j++){
            if(inner_data.files[j].format === accepted_format){
                let file_name = inner_data.files[j].name;
                file_name = direct_link_prefix + identifier + "/" + file_name;
                file_name = file_name.replaceAll(" ", "%20")
                
                file_list.push(file_name);
            };
        };

        if(file_list.length > 0){
            let to_add = {
                "title" : title,
                "files" : file_list
            };

            final_results.push(to_add);
        };
    };

    return final_results;
};

function parse_return_fields_array(arr){
    let ret = "";
    arr.forEach((element) => {ret = ret + "&fl[]=" + element});
    return ret;
};

function parse_terms_array(arr){
    let ret = arr[0];

    if(arr.length < 1){
        for(var i = 1; i < arr.length; i++){
            ret = ret + "+" + arr[i];
        };
    };

    return ret
};
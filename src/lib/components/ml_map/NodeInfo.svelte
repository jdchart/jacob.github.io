<script>
    import { marked } from 'marked';
    import { createEventDispatcher, afterUpdate } from 'svelte';
    const dispatch = createEventDispatcher();

    let selected_workflow = "0";

    let selected_node = null;
    export let network_style;

    export let workflow_data;

    let description_field;
    let link_field;
    let implementation_field;
    let workflow_description_field;
    let workflow_link_field;
    let workflow_implementation_field;

    export const select_node = (node) => {
        selected_node = node;
    };

    function handle_label_change(){
        dispatch('trigger_update', {});
    };

    afterUpdate(() => {
        if(selected_node != null){
            if("description" in selected_node){
                description_field.innerHTML = marked(selected_node.description);
                addTargetBlankToLinks(description_field);
            };
            if("links" in selected_node){
                if(selected_node.links.length > 0){
                    let to_add = "";
                    selected_node.links.forEach(element => {
                        to_add = to_add + marked(element);
                    });
                    link_field.innerHTML = to_add;
                    addTargetBlankToLinks(link_field);
                };
            };
            if("implementations" in selected_node){
                if(selected_node.implementations.length > 0){
                    let to_add = "";
                    selected_node.implementations.forEach(element => {
                        to_add = to_add + marked(element);
                    });
                    implementation_field.innerHTML = to_add;
                    addTargetBlankToLinks(implementation_field);
                };
            };
        };

        if(selected_workflow != "0"){
            let workflow_data_get = workflow_data.workflows[parseInt(selected_workflow) - 1]
            if("description" in workflow_data_get){
                workflow_description_field.innerHTML = marked(workflow_data_get.description);
                addTargetBlankToLinks(workflow_description_field);
            }
            if("links" in workflow_data_get){
                if(workflow_data_get.links.length > 0){
                    let to_add = "";
                    workflow_data_get.links.forEach(element => {
                        to_add = to_add + marked(element);
                    });
                    workflow_link_field.innerHTML = to_add;
                    addTargetBlankToLinks(workflow_link_field);
                };
            };
            if("implementations" in workflow_data_get){
                if(workflow_data_get.implementations.length > 0){
                    let to_add = "";
                    workflow_data_get.implementations.forEach(element => {
                        to_add = to_add + marked(element);
                    });
                    workflow_implementation_field.innerHTML = to_add;
                    addTargetBlankToLinks(workflow_implementation_field);
                };
            };
        }
	});

    function addTargetBlankToLinks(el) {
        const links = el.querySelectorAll('a');
        links.forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    };

    function handle_workflow_select(){
        let to_send = [];
        if (selected_workflow !== "0"){
            to_send = workflow_data.workflows[parseInt(selected_workflow) - 1].path;
        }
        dispatch('select_workflow', {"path" : to_send});
    };
</script>

<div class="container">
    <div class="top_part">
        <div class="input_field">
            <input type="checkbox" bind:checked={network_style.show_labels} on:change={handle_label_change}/>
            <p>Show labels</p>
        </div>
        <br>
        <div class="input_field">
            <select bind:value={selected_workflow} on:change={() => handle_workflow_select()}>
                <option value="0">None</option>
                {#each workflow_data.workflows as wkfl, i}
                    <option value={String(i + 1)}>
                        {wkfl.name}
                    </option>
                {/each}
            </select>
            <p>Workflows</p>
        </div>
    </div>

    <div class="bottom_part">
        {#if selected_workflow !== "0"}
            <h3>{workflow_data.workflows[parseInt(selected_workflow) - 1].name}</h3>
            <br>

            <div class="input_field_long input_field_label_first">
                <p>Description</p>
                <div class="markdown_content" bind:this={workflow_description_field}></div>
            </div>
            <br>

            <div class="input_field_long input_field_label_first">
                <p>Links</p>
                <div class="markdown_content" bind:this={workflow_link_field}></div>
            </div>
            <br>

            <div class="input_field_long input_field_label_first">
                <p>Implementations</p>
                <div class="markdown_content" bind:this={workflow_implementation_field}></div>
            </div>
            <br>

            <hr />
        {/if}
        
        
        {#if selected_node === null}
            <p class="select_node_message">Select a node...</p>
        {:else}
            <h3>{selected_node.name}</h3>
            <br>
            {#if "description" in selected_node}
                <div class="input_field_long input_field_label_first">
                    <p>Description</p>
                    <div class="markdown_content" bind:this={description_field}></div>
                </div>
                <br>
            {/if}
            {#if "categories" in selected_node}
                <div class="input_field_long input_field_label_first">
                    <p>Categories</p>
                    <p>
                    {#each selected_node.categories as cat}
                        {cat} >
                    {/each}
                   {selected_node.name}
                </p>
                </div>
                <br>
            {/if}
            {#if "links" in selected_node}
                {#if selected_node.links.length > 0}
                    <div class="input_field_long input_field_label_first">
                        <p>Links</p>
                        <div class="markdown_content" bind:this={link_field}></div>
                    </div>
                    <br>
                {/if}
            {/if}
            {#if "implementations" in selected_node}
                {#if selected_node.implementations.length > 0}
                    <div class="input_field_long input_field_label_first">
                        <p>Implementations</p>
                        <div class="markdown_content" bind:this={implementation_field}></div>
                    </div>
                    <br>
                {/if}
            {/if}
        {/if}
    </div>
</div>

<style>
    hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
    }

    .container{
        background-color: rgb(239, 239, 239);
        height: 600px;
        width: 400px;
        display: flex;
        flex-direction: column;
        border: 1px solid rgb(48, 48, 48);
    }

    .top_part{
        background-color: rgb(200, 200, 200);
        border-bottom: 1px solid rgb(48, 48, 48);
        padding: 0.2em;
    }

    .bottom_part{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0.2em;
    }

    .select_node_message{
        padding-top: 3em;
        width: 100%;
        text-align: center;
        font-style: italic;
    }

    .input_field{
        display: flex;
        gap: 0.2em;
        align-items: center;
    }
    .input_field p{
        font-size: 0.8em;
    }

    select{
        font-family: 'Input-Mono-Narrow-Thin', monospace;
        font-size: 0.8em;
    }

    .input_field_label_first p:first-of-type{
        text-decoration: underline;
    }

    .input_field_long{
        display: flex;
        gap: 0.2em;
    }
    .input_field_long p{
        font-size: 0.8em;
    }
</style>
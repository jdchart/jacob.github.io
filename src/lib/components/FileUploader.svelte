<script>
    let getter;
    export let filename = "Load a media file";
    export let accepts = ".json";
    export let label = "button";
    export let callback = (file_object, data) => {return 0};

    function handle_upload(event) {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
            const data = e.target.result;
            await callback(file, data);
            filename = file.name;
            } catch (error) {
            console.error('Error loading media:', error);
            }
        };
        reader.readAsArrayBuffer(file);
        }
    }

    function handle_click(){
        getter.click();
    }
</script>

<div class="input">
    <button on:click={() => handle_click()}>{label}</button>
    <input bind:this={getter} type="file" accept={accepts} on:change={handle_upload} />
    <p>{filename}</p>
</div>

<style>
    .input{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5em;
    }

    .buttons{
        width: 500px;
        background-color: grey;
    }

    input{
        display: none;
    }

    p, button{
        font-size: 0.75em;
        font-family: 'Input-Mono-Narrow-Thin', monospace;
    }
    p{
        color: black;
    }
</style>
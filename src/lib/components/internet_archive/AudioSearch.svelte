<script>
    import * as ia from '$lib/scripts/iaapi.js';
   

    export let terms;
    let title= "";
    let audio_src = "";

    async function search(){
        let results = await ia.audio_search(terms.split(" "));
        console.log(results);

        let rand = Math.floor(Math.random() * results.length);
        let files_rand = Math.floor(Math.random() * results[rand].files.length)

        title = results[rand].title;
        audio_src = results[rand].files[files_rand];

        console.log(audio_src);
    };
</script>

<div class="cont">
    <button on:click={() => search()}>SEARCH</button>

    <p>{title}</p>
    
    {#if audio_src != ""}
        <audio controls>
            <source src={audio_src} type="audio/mpeg" />
        </audio>
    {/if}
</div>

<style>
    .cont{
        display: inline;
    }
</style>

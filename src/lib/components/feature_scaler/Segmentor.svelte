<script>
    // https://chatgpt.com/c/60c35d77-4c3d-4442-9af2-ae9e7b77be12
    
    import { onMount } from 'svelte';

    export let container_element;



</script>

<div class="main_cont">
    <div class="container" bind:this={container_element}>
        <h1>HELLO WORLD</h1>
    
    </div>
</div>




<style>
    .main_cont{
        position: absolute;
        width: 99vw;
    }

    .container{
        width: 100%;
        height: fit-content;
        background-color: white;
        position: absolute;
        top: 0;
        border-bottom: 1px solid grey;
        border-right: 1px solid grey;
        z-index: 100;
        padding: 1em;
    }

    
</style>
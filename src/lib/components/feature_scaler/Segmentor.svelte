<script>
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
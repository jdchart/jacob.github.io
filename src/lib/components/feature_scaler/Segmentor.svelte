<script>
    import { onMount } from 'svelte';
    let spacer;
    let container;


    onMount(() => {
        resize_spacer();
        window.addEventListener('resize', resize_spacer);
    });

    function resize_spacer(){
        spacer.style.height = String(container.offsetHeight )+ 'px'
    }
</script>

<div class="main_cont">
    <div class="container" bind:this={container}>
        <h1>HELLO WOLRD</h1>
    
    </div>
</div>

<div bind:this={spacer} class="spacer"></div>


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

    .spacer{
        width: 100%;
    }
</style>
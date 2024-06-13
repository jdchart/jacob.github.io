<script>
    export let label = "button";
    export let func;
</script>

<button on:click={func}><p>{label}</p></button>

<style>
    button{
        font-size: 0.75em;
        font-family: 'Input-Mono-Narrow-Thin', monospace;
        opacity: 0.25;
    }

    :hover{
        cursor: pointer;
        opacity: 1;
    }

    p{
        padding-top: 2px;
    }
</style>
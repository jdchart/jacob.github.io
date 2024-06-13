<script>
    export let value;
    export let label;
</script>

<div class="cont">
    <input type="range" min="0" max="1000" bind:value={value} class="slider">
    <p>{label}</p>
</div>

<style>
    .cont{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5em;
    }

    input{
        width: 50%;
    }

    p{
        width: 30%;
        font-size: 0.8em;
    }
</style>
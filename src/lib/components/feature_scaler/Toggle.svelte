<script>
    export let value;
    export let label;

</script>

<div class="cont">
    <input type="checkbox" bind:checked={value} class="slider">
    <p>{label}</p>
</div>

<style>
    .cont{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5em;
        padding-top: 0.3em;
    }

    input{
        height: 100%;
    }

    p{
        width: 30%;
        font-size: 0.5em;
        height: 100%;
    }
</style>
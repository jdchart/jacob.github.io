<script>
    export let label = "";
    export let link = "";
    export let desc = "";
</script>

<div class="container">
    <a href={link}>{label}</a>
    <p>{desc}</p>
</div>

<style>
    p{
        padding-top: 1em;
    }
    a{
        font-size: 2em;
        color: black;
    }

    a:hover{
        color: grey;
    }

    .container{
        padding-bottom: 0.5em;
        padding-top: 0.5em;
        border: 1px solid grey;
        padding: 1em;
        margin: 1em;
    }
</style>
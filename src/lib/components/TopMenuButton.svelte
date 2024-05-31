<script>
    export let label = "";
    export let link = "";
</script>

<div class="container">
    <a href={link}>{label}</a>
</div>

<style>
    a{
        font-size: 1em;
        color: black;
    }

    a:hover{
        color: grey;
    }

    .container{
        padding-bottom: 0.5em;
        padding-top: 0.5em;
        padding-left: 0.5em;
    }

    @media (min-width: 1200px) {
        a{
            font-size: 1em;
        }
    }

    @media (max-width: 1200px) {
        a{
            font-size: 0.75em;
        }
    }
</style>
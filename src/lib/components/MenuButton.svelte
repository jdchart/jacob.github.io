<script>
    export let label = "";
    export let link = "";
</script>

<div class="container">
    <a href={link}>{label}</a>
</div>

<style>
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
    }

    @media (min-width: 1200px) {
        a{
            font-size: 2em;
        }
    }

    @media (max-width: 1200px) {
        a{
            font-size: 1.5em;
        }
    }
</style>
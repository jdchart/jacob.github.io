<script>
    import { base } from '$app/paths';
</script>

<div class="container">
    <div class="inner_container">
        <h2>Links</h2>
        <p>GitHub: <a href="https://github.com/SCENE-CE">www.github.com/SCENE-CE</a></p>
        <p>STAGE: <a href="https://stage-to-data.huma-num.fr/">www.stage-to-data.huma-num.fr/</a></p>
        
    </div>
</div>


<style>

    h2{
        font-family: 'Input-Mono-Narrow', monospace;
        font-size: 5em;
        padding-bottom: 0.2em;
    }

    p{
        font-size: 1.5em;
        padding-top: 1em;
    }

    a{
        color: black;
    }

    a:hover{
        color: grey;
    }

    .inner_container{
        border-bottom: solid 1px black;
        border-top: solid 1px black;
    }

    @media (min-width: 1200px) {
        .inner_container{
            height: 75vh;
            overflow: scroll;
            width: 75vw;
        }

        h2{
            font-size: 5em;
        }

        p{
            font-size: 1.5em;
        }
    }

    @media (max-width: 1200px) {
        .inner_container{
            height: 75vh;
            overflow: scroll;
            width: 90vw;
        }

        h2{
            font-size: 3em;
        }

        p{
            font-size: 1em;
        }
    }
</style>
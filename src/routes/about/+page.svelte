<script>
    import { base } from '$app/paths';
</script>

<div class="container">
    <div class="inner_container">
        <h2>About</h2>
        <p>Arvest is an open source, free to use tool for the analysis and navigation of collections of digital documents. Consult, compare, organize and annotate documents, images, videos and audio.</p>
        <p>Arvest is based on the <a href="https://iiif.io/">IIIF standard</a>, and based a modified version of the IIIF viewer <a href="https://projectmirador.org/">Mirador</a>.</p>
        <p>Arvest is currently under development in the context of the ERC-funded <a href="https://stage-to-data.huma-num.fr/">STAGE</a> Project. You can take a look at the current demo sandbox <a href="https://scene.tetras-libre.fr/">here</a>. The first beta is set to release at the end of 2024. It is developped at <a href="https://www.univ-rennes2.fr/ ">Rennes 2 University</a>, France. Developpment is currently funded by <a href="https://www.ouest-valorisation.fr/">SATT Ouest Valorisation</a>.</p>
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
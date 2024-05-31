<script>
    import { base } from '$app/paths';
</script>

<div class="container">
    <div class="inner_container">
        <h2>Terms</h2>
        <p>This project has recieved funding from the Eurepean Research Concil (ERC) under the European Union's Horizon 2020 research and inovation program (grant agreement n° 101097091 - STAGE). Views and opinions expressed are however those of the author(s) only and do not necesseraly reflect those of the European Union or ERC. Neither the european Union nor the granting authority can be held responsible for them.</p>
        <h3>Terms and conditions of use</h3>
        <p>The user acknowledges having read this legal notice and undertakes to comply with it. The user acknowledges that he/she has checked that the computer configuration he/she is using does not contain any virus or any other "malicious software" and that it is in perfect working order. The user is solely responsible for the choice, use and interpretation of the data he/she consults, interrogates and transfers on the Internet. The website owner makes every effort to provide users with available and verified information and/or tools, but cannot be held responsible for errors, lack of availability of information and/or the presence of viruses or "malicious software" on its site.</p>
    </div>
</div>


<style>

    h2{
        font-family: 'Input-Mono-Narrow', monospace;
        font-size: 5em;
        padding-bottom: 0.2em;
    }

    h3{
        font-family: 'Input-Mono-Narrow', monospace;
        font-size: 3em;
        padding-bottom: 0.2em;
        padding-top: 0.2em;
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
        h3{
            font-size: 3em;
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
        h3{
            font-size: 2em;
        }

        p{
            font-size: 1em;
        }
    }
</style>
<script>
    import { base } from '$app/paths';
    import MenuButton from '$lib/components/MenuButton.svelte';

    
</script>

<div class="container">
    <div class="inner_container">
        <h2>Discuss</h2>

        <p>
            We are currently in the process of setting up a user forum. Check back soon!
        </p>

    </div>

    
</div>


<style>
    .content_container{
        background-color: white;
        padding: 1em;
        border-top: solid 1px black;
        margin: auto;
        max-width: 75vw;
        max-height: 75vh;
        overflow: scroll;
    }

    .menu_container{
        background-color: white;
        padding: 1em;
        border-bottom: solid 1px black;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2em;
        max-width: 75vw;
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }

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
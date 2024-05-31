<script>
    import { base } from '$app/paths';
    import MenuButton from '$lib/components/MenuButton.svelte';
</script>

<div class="container">
    <div class="inner_container">
        <div class="title_container">
            <h1>Arvest</h1>
            <p>Data in context</p>
        </div>

        <div class="menu_container">
            <MenuButton 
                label = "ABOUT"
                link = "{base}/about"
            />
            <MenuButton 
                label = "SANDBOX"
                link = "https://scene.tetras-libre.fr/"
            />
            
            <MenuButton 
                label = "DISCUSS"
                link = "{base}/discuss"
            />
        </div>
    </div>
    
</div>

<style>
    .title_container{
        background-color: white;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 1em;
        padding-right: 1em;
        border-top: solid 1px black;
        margin: 2em;
    }

    .menu_container{
        background-color: white;
        padding: 1em;
        border-bottom: solid 1px black;
        margin: 2em;
    }

    h1{
        font-family: 'Input-Mono-Narrow', monospace;
        font-size: 7em;
        padding-bottom: 0.2em;
    }

    p{
        font-size: 3em;
    }

    @media (min-width: 1200px) {
        .container{
            width: auto;
        }

        h1{
            font-size: 7em;
        }

        p{
            font-size: 3em;
        }
    }

    @media (max-width: 1200px) {
        .container{
            width: 100%;
        }

        h1{
            font-size: 3em;
        }

        p{
            font-size: 1.5em;
        }
    }
</style>
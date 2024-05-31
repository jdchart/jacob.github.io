<script>
    import { base } from '$app/paths';
    import TopMenuButton from '$lib/components/TopMenuButton.svelte';
</script>

<nav>
    <TopMenuButton 
        label = "Home"
        link = "{base}/"
    />

    <TopMenuButton 
        label = "Explorer"
        link = "{base}/explorer"
    />

    <TopMenuButton 
        label = "Maker"
        link = "https://colab.research.google.com/drive/1IBGfX52AYIIccxhS5dXXQblXNKXKiVWF?usp=sharing"
    />

</nav>

<style>



    .right_content{
        position: absolute;
        top:0;
        right:0;
        /*height: 100%;*/
        align-items: center;
        display: flex;
        gap: 0.5em;
        flex-wrap: wrap;
        padding-right: 1em;
        /* padding-top: 0.5em; */
        height: 100%;
    }

    a{
        text-decoration: underline;
        color: white;
        
    }
    a:hover{
        cursor: pointer;
        color: grey;
    }


    nav{
        display: flex;
        align-items: center;
        width: 100%;
        
        position: absolute;
        z-index: 9;
        top: 0px;
        padding: 0.5em;
        flex-wrap: wrap;

        justify-content: center; /* Horizontally centers the child */
        align-items: center;  

        /* border-bottom: solid 1px black; */


        transition-duration: 200ms;
        /* background-color: black; */
        /* background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, rgb(0, 0, 0, 1) 99%); */
    }
</style>
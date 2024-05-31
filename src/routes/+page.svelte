<script>
    import { base } from '$app/paths';
    import MenuButton from '$lib/components/MenuButton.svelte';
</script>

<div class="container">
    <div class="inner_container">
        <MenuButton 
            label = "Corpus Explorer"
            link = "{base}/explorer"
            desc = "A simple interface for exploring a sound corpus."
        />
        <MenuButton 
            label = "Corpus Maker"
            link = "https://colab.research.google.com/drive/1IBGfX52AYIIccxhS5dXXQblXNKXKiVWF?usp=sharing"
            desc = "A python notebook for creating a sound corpus on Google Collab."
        />
    </div>
    
</div>

<style>

</style>
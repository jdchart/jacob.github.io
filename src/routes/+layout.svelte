<script>
	import './reset.css';
	import './theme.css';
	import {fade} from 'svelte/transition';
	import { base } from '$app/paths';
	export let data;

	console.log(data.url)

	import Footer from '$lib/components/Footer.svelte';
	import TopMenu from '$lib/components/TopMenu.svelte';
</script>

<div class="container">
	{#key data.url}
		<div class="transition_div"
			in:fade={{x: 0, duration:100, delay:100}}
			out:fade={{x: 0, duration:100}}
		>
		{#if data.url != base + "/" && data.url != "/sveltekit-github-pages/" && data.url != "/" && data.url != base}
			<TopMenu />
		{/if}
			<slot />

			<Footer />
		</div>

		
	{/key}
	
</div>



<style>
	.container{
        margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: relative;
    }

	.transition_div{
		z-index: 1;
		width: 100%;
		height: 100%;
		display: flex;
        justify-content: center;
        align-items: center;
	}
</style>
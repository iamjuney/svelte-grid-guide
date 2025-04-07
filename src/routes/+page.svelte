<script lang="ts">
	import { defaultOptions } from '$lib/gridState.svelte';
	import { GridOverlay } from '$lib/index.js';
	import type { Position as PositionType } from '$lib/types.js';
	import Footer from '../components/Footer.svelte';
	import Hero from '../components/Hero.svelte';
	import Installation from '../components/Installation.svelte';
	import Position from '../components/Position.svelte';
	import Usage from '../components/Usage.svelte';

	let position: PositionType = $state('bottom-right');
</script>

<svelte:head>
	<title>Svelte Grid Guide</title>
	<meta content="width=device-width, initial-scale=1" name="viewport" />
	<meta
		name="description"
		content="A customizable grid overlay system for Svelte applications."
	/>
	<meta
		name="keywords"
		content="svelte, grid, layout, design, overlay, guide"
	/>
	<meta name="author" content="Aljon Lerios" />
	<meta name="og:title" content="Svelte Grid Guide" />
	<meta
		name="og:description"
		content="A customizable grid overlay system for Svelte applications."
	/>
	<meta property="og:site_name" content="Svelte Grid Guide" />
	<meta property="og:url" content="https://svelte-grid-guide.vercel.app" />
	<meta
		property="og:image"
		content="https://og-image.vercel.app/Svelte%20Grid%20Guide"
	/>
	<link rel="icon" href="/favicon.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@iamjuney_1412" />
	<meta
		name="twitter:description"
		content="A customizable grid overlay system for Svelte applications."
	/>
	<meta name="twitter:title" content="Svelte Grid Guide" />
	<meta
		property="twitter:image"
		content="https://og-image.vercel.app/Svelte%20Grid%20Guide"
	/>
</svelte:head>

<GridOverlay options={defaultOptions} {position} />

<main class="mx-auto max-w-[610px] px-4 md:px-[16px]">
	<Hero />
	<div class="mt-24 flex flex-col gap-12">
		<Installation />
		<Usage />
		<Position bind:position />
	</div>
</main>
<Footer />

<script>
	import { gridOverlay } from '$lib';
	import { onMount } from 'svelte';

	let activeCol = -1;
	let isAnimating = false;

	// Animation for the grid columns
	function startAnimation() {
		if (isAnimating) return;
		isAnimating = true;

		let currentCol = 0;
		const interval = setInterval(() => {
			activeCol = currentCol;
			currentCol = (currentCol + 1) % 12;

			if (currentCol === 0) {
				clearInterval(interval);
				setTimeout(() => {
					activeCol = -1;
					isAnimating = false;
				}, 300);
			}
		}, 100);
	}

	onMount(() => {
		// Start animation when component mounts
		startAnimation();

		// Repeat animation periodically
		const timer = setInterval(startAnimation, 5000);
		return () => clearInterval(timer);
	});
</script>

<div class="flex flex-col items-center gap-3">
	<div
		class="relative mx-auto h-[120px] w-full max-w-[400px] overflow-hidden"
	>
		<div
			role="cell"
			aria-label="Grid Overlay"
			aria-hidden="true"
			class="grid h-full w-full grid-cols-12 gap-2 overflow-hidden rounded-md border border-gray-200 bg-gradient-to-b from-white/20 to-white/5 p-0 px-4 backdrop-blur-sm"
			onmouseenter={startAnimation}
		>
			{#each Array(12) as _, i}
				<div
					role="cell"
					aria-label="Grid Column {i + 1}"
					aria-hidden="true"
					class="h-full rounded transition-all duration-300 {activeCol ===
					i
						? 'scale-y-110 bg-red-500/80'
						: 'bg-red-500/20'}"
					onmouseenter={() => (activeCol = i)}
					onmouseleave={() => (activeCol = -1)}
				></div>
			{/each}
		</div>

		<!-- Add radial gradient overlay for better text separation -->
		<div
			class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white opacity-90"
		></div>
	</div>
	<h1
		class="z-20 mt-[-20px] mb-3 bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-4xl font-bold text-transparent drop-shadow-sm md:text-5xl"
	>
		Svelte Grid Guide
	</h1>
	<p class="mx-auto mt-0 mb-3 max-w-md text-center text-lg text-gray-800">
		A customizable grid overlay system for SvelteKit applications.
	</p>
	<div class="mt-2 flex gap-2">
		<button
			data-testid="toggle-button"
			data-primary=""
			onclick={() => gridOverlay.toggle()}
			class="font-inherit flex h-10 flex-shrink-0 cursor-pointer items-center rounded-md border-none bg-black px-7 py-0 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800"
		>
			Toggle Grid Overlay
		</button>
		<a
			class="font-inherit position-relative flex h-10 flex-shrink-0 cursor-pointer items-center overflow-hidden rounded-md border border-gray-200 bg-gradient-to-b from-white to-gray-100 px-7 py-0 text-sm font-semibold text-black no-underline shadow-sm hover:shadow-md"
			href="https://github.com/iamjuney/svelte-grid-guide"
			target="_blank"
		>
			GitHub
		</a>
	</div>
</div>

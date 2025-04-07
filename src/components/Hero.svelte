<script>
	import { gridOverlay } from '$lib';
</script>

<div class="flex flex-col items-center gap-3">
	<div
		class="relative mx-auto h-[120px] w-full max-w-[400px] overflow-hidden"
	>
		<div
			class="grid h-full w-full grid-cols-12 gap-2 overflow-hidden rounded-md border border-gray-200 bg-white/10 p-0 px-4"
		>
			{#each Array(12) as _, i}
				<div class="h-full rounded bg-red-500/20"></div>
			{/each}
		</div>
	</div>
	<h1 class="mt-[-20px] mb-3 text-4xl font-bold md:text-5xl">
		Svelte Grid Guide
	</h1>
	<p class="mt-0 mb-3 text-center text-lg">
		A customizable grid overlay system for Svelte applications.
	</p>
	<div class="flex gap-2">
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

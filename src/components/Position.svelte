<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';

	const positions = [
		'top-left',
		'top-center',
		'top-right',
		'bottom-left',
		'bottom-center',
		'bottom-right'
	] as const;

	interface Props {
		position: (typeof positions)[number];
	}

	let { position = $bindable() }: Props = $props();
</script>

<div>
	<h2 class="text-base font-medium text-gray-900">Position</h2>
	<p class="text-base leading-6 text-gray-900">
		Change the position of the floating control panel.
	</p>
	<div class="my-3 flex flex-wrap gap-2">
		{#each positions as pos}
			<button
				data-active={position === pos}
				class="flex h-8 cursor-pointer items-center justify-center rounded-md border-none bg-gray-100 px-3 text-gray-900 transition-colors hover:bg-gray-200 data-[active=true]:bg-gray-300"
				onclick={() => {
					position = pos;
				}}
			>
				{pos}
			</button>
		{/each}
	</div>
	<CodeBlock code={`<GridOverlay position="${position}" />`} />
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { gridOverlay } from './gridState.svelte';
	import ToggleButton from './ToggleButton.svelte';
	import type { GridOverlayOptions, Position } from './types';

	// Component props
	interface Props {
		options?: GridOverlayOptions;
		position?: Position;
	}

	let { options = {}, position = 'bottom-right' }: Props = $props();

	// When the component mounts, update the options in the store
	onMount(() => {
		// If options.visible is set, update the gridVisible state
		if (options?.visible !== undefined) {
			if (options.visible) {
				gridOverlay.show();
			} else {
				gridOverlay.hide();
			}
		}

		// Update the grid options
		if (Object.keys(options).length > 0) {
			gridOverlay.setOptions(options);
		}
	});

	// Local variables to directly access state
	let currentOptions = $derived(gridOverlay.getGridOptions());
	let isVisible = $derived(gridOverlay.getGridVisible());

	// Helper function to add units to numeric values (always px)
	function addUnit(
		value: number | string | undefined,
		defaultValue: number
	): string {
		if (value === undefined) {
			return `${defaultValue}px`;
		}
		if (typeof value === 'number') {
			return `${value}px`;
		}
		return value;
	}
</script>

{#if isVisible}
	<div
		class="pointer-events-none fixed inset-0 box-border h-screen w-screen"
		style="z-index: {currentOptions.zIndex || 9990};"
	>
		{#if currentOptions.showMargins}
			<div
				class="outer-margin-container"
				style="
					--max-width: {addUnit(currentOptions.maxWidth, 1200)};
					--margin-color: {currentOptions.marginColor || '#0000ff'};
					--opacity: {currentOptions.opacity || 0.2};
				"
			></div>
		{/if}
		<div
			class="pointer-events-none relative mx-auto grid h-full w-full"
			style="
				grid-template-columns: repeat({currentOptions.columns || 12}, 1fr);
				gap: {addUnit(currentOptions.gap, 24)};
				max-width: {addUnit(currentOptions.maxWidth, 1200)};
				padding: 0 {addUnit(currentOptions.padding, 16)};
			"
		>
			{#each Array(currentOptions.columns || 12) as _, i}
				<div
					class="h-full"
					style="
						background-color: {currentOptions.color || '#ff0000'};
						opacity: {currentOptions.opacity || 0.2};
					"
				></div>
			{/each}
		</div>
	</div>
{/if}

<!-- Toggle button wrapper with higher z-index to ensure it stays on top of the overlay -->
<div
	style="position: relative; z-index: {(currentOptions.zIndex || 9990) + 10};"
>
	<ToggleButton {position} />
</div>

<style>
	.outer-margin-container {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		pointer-events: none;
	}

	.outer-margin-container::before,
	.outer-margin-container::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		background-color: var(--margin-color, #0000ff);
		opacity: var(--opacity, 0.2);
		width: calc((100% - var(--max-width)) / 2);
		height: 100%;
	}

	.outer-margin-container::before {
		left: 0;
	}

	.outer-margin-container::after {
		right: 0;
	}
</style>

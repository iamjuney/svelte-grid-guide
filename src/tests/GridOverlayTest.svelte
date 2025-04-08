<script lang="ts">
	import { GridOverlay } from '$lib';
	import { gridOverlay } from '$lib/gridState.svelte';
	import type { GridOverlayOptions, Position } from '$lib/types';

	// Props for testing
	let {
		options = {},
		position = 'bottom-right'
	}: { options: GridOverlayOptions; position: Position } = $props();

	function showGrid() {
		gridOverlay.show();
	}

	function hideGrid() {
		gridOverlay.hide();
	}

	function toggleGrid() {
		gridOverlay.toggle();
	}

	function setOptions(newOptions: Partial<GridOverlayOptions>) {
		gridOverlay.setOptions(newOptions);
	}

	function resetOptions() {
		gridOverlay.resetOptions();
	}

	function setMobileOptions() {
		gridOverlay.setMobileOptions();
	}
</script>

<div>
	<GridOverlay {options} {position} />
</div>

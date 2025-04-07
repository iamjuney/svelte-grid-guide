export function getOtherCodeSnippet(snippet: string, showMargins: boolean, visible: boolean) {
	return `<script>
  ${snippet || ''}
</script>

<!-- ... -->

<GridOverlay options={{ ${showMargins ? 'showMargins: true, ' : ''} ${visible ? 'visible: true, ' : ''} }} />`;
}

export const usageSnippet = `<script>
	import { GridOverlay } from 'svelte-grid-guide'
	
	// Configuration options with default values
	const options = {
		columns: 12,
		maxWidth: 1200,
		gap: 24, 
		opacity: 0.2,
		color: '#ff0000',
		showMargins: true,
		marginColor: '#0000ff',
		padding: 16,
		zIndex: 9999,
		visible: false
	}
</script>

<!-- ... -->

<!-- All options are optional and will use defaults if not provided -->
<GridOverlay {options} />

<!-- Your app content will be displayed with the grid overlay -->`;

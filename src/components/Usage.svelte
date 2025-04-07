<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';
	import { usageSnippet } from './code-snippets';
</script>

<div>
	<h2 class="text-base font-medium text-gray-900">Usage</h2>
	<p class="text-base leading-6 text-gray-900">
		Add the GridOverlay component to your app's layout or root component.
	</p>
	<CodeBlock code={usageSnippet} />
	<p class="mt-3 text-base leading-6 text-gray-900">
		The grid overlay is hidden by default but can be toggled using the
		floating control panel that appears in the bottom right corner of the
		screen.
	</p>
</div>

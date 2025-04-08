<script lang="ts">
	import copy from 'copy-to-clipboard';
	import { Check, ClipboardText } from 'phosphor-svelte';

	let copying = $state(0);
	let copyingTailwind = $state(0);

	const onCopy = () => {
		copy('npm install @iamjuney/svelte-grid-guide');
		copying++;
		setTimeout(() => {
			copying--;
		}, 2000);
	};

	const onCopyTailwind = () => {
		copy('bunx sv add tailwindcss');
		copyingTailwind++;
		setTimeout(() => {
			copyingTailwind--;
		}, 2000);
	};
</script>

<div>
	<h2 class="text-base font-medium text-gray-900">Installation</h2>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<code
		class="relative flex h-10 cursor-copy items-center rounded-md border border-gray-200 bg-gradient-to-t from-gray-100 to-gray-50 px-[62px] py-0 pr-3 pl-3 font-mono text-sm"
		onclick={onCopy}
	>
		bun add @iamjuney/svelte-grid-guide{' '}
		<button
			aria-label="Copy code"
			class="absolute top-1/2 right-1.5 flex h-[26px] w-[26px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-900"
		>
			{#if copying}
				<Check size={14} weight="bold" />
			{:else}
				<ClipboardText size={14} weight="bold" />
			{/if}
		</button>
	</code>

	<p class="mt-4 mb-2 text-sm text-gray-600">
		This package requires Tailwind CSS v4. If not already installed, add it
		to your project:
	</p>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<code
		class="relative flex h-10 cursor-copy items-center rounded-md border border-gray-200 bg-gradient-to-t from-gray-100 to-gray-50 px-[62px] py-0 pr-3 pl-3 font-mono text-sm"
		onclick={onCopyTailwind}
	>
		bunx sv add tailwindcss{' '}
		<button
			aria-label="Copy code"
			class="absolute top-1/2 right-1.5 flex h-[26px] w-[26px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-900"
		>
			{#if copyingTailwind}
				<Check size={14} weight="bold" />
			{:else}
				<ClipboardText size={14} weight="bold" />
			{/if}
		</button>
	</code>
</div>

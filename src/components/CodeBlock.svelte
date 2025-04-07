<script lang="ts">
	import copy from 'copy-to-clipboard';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import xml from 'highlight.js/lib/languages/xml';
	import 'highlight.js/styles/github.css';
	import { Check, ClipboardText } from 'phosphor-svelte';

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('xml', xml);

	// Component props
	interface Props {
		autodetect?: boolean;
		language?: string;
		ignoreIllegals?: boolean;
		code: string;
		className?: string;
		setLanguage?: (language: string) => void;
	}

	let {
		autodetect = true,
		language = '',
		ignoreIllegals = true,
		code,
		className = '',
		setLanguage = () => {}
	}: Props = $props();

	let codeElement: HTMLElement;

	function escapeHtml(value: string): string {
		return value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#x27;');
	}

	let copying = $state(0);
	let highlightedCode = $state('');

	const cannotDetectLanguage = $derived(
		!autodetect && !hljs.getLanguage(language)
	);
	const computedClassName = $derived(
		cannotDetectLanguage ? '' : `hljs ${language} ${className}`
	);

	$effect(() => {
		if (cannotDetectLanguage) {
			highlightedCode = escapeHtml(code);
		} else if (autodetect) {
			const result = hljs.highlightAuto(code);
			// Use the callback function instead of dispatch
			setLanguage(result.language ?? '');
			highlightedCode = result.value;
		} else {
			const result = hljs.highlight(code, {
				language,
				ignoreIllegals
			});
			highlightedCode = result.value;
		}
	});

	$effect(() => {
		if (codeElement) {
			codeElement.innerHTML = highlightedCode;
		}
	});

	const onCopy = () => {
		copy(code);
		copying++;
		setTimeout(() => {
			copying--;
		}, 2000);
	};
</script>

<div class="relative">
	<button
		class="absolute top-3 right-3 z-10 flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 focus-visible:shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
		onclick={onCopy}
		aria-label="Copy code"
	>
		{#if copying}
			<Check size={14} weight="bold" />
		{:else}
			<ClipboardText size={14} weight="bold" />
		{/if}
	</button>

	<div
		class="group relative mt-4 overflow-hidden rounded-md border border-gray-200"
	>
		<div
			class="{computedClassName} relative m-0 rounded-none bg-gray-50 bg-gradient-to-t from-gray-100 to-gray-50 p-4 text-sm leading-[17px] whitespace-pre-wrap"
		>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<code bind:this={codeElement} />
		</div>
	</div>
</div>

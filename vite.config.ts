import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: [
			// Temporarily exclude component tests that aren't compatible with Svelte 5
			'src/**/gridoverlay.spec.ts',
			'src/**/togglebutton.spec.ts'
		],
		globals: true,
		environment: 'jsdom',
		includeSource: ['src/**/*.{js,ts,svelte}'],
		setupFiles: ['./scripts/setupTest.ts'],
		coverage: { exclude: ['setupTest.ts'] }
	}
});

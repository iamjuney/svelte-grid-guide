// setupTest.ts
/* eslint-disable @typescript-eslint/no-empty-function */
import { vi } from 'vitest';
// Fix matchers import for newer version of testing-library/jest-dom
import * as environment from '$app/environment';
import * as navigation from '$app/navigation';
import * as stores from '$app/stores';
import type { Navigation, Page } from '@sveltejs/kit';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { readable } from 'svelte/store';

configure({
	asyncUtilTimeout: 1500
});

// Mock SvelteKit runtime module $app/environment
vi.mock('$app/environment', (): typeof environment => ({
	browser: false,
	dev: true,
	building: false,
	version: 'any'
}));

// Mock SvelteKit runtime module $app/navigation
vi.mock('$app/navigation', (): typeof navigation => ({
	afterNavigate: () => {},
	beforeNavigate: () => {},
	disableScrollHandling: () => {},
	goto: () => Promise.resolve(),
	invalidate: () => Promise.resolve(),
	invalidateAll: () => Promise.resolve(),
	preloadData: () =>
		Promise.resolve({
			type: 'loaded',
			status: 200,
			data: {}
		}),
	preloadCode: () => Promise.resolve(),
	onNavigate: () => {
		return () => {};
	}, // Return unsubscribe function
	pushState: () => {},
	replaceState: () => {}
}));

// Mock SvelteKit runtime module $app/stores
vi.mock('$app/stores', (): typeof stores => {
	const getStores: typeof stores.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>({
			url: new URL('http://localhost'),
			params: {},
			route: {
				id: null
			},
			status: 200,
			error: null,
			data: {},
			form: undefined,
			state: {} // Add the missing state property required by the Page type
		});
		const updated = { subscribe: readable(false).subscribe, check: async () => false };

		return { navigating, page, updated };
	};

	const page: typeof stores.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		}
	};
	const navigating: typeof stores.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		}
	};
	const updated: typeof stores.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: async () => false
	};

	return {
		getStores,
		navigating,
		page,
		updated
	};
});

Element.prototype.scrollIntoView = () => {};

export const mediaQueryState = {
	matches: false
};

const listeners: ((event: unknown) => void)[] = [];

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: mediaQueryState.matches,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn((type, callback) => {
			if (type === 'change') {
				listeners.push(callback);
			}
		}),
		removeEventListener: vi.fn((type, callback) => {
			const index = listeners.indexOf(callback);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		}),
		dispatchEvent: vi.fn((event) => {
			if (event.type === 'change') {
				for (const callback of listeners) {
					callback({
						matches: mediaQueryState.matches,
						media: '(prefers-color-scheme: light)'
					});
				}
			}
		})
	}))
});

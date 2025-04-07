import type { GridOverlayOptions } from './types';

// Default options for the grid overlay
export const defaultOptions: GridOverlayOptions = {
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
};

// Mobile default options
export const mobileDefaultOptions: GridOverlayOptions = {
	columns: 4,
	maxWidth: 375,
	gap: 16,
	opacity: 0.2,
	color: '#ff0000',
	showMargins: true,
	marginColor: '#0000ff',
	padding: 16,
	zIndex: 9999,
	visible: false
};

// Create private state variables
let _gridOptions = $state<GridOverlayOptions>(structuredClone(defaultOptions));
let _gridVisible = $state<boolean>(false);

// Expose state via getter functions
export function getGridOptions(): GridOverlayOptions {
	return _gridOptions;
}

export function getGridVisible(): boolean {
	return _gridVisible;
}

// Helper functions for managing the grid
export const gridOverlay = {
	/**
	 * Show the grid overlay
	 */
	show: () => {
		_gridVisible = true;
	},

	/**
	 * Hide the grid overlay
	 */
	hide: () => {
		_gridVisible = false;
	},

	/**
	 * Toggle the visibility of the grid overlay
	 */
	toggle: () => {
		_gridVisible = !_gridVisible;
	},

	/**
	 * Update grid options
	 * @param options The options to update
	 */
	setOptions: (options: Partial<GridOverlayOptions>) => {
		_gridOptions = { ..._gridOptions, ...options };
	},

	/**
	 * Reset grid options to defaults
	 */
	resetOptions: () => {
		// Use structuredClone to create a deep copy of defaultOptions
		_gridOptions = structuredClone(defaultOptions);
	},

	/**
	 * Set grid options to mobile defaults
	 */
	setMobileOptions: () => {
		// Use structuredClone to create a deep copy of mobileDefaultOptions
		_gridOptions = structuredClone(mobileDefaultOptions);
	}
};

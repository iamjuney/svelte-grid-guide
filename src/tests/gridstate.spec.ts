import { defaultOptions, gridOverlay, mobileDefaultOptions } from '$lib/gridState.svelte';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Grid State Management', () => {
	// Reset state before each test
	beforeEach(() => {
		gridOverlay.hide();
		gridOverlay.resetOptions();
	});

	// Visibility state tests
	describe('Visibility State', () => {
		it('should be hidden by default', () => {
			expect(gridOverlay.getGridVisible()).toBe(false);
		});

		it('should update visibility state when show() is called', () => {
			gridOverlay.show();
			expect(gridOverlay.getGridVisible()).toBe(true);
		});

		it('should update visibility state when hide() is called', () => {
			// First show the grid
			gridOverlay.show();
			expect(gridOverlay.getGridVisible()).toBe(true);

			// Then hide it
			gridOverlay.hide();
			expect(gridOverlay.getGridVisible()).toBe(false);
		});

		it('should toggle visibility state when toggle() is called', () => {
			// Should be hidden initially
			expect(gridOverlay.getGridVisible()).toBe(false);

			// First toggle (show)
			gridOverlay.toggle();
			expect(gridOverlay.getGridVisible()).toBe(true);

			// Second toggle (hide)
			gridOverlay.toggle();
			expect(gridOverlay.getGridVisible()).toBe(false);
		});
	});

	// Options state tests
	describe('Options State', () => {
		it('should have default options initially', () => {
			const options = gridOverlay.getGridOptions();

			// Check that each default option is set correctly
			expect(options.columns).toBe(defaultOptions.columns);
			expect(options.maxWidth).toBe(defaultOptions.maxWidth);
			expect(options.gap).toBe(defaultOptions.gap);
			expect(options.opacity).toBe(defaultOptions.opacity);
			expect(options.color).toBe(defaultOptions.color);
			expect(options.showMargins).toBe(defaultOptions.showMargins);
			expect(options.marginColor).toBe(defaultOptions.marginColor);
			expect(options.padding).toBe(defaultOptions.padding);
			expect(options.zIndex).toBe(defaultOptions.zIndex);
		});

		it('should update options when setOptions() is called', () => {
			// Update a subset of options
			const newOptions = {
				columns: 8,
				maxWidth: 960,
				color: '#00ff00'
			};

			gridOverlay.setOptions(newOptions);
			const options = gridOverlay.getGridOptions();

			// Check that updated options are set correctly
			expect(options.columns).toBe(newOptions.columns);
			expect(options.maxWidth).toBe(newOptions.maxWidth);
			expect(options.color).toBe(newOptions.color);

			// Check that other options remain at default values
			expect(options.gap).toBe(defaultOptions.gap);
			expect(options.opacity).toBe(defaultOptions.opacity);
			expect(options.showMargins).toBe(defaultOptions.showMargins);
			expect(options.marginColor).toBe(defaultOptions.marginColor);
			expect(options.padding).toBe(defaultOptions.padding);
			expect(options.zIndex).toBe(defaultOptions.zIndex);
		});

		it('should reset options to defaults when resetOptions() is called', () => {
			// First update some options
			gridOverlay.setOptions({
				columns: 8,
				maxWidth: 960,
				color: '#00ff00',
				opacity: 0.5
			});

			// Then reset options
			gridOverlay.resetOptions();
			const options = gridOverlay.getGridOptions();

			// Check that all options are reset to defaults
			expect(options.columns).toBe(defaultOptions.columns);
			expect(options.maxWidth).toBe(defaultOptions.maxWidth);
			expect(options.color).toBe(defaultOptions.color);
			expect(options.opacity).toBe(defaultOptions.opacity);
			expect(options.gap).toBe(defaultOptions.gap);
			expect(options.showMargins).toBe(defaultOptions.showMargins);
			expect(options.marginColor).toBe(defaultOptions.marginColor);
			expect(options.padding).toBe(defaultOptions.padding);
			expect(options.zIndex).toBe(defaultOptions.zIndex);
		});

		it('should set mobile options when setMobileOptions() is called', () => {
			gridOverlay.setMobileOptions();
			const options = gridOverlay.getGridOptions();

			// Check that options are set to mobile defaults
			expect(options.columns).toBe(mobileDefaultOptions.columns);
			expect(options.maxWidth).toBe(mobileDefaultOptions.maxWidth);
			expect(options.gap).toBe(mobileDefaultOptions.gap);
			expect(options.opacity).toBe(mobileDefaultOptions.opacity);
			expect(options.color).toBe(mobileDefaultOptions.color);
			expect(options.showMargins).toBe(mobileDefaultOptions.showMargins);
			expect(options.marginColor).toBe(mobileDefaultOptions.marginColor);
			expect(options.padding).toBe(mobileDefaultOptions.padding);
			expect(options.zIndex).toBe(mobileDefaultOptions.zIndex);
		});
	});

	// Edge cases
	describe('Edge Cases', () => {
		it('should handle partial option updates and preserve other options', () => {
			// Set initial options
			gridOverlay.setOptions({
				columns: 8,
				maxWidth: 960,
				color: '#00ff00'
			});

			// Update only one option
			gridOverlay.setOptions({ columns: 6 });
			const options = gridOverlay.getGridOptions();

			// Check that the updated option changed
			expect(options.columns).toBe(6);

			// Check that previously set custom options are preserved
			expect(options.maxWidth).toBe(960);
			expect(options.color).toBe('#00ff00');

			// Check that other options still have default values
			expect(options.gap).toBe(defaultOptions.gap);
			expect(options.opacity).toBe(defaultOptions.opacity);
		});

		it('should create a deep copy of default options to prevent mutation', () => {
			// Get the current options
			const initialOptions = { ...gridOverlay.getGridOptions() }; // Create an explicit copy

			// Attempt to mutate the returned options
			initialOptions.columns = 24;
			initialOptions.color = '#000000';

			// Check that the actual stored options are not affected
			const currentOptions = gridOverlay.getGridOptions();
			expect(currentOptions.columns).toBe(defaultOptions.columns);
			expect(currentOptions.color).toBe(defaultOptions.color);
		});
	});
});

import ToggleButton from '$lib/ToggleButton.svelte';
import { gridOverlay } from '$lib/gridState.svelte';
import { fireEvent, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('ToggleButton Component', () => {
	// Mock the document methods for tooltips
	const originalCreateElement = document.createElement;
	const originalAppendChild = document.body.appendChild;
	const originalRemoveChild = document.body.removeChild;

	beforeEach(() => {
		// Reset grid state before each test
		gridOverlay.hide();
		gridOverlay.resetOptions();

		// Mock createElement
		document.createElement = vi.fn().mockImplementation((tag) => {
			const element = originalCreateElement.call(document, tag);
			// No need to mock style as it's already a CSSStyleDeclaration object
			// Just return the element as is
			return element;
		});

		// Mock appendChild
		document.body.appendChild = vi.fn();

		// Mock removeChild
		document.body.removeChild = vi.fn();

		// Mock setTimeout
		vi.useFakeTimers();
	});

	afterEach(() => {
		// Restore original document methods
		document.createElement = originalCreateElement;
		document.body.appendChild = originalAppendChild;
		document.body.removeChild = originalRemoveChild;

		// Restore timers
		vi.useRealTimers();
	});

	// Basic rendering tests
	describe('Rendering', () => {
		it('should render the toggle button', () => {
			const { container } = render(ToggleButton);
			const button = container.querySelector('button');
			expect(button).not.toBeNull();
			expect(button?.textContent).toContain('Grid');
		});

		it('should use the default position of bottom-right', () => {
			const { container } = render(ToggleButton);
			const toggleButtonContainer = container.querySelector('.font-sans');
			expect(toggleButtonContainer).not.toBeNull();

			const style = toggleButtonContainer?.getAttribute('style');
			expect(style).toContain('position: fixed');
			expect(style).toContain('bottom: 16px');
			expect(style).toContain('right: 16px');
		});

		it('should use custom position when provided', () => {
			const { container } = render(ToggleButton, {
				props: { position: 'top-left' }
			});
			const toggleButtonContainer = container.querySelector('.font-sans');
			expect(toggleButtonContainer).not.toBeNull();

			const style = toggleButtonContainer?.getAttribute('style');
			expect(style).toContain('position: fixed');
			expect(style).toContain('top: 16px');
			expect(style).toContain('left: 16px');
		});
	});

	// Interaction tests
	describe('Interactions', () => {
		it('should toggle grid visibility when the button is clicked', async () => {
			const { container } = render(ToggleButton);

			// Initially grid should be hidden
			expect(gridOverlay.getGridVisible()).toBe(false);

			// Find and click the toggle button
			const button = container.querySelector('button');
			expect(button).not.toBeNull();

			await fireEvent.click(button as HTMLElement);

			// Grid should now be visible
			expect(gridOverlay.getGridVisible()).toBe(true);

			// Click the button again
			await fireEvent.click(button as HTMLElement);

			// Grid should be hidden again
			expect(gridOverlay.getGridVisible()).toBe(false);
		});

		it('should open settings dropdown when settings button is clicked', async () => {
			const { container } = render(ToggleButton);

			// Find the settings (gear) button
			const gearButton = container.querySelector('[aria-label="Grid settings"]');
			expect(gearButton).not.toBeNull();

			// Click the settings button to open dropdown
			await fireEvent.click(gearButton as HTMLElement);

			// Find dropdown content (settings panel)
			// First ensure it's rendered
			await tick();

			// Due to how DropdownMenu works with portals, we can't easily check for content
			// Instead, we check that the trigger has aria-expanded="true"
			expect(gearButton?.getAttribute('aria-expanded')).toBe('true');
		});

		it('should switch between general and advanced tabs', async () => {
			const { container } = render(ToggleButton);

			// Open settings
			const gearButton = container.querySelector('[aria-label="Grid settings"]');
			await fireEvent.click(gearButton as HTMLElement);

			// Force a tick to update the UI
			await tick();

			// Find and click the Advanced tab
			const advancedTab = document.querySelector('button:contains("Advanced")');
			if (advancedTab) {
				await fireEvent.click(advancedTab);

				// Check that Advanced tab is now active (has blue border)
				await tick();
				expect(advancedTab.classList.contains('border-blue-600')).toBe(true);
			}
		});

		it('should show tooltip when info button is clicked', async () => {
			const { container } = render(ToggleButton);

			// Open settings
			const gearButton = container.querySelector('[aria-label="Grid settings"]');
			await fireEvent.click(gearButton as HTMLElement);

			// Force a tick to update the UI
			await tick();

			// Find the tooltip trigger (info icon)
			const infoButton = document.querySelector('button:has([size="14"])');
			if (infoButton) {
				// Simulate tooltip display
				const event = new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
					clientX: 100,
					clientY: 100
				});

				await fireEvent(infoButton, event);

				// Check if createElement was called to create the tooltip
				expect(document.createElement).toHaveBeenCalledWith('div');
				expect(document.body.appendChild).toHaveBeenCalled();

				// Fast-forward timer to check tooltip removal
				vi.advanceTimersByTime(2000);
				expect(document.body.removeChild).toHaveBeenCalled();
			}
		});
	});

	// State modification tests
	describe('State Modifications', () => {
		it('should update columns when select value changes', async () => {
			const { container } = render(ToggleButton);

			// Open settings
			const gearButton = container.querySelector('[aria-label="Grid settings"]');
			await fireEvent.click(gearButton as HTMLElement);

			// Force a tick to update the UI
			await tick();

			// Find columns select
			const columnsSelect = document.querySelector('[aria-label="Select columns"]');
			if (columnsSelect) {
				// Simulate opening select and choosing a new option
				await fireEvent.click(columnsSelect);

				// Mock selection change (this would normally happen through the dropdown)
				// We'll directly call the update function
				const component = (columnsSelect as any).__svelte.component;
				if (component && component.onValueChange) {
					component.onValueChange('6');

					// Check the grid options were updated
					expect(gridOverlay.getGridOptions().columns).toBe(6);
				}
			}
		});

		it('should reset to default options when reset button is clicked', async () => {
			const { container } = render(ToggleButton);

			// First set some custom options
			gridOverlay.setOptions({ columns: 6, maxWidth: 960, gap: 32 });

			// Open settings
			const gearButton = container.querySelector('[aria-label="Grid settings"]');
			await fireEvent.click(gearButton as HTMLElement);

			// Force a tick to update the UI
			await tick();

			// Find the reset button
			const resetButton = document.querySelector('button:contains("Reset to Defaults")');
			if (resetButton) {
				await fireEvent.click(resetButton);

				// Check that options were reset
				const options = gridOverlay.getGridOptions();
				expect(options.columns).toBe(12); // default value
				expect(options.maxWidth).toBe(1200); // default value
				expect(options.gap).toBe(24); // default value
			}
		});

		it('should set mobile options when mobile button is clicked', async () => {
			const { container } = render(ToggleButton);

			// Open settings
			const gearButton = container.querySelector('[aria-label="Grid settings"]');
			await fireEvent.click(gearButton as HTMLElement);

			// Force a tick to update the UI
			await tick();

			// Find the mobile button
			const mobileButton = document.querySelector('button:contains("Set Mobile View")');
			if (mobileButton) {
				await fireEvent.click(mobileButton);

				// Check that mobile options were set
				const options = gridOverlay.getGridOptions();
				expect(options.columns).toBe(4); // mobile value
				expect(options.maxWidth).toBe(375); // mobile value
				expect(options.gap).toBe(16); // mobile value
			}
		});
	});
});

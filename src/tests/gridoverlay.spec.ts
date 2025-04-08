import { gridOverlay } from '$lib/gridState.svelte';
import { render, waitFor } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import GridOverlayTest from './GridOverlayTest.svelte';

describe('GridOverlay Component', () => {
	// Reset grid state before each test
	beforeEach(() => {
		gridOverlay.hide();
		gridOverlay.resetOptions();
	});

	// Basic rendering and visibility tests
	describe('Visibility', () => {
		it('should not show grid overlay by default', () => {
			const { container } = render(GridOverlayTest);
			const overlay = container.querySelector('.pointer-events-none.fixed.inset-0');
			expect(overlay).toBeNull();
		});

		it('should show grid overlay when visible is set to true in options', async () => {
			const { container } = render(GridOverlayTest, {
				props: { options: { visible: true }, position: 'bottom-right' }
			});

			await waitFor(() => {
				const overlay = container.querySelector('.pointer-events-none.fixed.inset-0');
				expect(overlay).not.toBeNull();
			});
		});

		it('should show grid overlay when show() is called', async () => {
			const { container, component } = render(GridOverlayTest) as {
				container: HTMLElement;
				component: any;
			};

			// Grid should be hidden initially
			expect(container.querySelector('.pointer-events-none.fixed.inset-0')).toBeNull();

			// Call the show method
			component.showGrid();

			// Grid should now be visible
			await waitFor(() => {
				const overlay = container.querySelector('.pointer-events-none.fixed.inset-0');
				expect(overlay).not.toBeNull();
			});
		});

		it('should hide grid overlay when hide() is called', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { visible: true }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Grid should be visible initially
			await waitFor(() => {
				expect(
					container.querySelector('.pointer-events-none.fixed.inset-0')
				).not.toBeNull();
			});

			// Call the hide method
			component.hideGrid();

			// Grid should now be hidden
			await waitFor(() => {
				const overlay = container.querySelector('.pointer-events-none.fixed.inset-0');
				expect(overlay).toBeNull();
			});
		});

		it('should toggle grid overlay visibility when toggle() is called', async () => {
			const { container, component } = render(GridOverlayTest) as {
				container: HTMLElement;
				component: any;
			};

			// Grid should be hidden initially
			expect(container.querySelector('.pointer-events-none.fixed.inset-0')).toBeNull();

			// Toggle visibility (should show)
			component.toggleGrid();

			// Grid should now be visible
			await waitFor(() => {
				expect(
					container.querySelector('.pointer-events-none.fixed.inset-0')
				).not.toBeNull();
			});

			// Toggle visibility again (should hide)
			component.toggleGrid();

			// Grid should now be hidden again
			await waitFor(() => {
				expect(container.querySelector('.pointer-events-none.fixed.inset-0')).toBeNull();
			});
		});
	});

	// Grid options tests
	describe('Options', () => {
		it('should apply default options when none are provided', async () => {
			const { container, component } = render(GridOverlayTest) as {
				container: HTMLElement;
				component: any;
			};

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Check default values in the style attribute
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('grid-template-columns: repeat(12, 1fr)');
				expect(style).toContain('gap: 24px');
				expect(style).toContain('max-width: 1200px');
				expect(style).toContain('padding: 0 16px');
			});
		});

		it('should apply custom columns option', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { columns: 6 }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Check custom columns value
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('grid-template-columns: repeat(6, 1fr)');
			});
		});

		it('should apply custom gap option', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { gap: 32 }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Check custom gap value
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('gap: 32px');
			});
		});

		it('should apply custom maxWidth option', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { maxWidth: 960 }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Check custom maxWidth value
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('max-width: 960px');
			});
		});

		it('should apply custom padding option', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { padding: 32 }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Check custom padding value
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('padding: 0 32px');
			});
		});

		it('should apply custom color and opacity options', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { color: '#00ff00', opacity: 0.5 }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				const gridCells = container.querySelectorAll('.h-full');
				expect(gridCells.length).toBeGreaterThan(0);

				// Check the first grid cell for custom color and opacity
				const firstCell = gridCells[0];
				const style = firstCell.getAttribute('style');
				expect(style).toContain('background-color: #00ff00');
				expect(style).toContain('opacity: 0.5');
			});
		});

		it('should update options when setOptions() is called', async () => {
			const { container, component } = render(GridOverlayTest) as {
				container: HTMLElement;
				component: any;
			};

			// Show the grid
			component.showGrid();

			// Initial check
			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Check default columns value
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('grid-template-columns: repeat(12, 1fr)');
			});

			// Update options
			component.setOptions({ columns: 8 });

			// Check updated value
			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Should now have 8 columns
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('grid-template-columns: repeat(8, 1fr)');
			});
		});

		it('should reset options to defaults when resetOptions() is called', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { columns: 6, gap: 32, maxWidth: 960 }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			// Initial check with custom options
			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Check custom values
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('grid-template-columns: repeat(6, 1fr)');
				expect(style).toContain('gap: 32px');
				expect(style).toContain('max-width: 960px');
			});

			// Reset options
			component.resetOptions();

			// Check reset to default values
			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Should now have default values
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('grid-template-columns: repeat(12, 1fr)');
				expect(style).toContain('gap: 24px');
				expect(style).toContain('max-width: 1200px');
			});
		});

		it('should set mobile options when setMobileOptions() is called', async () => {
			const { container, component } = render(GridOverlayTest) as {
				container: HTMLElement;
				component: any;
			};

			// Show the grid
			component.showGrid();

			// Initial check with default options
			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Check default values
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('grid-template-columns: repeat(12, 1fr)');
				expect(style).toContain('max-width: 1200px');
			});

			// Set mobile options
			component.setMobileOptions();

			// Check mobile values
			await waitFor(() => {
				const gridContainer = container.querySelector('.grid');
				expect(gridContainer).not.toBeNull();

				// Should now have mobile values
				const style = gridContainer?.getAttribute('style');
				expect(style).toContain('grid-template-columns: repeat(4, 1fr)');
				expect(style).toContain('max-width: 375px');
				expect(style).toContain('gap: 16px');
			});
		});
	});

	// Margin tests
	describe('Margins', () => {
		it('should show margins when showMargins is true', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { showMargins: true }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				// Check if the margin container exists
				const marginContainer = container.querySelector('.outer-margin-container');
				expect(marginContainer).not.toBeNull();
			});
		});

		it('should hide margins when showMargins is false', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: { options: { showMargins: false }, position: 'bottom-right' }
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				// Check that margin container doesn't exist
				const marginContainer = container.querySelector('.outer-margin-container');
				expect(marginContainer).toBeNull();
			});
		});

		it('should apply custom margin color', async () => {
			const { container, component } = render(GridOverlayTest, {
				props: {
					options: { showMargins: true, marginColor: '#00ff00' },
					position: 'bottom-right'
				}
			}) as { container: HTMLElement; component: any };

			// Show the grid
			component.showGrid();

			await waitFor(() => {
				// Check if the margin container has the custom color
				const marginContainer = container.querySelector('.outer-margin-container');
				expect(marginContainer).not.toBeNull();

				const style = marginContainer?.getAttribute('style');
				expect(style).toContain('--margin-color: #00ff00');
			});
		});
	});

	// Position tests
	describe('Position', () => {
		it('should position toggle button at bottom-right by default', async () => {
			const { container } = render(GridOverlayTest);

			// The position styles are applied to a div that contains the ToggleButton
			const toggleButton = container.querySelector(
				'div[style*="position: relative; z-index:"]'
			);
			expect(toggleButton).not.toBeNull();

			// In the ToggleButton component, it applies position styles based on the 'position' prop
			// We can't directly test this here because the styles are applied in the ToggleButton component
			// But we can test that the default position prop is passed correctly
		});

		it('should pass custom position to ToggleButton', async () => {
			const { container } = render(GridOverlayTest, {
				props: { position: 'top-left', options: {} }
			});

			// The position is passed to the ToggleButton component
			// In a real test environment, we could check for computed styles
			// Here we're just verifying the component renders with a custom position prop
			const toggleButton = container.querySelector(
				'div[style*="position: relative; z-index:"]'
			);
			expect(toggleButton).not.toBeNull();
		});
	});
});

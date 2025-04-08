import { expect, test } from '@playwright/test';

// Run tests in parallel as they are independent
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('grid overlay is not visible by default', async ({ page }) => {
	// Check that the grid overlay is not visible by default
	await expect(page.locator('.pointer-events-none.fixed.inset-0')).toHaveCount(0);
});

test('grid overlay toggles visibility when toggle button is clicked', async ({ page }) => {
	// Click the toggle button in the Hero component
	await page.getByTestId('toggle-button').click();

	// Check that the grid overlay is now visible
	await expect(page.locator('.pointer-events-none.fixed.inset-0')).toHaveCount(1);

	// Click the toggle button again to hide the grid
	await page.getByTestId('toggle-button').click();

	// Check that the grid overlay is hidden again
	await expect(page.locator('.pointer-events-none.fixed.inset-0')).toHaveCount(0);
});

test('grid overlay shows correct number of columns', async ({ page }) => {
	// Show the grid overlay
	await page.getByTestId('toggle-button').click();

	// Wait for the grid to be visible
	await expect(page.locator('.pointer-events-none.fixed.inset-0')).toHaveCount(1);

	// Check that the grid has the default 12 columns
	// Using a more specific selector to only count direct children of the grid container
	const gridContainer = page.locator('.pointer-events-none.fixed.inset-0 .grid');
	const columnCount = await gridContainer.locator(':scope > .h-full').count();
	expect(columnCount).toBe(12);
});

test('grid overlay can be positioned at different locations', async ({ page }) => {
	// Test different position options
	const positions = [
		'top-left',
		'top-right',
		'bottom-left',
		'bottom-right',
		'top-center',
		'bottom-center'
	];

	for (const position of positions) {
		// Click the position button to change the position
		await page.getByText(position, { exact: true }).click();

		// Show the grid if it's not already visible
		if ((await page.locator('.pointer-events-none.fixed.inset-0').count()) === 0) {
			await page.getByTestId('toggle-button').click();
		}

		// Verify the grid is visible with the new position
		await expect(page.locator('.pointer-events-none.fixed.inset-0')).toHaveCount(1);
	}
});

test('grid overlay settings can be changed', async ({ page }) => {
	// Click the toggle button to show the grid
	await page.getByTestId('toggle-button').click();

	// Wait for the grid to be visible
	await expect(page.locator('.pointer-events-none.fixed.inset-0')).toHaveCount(1);

	// Find and click the settings button - using aria-label which is more reliable
	await page.getByRole('button', { name: 'Grid settings' }).click();

	// Check that settings panel is visible by looking for its header text
	await expect(page.getByText('Grid Settings')).toBeVisible();

	// Find the mobile view button by its text content - using precise selector
	const mobileButton = page.getByRole('button', { name: 'Set Mobile View (375px)' });
	await mobileButton.click();

	// Verify the grid has been updated to mobile settings (4 columns)
	// Using the same specific selector as the columns test
	const gridContainer = page.locator('.pointer-events-none.fixed.inset-0 .grid');
	const columnCount = await gridContainer.locator(':scope > .h-full').count();
	expect(columnCount).toBe(4);
});

test('margins are visible in the grid overlay', async ({ page }) => {
	// Show the grid overlay
	await page.getByTestId('toggle-button').click();

	// Check that margins are visible by default
	await expect(page.locator('.outer-margin-container')).toHaveCount(1);
});

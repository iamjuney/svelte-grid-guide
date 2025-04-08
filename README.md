https://github.com/user-attachments/assets/d0e41510-399f-4937-a94d-151481f66c3c

# svelte-grid-guide

A customizable grid overlay system for SvelteKit applications to help with layout design and alignment.

## Features

- Toggle grid visibility with a floating control panel
- Customize columns, gap, colors, opacity, and position
- Easy implementation in any Svelte project
- Mobile grid preset support

## Installation

```bash
bun add @iamjuney/svelte-grid-guide
```

### Requirements

This package requires Tailwind CSS v4. If you're experiencing style issues, make sure Tailwind CSS is properly set up in your project.

```bash
# Install Tailwind CSS v4 if not already installed
bunx sv add tailwindcss
```

## Basic Usage

```svelte
<script>
	import { GridOverlay } from '@iamjuney/svelte-grid-guide';
</script>

<GridOverlay />

<!-- Your app content here -->
```

## Styling

The package includes essential styles needed for the grid overlay and UI components to function properly. The library uses Tailwind CSS v4's inline theming for styling, which is included automatically.

If you're using custom themes or experiencing styling issues, you may need to include the following CSS variables in your project's global CSS:

```css
@theme inline {
	--animate-accordion-down: accordion-down 0.2s ease-out;
	--animate-accordion-up: accordion-up 0.2s ease-out;
	/* Additional animation variables if needed */
}
```

## Customization

```svelte
<script>
	import { GridOverlay } from '@iamjuney/svelte-grid-guide';

	const gridOptions = {
		columns: 12,
		maxWidth: 1200,
		gap: 24
		// More options available
	};
</script>

<GridOverlay options={gridOptions} position="bottom-left" />
```

## Positioning

Position the controls with: `top-left`, `top-right`, `bottom-left`, `bottom-right` (default), `top-center`, or `bottom-center`.

## Available Options

| Option        | Type    | Default   | Description              |
| ------------- | ------- | --------- | ------------------------ |
| `columns`     | number  | 12        | Number of columns        |
| `maxWidth`    | number  | 1200      | Maximum width (px)       |
| `gap`         | number  | 24        | Gap between columns (px) |
| `opacity`     | number  | 0.2       | Grid opacity             |
| `color`       | string  | '#ff0000' | Column color             |
| `showMargins` | boolean | true      | Show/hide margins        |
| `marginColor` | string  | '#0000ff' | Margin color             |
| `padding`     | number  | 16        | Horizontal padding (px)  |
| `zIndex`      | number  | 9999      | Z-index value            |
| `visible`     | boolean | false     | Initial visibility       |
| `class`       | string  | undefined | Custom CSS class         |

## Programmatic Control

```svelte
<script>
	import { GridOverlay, gridOverlay } from 'svelte-grid-guide';

	// Available methods:
	// gridOverlay.show()
	// gridOverlay.hide()
	// gridOverlay.toggle()
	// gridOverlay.setOptions({...})
	// gridOverlay.resetOptions()
	// gridOverlay.setMobileOptions()
</script>

<GridOverlay />
<button onclick={() => gridOverlay.toggle()}>Toggle Grid</button>
```

## License

MIT

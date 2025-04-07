<video width="100%" autoplay loop muted playsinline>
  <source src="static/recording.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

# svelte-grid-guide

A customizable grid overlay system for Svelte applications to help with layout design and alignment.

## Features

- Toggle grid visibility with a floating control panel
- Customize columns, gap, colors, opacity, and position
- Easy implementation in any Svelte project
- Mobile grid preset support

## Installation

```bash
npm install svelte-grid-guide
# or yarn/pnpm/bun add svelte-grid-guide
```

## Basic Usage

```svelte
<script>
	import { GridOverlay } from 'svelte-grid-guide';
</script>

<GridOverlay />

<!-- Your app content here -->
```

## Customization

```svelte
<script>
	import { GridOverlay } from 'svelte-grid-guide';

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

# svelte-grid-guide

A customizable grid overlay system for Svelte applications. This package provides a visual grid overlay that helps with layout design and alignment.

## Features

- Toggle grid visibility with a floating control panel
- Customize columns, gap, colors, and more
- Adjustable opacity and size settings
- Position the controls anywhere on the screen
- Easy to implement in any Svelte project
- Support for mobile grid preset

## Installation

```bash
npm install svelte-grid-guide
# or
yarn add svelte-grid-guide
# or
pnpm add svelte-grid-guide
# or
bun add svelte-grid-guide
```

## Usage

Add the `<GridOverlay />` component to your app's layout or root component:

```svelte
<script>
	import { GridOverlay } from 'svelte-grid-guide';
</script>

<GridOverlay />

<!-- Your app content here -->
```

The grid overlay is hidden by default but can be toggled using the floating control panel that appears in the bottom right corner of the screen.

### Customizing Grid Options

You can customize the grid by passing options:

```svelte
<script>
	import { GridOverlay } from 'svelte-grid-guide';

	const gridOptions = {
		columns: 12,
		maxWidth: 1200,
		gap: 24,
		opacity: 0.2,
		color: '#ff0000',
		showMargins: true,
		marginColor: '#0000ff',
		padding: 16,
		zIndex: 9999,
		visible: true // Grid is visible by default
	};
</script>

<GridOverlay options={gridOptions} position="bottom-left" />
```

### Positioning the Controls

You can change the position of the floating controls:

```svelte
<GridOverlay position="top-right" />
```

Available positions:

- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right` (default)
- `top-center`
- `bottom-center`

### Available Options

| Option        | Type    | Default   | Description                               |
| ------------- | ------- | --------- | ----------------------------------------- |
| `columns`     | number  | 12        | Number of columns in the grid             |
| `maxWidth`    | number  | 1200      | Maximum width of the grid (px)            |
| `gap`         | number  | 24        | Gap between columns (px)                  |
| `opacity`     | number  | 0.2       | Opacity of the grid overlay               |
| `color`       | string  | '#ff0000' | Color of the grid columns                 |
| `showMargins` | boolean | true      | Show or hide margins                      |
| `marginColor` | string  | '#0000ff' | Color of the margins                      |
| `padding`     | number  | 16        | Horizontal padding of the grid (px)       |
| `zIndex`      | number  | 9999      | Z-index of the grid overlay               |
| `visible`     | boolean | false     | Grid is visible by default                |
| `class`       | string  | undefined | Custom class to apply to the grid overlay |

### Programmatic Control

You can also control the grid overlay programmatically:

```svelte
<script>
	import { GridOverlay, gridOverlay } from 'svelte-grid-guide';

	function toggleGrid() {
		gridOverlay.toggle();
	}

	function updateGridOptions() {
		gridOverlay.setOptions({
			columns: 16,
			color: '#00ff00'
		});
	}

	function resetGrid() {
		gridOverlay.resetOptions();
	}

	function switchToMobileView() {
		gridOverlay.setMobileOptions();
	}
</script>

<GridOverlay />

<button on:click={toggleGrid}>Toggle Grid</button>
<button on:click={updateGridOptions}>Update Grid Options</button>
<button on:click={resetGrid}>Reset Grid</button>
<button on:click={switchToMobileView}>Mobile View</button>
```

## API

### GridOverlay Component

```ts
import { GridOverlay } from 'svelte-grid-guide';

// Component props
interface GridOverlayProps {
	options?: GridOverlayOptions;
	position?: Position; // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
}
```

### gridOverlay Store Methods

- `gridOverlay.show()`: Show the grid overlay
- `gridOverlay.hide()`: Hide the grid overlay
- `gridOverlay.toggle()`: Toggle grid visibility
- `gridOverlay.setOptions(options)`: Update grid options
- `gridOverlay.resetOptions()`: Reset grid options to defaults
- `gridOverlay.setMobileOptions()`: Set grid options to mobile defaults (4 columns, 375px width)

### Mobile View Support

The library includes a built-in mobile view preset that can be applied with `gridOverlay.setMobileOptions()`:

```javascript
// Mobile default options
{
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
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

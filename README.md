https://github.com/wobsoriano/svelte-sonner/assets/13049130/4b9c250f-1431-4130-9c5b-5a4f8b0210c5

# svelte-sonner

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

An opinionated toast component for Svelte.

Based on [emilkowalski](https://github.com/emilkowalski)'s React [implementation](https://sonner.emilkowal.ski/).

## Quick start

Install it:

```bash
npm i svelte-sonner
# or
yarn add svelte-sonner
# or
pnpm add svelte-sonner
```

Add `<Toaster />` to your app, it will be the place where all your toasts will be rendered. After that, you can use `toast()` from anywhere in your app.

```svelte
<script>
	import { Toaster, toast } from 'svelte-sonner';
</script>

<Toaster />
<button onclick={() => toast('My first toast')}>Give me a toast</button>
```

## Types

### Default

Most basic toast. You can customize it (and any other type) by passing an options object as the second argument.

```js
toast('Event has been created');
```

With custom icon and description:

```js
import Icon from './Icon.svelte';

toast('Event has been created', {
	description: 'Monday, January 3rd at 6:00pm',
	icon: Icon
});
```

### Success

Renders a checkmark icon in front of the message.

```js
toast.success('Event has been created');
```

### Info

Renders a question mark icon in front of the message.

```js
toast.info('Event has new information');
```

### Warning

Renders a warning icon in front of the message.

```js
toast.warning('Event has warning');
```

### Error

Renders an error icon in front of the message.

```js
toast.error('Event has not been created');
```

### Action

Renders a button.

```js
toast('Event has been created', {
	action: {
		label: 'Undo',
		onClick: () => console.log('Undo')
	}
});
```

### Promise

Starts in a loading state and will update automatically after the promise resolves or fails.

```js
toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
	loading: 'Loading',
	success: 'Success',
	error: 'Error'
});
```

You can pass a function to the success/error messages to incorporate the result/error of the promise.

```js
toast.promise(promise, {
	loading: 'Loading...',
	success: (data) => {
		return `${data.name} has been added!`;
	},
	error: 'Error'
});
```

### Custom Component

You can pass a component as the first argument instead of a string to render custom component while maintaining default styling. You can use the headless version below for a custom, unstyled toast.

```js
toast(CustomComponent);
```

### Updating a toast

You can update a toast by using the `toast` function and passing it the id of the toast you want to update, the rest stays the same.

```js
const toastId = toast('Sonner');

toast.success('Toast has been updated', {
	id: toastId
});
```

## Customization

### Headless

You can use `toast.custom` to render an unstyled toast with custom component while maintaining the functionality.

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div>
	This is a custom component <button onclick={() => dispatch('closeToast')}>close</button>
</div>
```

```js
import HeadlessToast from './HeadlessToast.svelte';

toast.custom(HeadlessToast);
```

### Theme

You can change the theme using the `theme` prop. Default theme is light.

```svelte
<Toaster theme="dark" />
```

### Position

You can change the position through the `position` prop on the `<Toaster />` component. Default is `bottom-right`.

```svelte
<!-- Available positions -->
<!-- top-left, top-center, top-right, bottom-left, bottom-center, bottom-right -->

<Toaster position="top-center" />
```

### Expanded

Toasts can also be expanded by default through the `expand` prop. You can also change the amount of visible toasts which is 3 by default.

```svelte
<Toaster expand visibleToasts={9} />
```

### Styling

Styling can be done globally via `toastOptions`, this way every toast will have the same styling.

```svelte
<Toaster
	toastOptions={{
		style: 'background: red;',
		class: 'my-toast',
		descriptionClass: 'my-toast-description'
	}}
/>
```

You can also use the same props when calling `toast` to style a specific toast.

```js
toast('Event has been created', {
	style: 'background: red;',
	class: 'my-toast',
	descriptionClass: 'my-toast-description'
});
```

### Tailwind CSS

The preferred way to style the toasts with tailwind is by using the `unstyled` prop. That will give you an unstyled toast which you can then style with tailwind.

```svelte
<Toaster
	toastOptions={{
		unstyled: true,
		classes: {
			toast: 'bg-blue-400',
			title: 'text-red-400',
			description: 'text-red-400',
			actionButton: 'bg-zinc-400',
			cancelButton: 'bg-orange-400',
			closeButton: 'bg-lime-400'
		}
	}}
/>
```

You can do the same when calling `toast()`.

```js
toast('Hello World', {
	unstyled: true,
	classes: {
		toast: 'bg-blue-400',
		title: 'text-red-400 text-2xl',
		description: 'text-red-400',
		actionButton: 'bg-zinc-400',
		cancelButton: 'bg-orange-400',
		closeButton: 'bg-lime-400'
	}
});
```

Styling per toast type is also possible.

```svelte
<Toaster
	toastOptions={{
		unstyled: true,
		classes: {
			error: 'bg-red-400',
			success: 'text-green-400',
			warning: 'text-yellow-400',
			info: 'bg-blue-400'
		}
	}}
/>
```

### Changing Icon

You can change the default icons using slots:

```svelte
<Toaster>
	<LoadingIcon slot="loading-icon" />
	<SuccessIcon slot="success-icon" />
	<ErrorIcon slot="error-icon" />
	<InfoIcon slot="info-icon" />
	<WarningIcon slot="warning-icon" />
</Toaster>
```

### Close button

Add a close button to all toasts that shows on hover by adding the `closeButton` prop.

```svelte
<Toaster closeButton />
```

### Rich colors

You can make error and success state more colorful by adding the `richColors` prop.

```svelte
<Toaster richColors />
```

### Custom offset

Offset from the edges of the screen.

```svelte
<Toaster offset="80px" />
```

### Programmatically remove toast

To remove a toast programmatically use `toast.dismiss(id)`.

```js
const toastId = toast('Event has been created');

toast.dismiss(toastId);
```

To remove a toast from inside a custom component, dispatch `closeToast`:

```js
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

dispatch('closeToast');
```

You can also dismiss all toasts at once by calling `toast.dismiss()` without an id.

```js
toast.dismiss();
```

### Duration

You can change the duration of each toast by using the `duration` property, or change the duration of all toasts like this:

```svelte
<Toaster duration={10000} />
```

```js
toast('Event has been created', {
	duration: 10000
});

// Persisent toast
toast('Event has been created', {
	duration: Number.POSITIVE_INFINITY
});
```

### On Close Callback

You can pass `onDismiss` and `onAutoClose` callbacks. `onDismiss` gets fired when either the close button gets clicked or the toast is swiped. `onAutoClose` fires when the toast disappears automatically after it's timeout (`duration` prop).

```js
toast('Event has been created', {
	onDismiss: (t) => console.log(`Toast with id ${t.id} has been dismissed`),
	onAutoClose: (t) => console.log(`Toast with id ${t.id} has been closed automatically`)
});
```

## Keyboard focus

You can focus on the toast area by pressing ⌥/alt + T. You can override it by providing an array of `event.code` values for each key.

```svelte
<Toaster hotkey={['KeyC']} />
```

# svelte-grid-guide

A customizable grid overlay system for Svelte applications. This package provides a visual grid overlay that helps with layout design and alignment.

## Features

- Toggle grid visibility with a floating control
- Customize columns, gap, colors, and more
- Adjustable opacity and size settings
- Position the controls anywhere on the screen
- Easy to implement in any SvelteKit project

## Installation

```bash
npm install svelte-grid-guide
# or
yarn add svelte-grid-guide
# or
pnpm add svelte-grid-guide
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
		maxWidth: '1200px',
		gap: '24px',
		opacity: 0.2,
		color: '#ff0000',
		showMargins: true,
		marginColor: '#0000ff',
		padding: '16px',
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

| Option        | Type    | Default   | Description                    |
| ------------- | ------- | --------- | ------------------------------ |
| `columns`     | number  | 12        | Number of columns in the grid  |
| `maxWidth`    | string  | '1200px'  | Maximum width of the grid      |
| `gap`         | string  | '24px'    | Gap between columns            |
| `opacity`     | number  | 0.2       | Opacity of the grid overlay    |
| `color`       | string  | '#ff0000' | Color of the grid columns      |
| `showMargins` | boolean | true      | Show or hide margins           |
| `marginColor` | string  | '#0000ff' | Color of the margins           |
| `padding`     | string  | '16px'    | Horizontal padding of the grid |
| `zIndex`      | number  | 9999      | Z-index of the grid overlay    |
| `visible`     | boolean | false     | Grid is visible by default     |

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
</script>

<GridOverlay />

<button onclick={toggleGrid}>Toggle Grid</button>
<button onclick={updateGridOptions}>Update Grid Options</button>
<button onclick={resetGrid}>Reset Grid</button>
```

## API

### GridOverlay Component

```svelte
<GridOverlay options={GridOverlayOptions} position={Position} />
```

### gridOverlay Methods

- `gridOverlay.show()`: Show the grid overlay
- `gridOverlay.hide()`: Hide the grid overlay
- `gridOverlay.toggle()`: Toggle grid visibility
- `gridOverlay.setOptions(options)`: Update grid options
- `gridOverlay.resetOptions()`: Reset grid options to defaults

## License

MIT

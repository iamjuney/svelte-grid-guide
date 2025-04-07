export type FixMe = unknown;

export type Position =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right'
	| 'top-center'
	| 'bottom-center';

export type GridOverlayOptions = {
	/**
	 * Set the total number of columns in the grid
	 * @default 12
	 */
	columns?: number;

	/**
	 * Maximum width of the grid
	 * @default 1200
	 */
	maxWidth?: number;

	/**
	 * Gap between columns
	 * @default 24
	 */
	gap?: number;

	/**
	 * Opacity of the grid overlay
	 * @default 0.2
	 */
	opacity?: number;

	/**
	 * Color of the grid columns
	 * @default '#ff0000'
	 */
	color?: string;

	/**
	 * Show grid margins
	 * @default true
	 */
	showMargins?: boolean;

	/**
	 * Margin color
	 * @default '#0000ff'
	 */
	marginColor?: string;

	/**
	 * Horizontal padding of the grid
	 * @default 16
	 */
	padding?: number;

	/**
	 * Z-index of the grid overlay
	 * @default 9990
	 */
	zIndex?: number;

	/**
	 * Custom class to apply to the grid overlay
	 */
	class?: string;

	/**
	 * Grid is visible by default
	 * @default false
	 */
	visible?: boolean;
};

export type GridOverlayProps = {
	/**
	 * Configuration options for the grid overlay
	 */
	options?: GridOverlayOptions;

	/**
	 * Position of the toggle control
	 * @default 'bottom-right'
	 */
	position?: Position;
};

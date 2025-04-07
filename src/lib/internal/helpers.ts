import { writable, type Updater } from 'svelte/store';

export function cn(...classes: (string | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

export const isBrowser = typeof document !== 'undefined';

/**
 * A custom store that only allows setting/updating the value from the
 * browser to avoid SSR data leaks. By defining this helper, we don't
 * have to worry about checking for `isBrowser` in every place we
 * mutate the various stores.
 *
 * This should only ever be initialized with an empty array or object,
 * as otherwise the initial value will persist across requests.
 */
export function clientWritable<T>(initialValue: T) {
	const store = writable(initialValue);

	function set(value: T) {
		if (isBrowser) {
			store.set(value);
		}
	}

	function update(updater: Updater<T>) {
		if (isBrowser) {
			store.update(updater);
		}
	}

	return {
		subscribe: store.subscribe,
		set,
		update
	};
}

/**
 * Convert a value from one unit to another
 * @param value The value to convert
 * @param fromUnit The unit to convert from
 * @param toUnit The unit to convert to
 * @returns The converted value
 */
export function convertUnitValue(
	value: number | string | undefined,
	fromUnit: 'px' | 'rem',
	toUnit: 'px' | 'rem'
): number | undefined {
	// If the value is undefined or the units are the same, return the value
	if (value === undefined || fromUnit === toUnit) {
		return typeof value === 'number' ? value : undefined;
	}

	// Extract numeric value if it's a string with units
	let numericValue: number;
	if (typeof value === 'string') {
		numericValue = parseFloat(value);
		if (isNaN(numericValue)) return undefined;
	} else {
		numericValue = value;
	}

	// Base conversion: 1rem = 16px (standard browser default)
	const pxPerRem = 16;

	// Perform the conversion
	if (fromUnit === 'px' && toUnit === 'rem') {
		return Number((numericValue / pxPerRem).toFixed(2));
	} else if (fromUnit === 'rem' && toUnit === 'px') {
		return Math.round(numericValue * pxPerRem);
	}

	return numericValue;
}

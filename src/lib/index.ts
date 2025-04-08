// Import the bundled styles for components
import './bundled.css';
// Import the original styles for theme variables
import './styles.css';

import GridOverlay from './GridOverlay.svelte';
import { gridOverlay } from './gridState.svelte';

export { GridOverlay, gridOverlay };

export type { GridOverlayOptions, GridOverlayProps, Position } from './types';

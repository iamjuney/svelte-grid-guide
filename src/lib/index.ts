import '../app.css'; // Import the main app.css which contains all theme definitions
import '../tailwindcss-animate.css'; // Import TailwindCSS v4 animation utilities
import GridOverlay from './GridOverlay.svelte';
import { gridOverlay } from './gridState.svelte';
import './styles.css';

export { GridOverlay, gridOverlay };

export type { GridOverlayOptions, GridOverlayProps, Position } from './types';

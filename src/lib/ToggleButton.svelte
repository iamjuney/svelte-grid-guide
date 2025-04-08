<script lang="ts">
	import { DropdownMenu, Select, Slider } from 'bits-ui';
	import {
		ArrowCounterClockwise,
		CaretDoubleDown,
		CaretDoubleUp,
		CaretUpDown,
		Check,
		DeviceMobile,
		Gear,
		GridFour,
		Info
	} from 'phosphor-svelte';
	import { gridOverlay } from './gridState.svelte';
	import type { GridOverlayOptions, Position } from './types';

	// Component props
	interface Props {
		position?: Position;
	}

	let { position = 'bottom-right' }: Props = $props();

	// Local state - Fix for reactive binding
	let isVisible = $state(false);

	// Update isVisible whenever the component is rendered
	$effect(() => {
		isVisible = gridOverlay.getGridVisible();
	});

	let showSettings = $state(false);
	let currentOptions: Partial<GridOverlayOptions> = $derived(
		gridOverlay.getGridOptions()
	);
	let activeTab = $state('general'); // 'general' or 'advanced'

	// Options for selects
	const columnOptions = [
		{ value: '1', label: '1 col' },
		{ value: '2', label: '2 cols' },
		{ value: '3', label: '3 cols' },
		{ value: '4', label: '4 cols' },
		{ value: '6', label: '6 cols' },
		{ value: '8', label: '8 cols' },
		{ value: '12', label: '12 cols' },
		{ value: '16', label: '16 cols' },
		{ value: '24', label: '24 cols' }
	];

	const maxWidthOptions = [
		{ value: '375', label: '375px' },
		{ value: '640', label: '640px' },
		{ value: '768', label: '768px' },
		{ value: '1024', label: '1024px' },
		{ value: '1200', label: '1200px' },
		{ value: '1280', label: '1280px' },
		{ value: '1536', label: '1536px' }
	];

	const gapOptions = [
		{ value: '8', label: '8px' },
		{ value: '16', label: '16px' },
		{ value: '24', label: '24px' },
		{ value: '32', label: '32px' },
		{ value: '48', label: '48px' }
	];

	const paddingOptions = [
		{ value: '0', label: '0px' },
		{ value: '8', label: '8px' },
		{ value: '16', label: '16px' },
		{ value: '24', label: '24px' },
		{ value: '32', label: '32px' }
	];

	// Handle toggle switch change
	function toggleGrid(value: boolean) {
		// Use the gridOverlay methods instead of direct assignment
		if (value) {
			gridOverlay.show();
		} else {
			gridOverlay.hide();
		}
	}

	function getPositionStyles(pos: Position) {
		// Define styles with a Record type to allow dynamic property assignment
		const styles: Record<string, string> = {
			position: 'fixed',
			zIndex: '9999' // Higher z-index to ensure it stays on top
		};

		if (pos.includes('top')) {
			styles['top'] = '16px';
		} else {
			styles['bottom'] = '16px';
		}

		if (pos.includes('left')) {
			styles['left'] = '16px';
		} else if (pos.includes('right')) {
			styles['right'] = '16px';
		} else if (pos.includes('center')) {
			styles['left'] = '50%';
			styles['transform'] = 'translateX(-50%)';
		}

		return Object.entries(styles)
			.map(([key, value]) => `${key}: ${value}`)
			.join(';');
	}

	// Update individual settings
	function updateOption(key: string, value: any) {
		gridOverlay.setOptions({ [key]: value });
	}

	// Use $derived for computed values
	const positionStyles = $derived(getPositionStyles(position));

	// Prevent form inputs from closing the dropdown
	function handleInputClick(event: MouseEvent) {
		event.stopPropagation();
	}

	// Handle opacity slider change
	function handleOpacityChange(value: number) {
		updateOption('opacity', value / 100);
	}

	// Show tooltip
	function showTooltip(event: MouseEvent, message: string) {
		const tooltip = document.createElement('div');
		tooltip.textContent = message;
		tooltip.className =
			'absolute bg-gray-800 text-white text-xs px-2 py-1 rounded z-50 max-w-[200px]';
		tooltip.style.top = `${event.clientY - 10}px`;
		tooltip.style.left = `${event.clientX + 10}px`;

		document.body.appendChild(tooltip);

		setTimeout(() => {
			document.body.removeChild(tooltip);
		}, 2000);

		event.stopPropagation();
	}

	function handleToggleClick() {
		toggleGrid(!isVisible);
	}

	// Function to handle the reset button click
	function handleResetOptions() {
		gridOverlay.resetOptions();
	}

	// Function to handle the mobile view button click
	function handleSetMobileOptions() {
		gridOverlay.setMobileOptions();
		// Show the grid if it's not already visible
		if (!isVisible) {
			toggleGrid(true);
		}
	}
</script>

<div class="font-sans" style={positionStyles}>
	<div class="flex overflow-hidden rounded-full bg-gray-800 shadow-md">
		<button
			class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 {isVisible
				? 'bg-blue-600 hover:bg-blue-700'
				: ''}"
			onclick={handleToggleClick}
			aria-label="Toggle grid overlay"
		>
			<span class="flex items-center justify-center">
				<GridFour size={18} weight="bold" class="text-white" />
			</span>
			<span>Grid</span>
		</button>

		<DropdownMenu.Root bind:open={showSettings}>
			<DropdownMenu.Trigger
				class="flex items-center justify-center bg-transparent px-3 py-2 text-white transition-colors duration-200 hover:bg-gray-700"
				aria-label="Grid settings"
			>
				<Gear size={16} weight="bold" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					class="z-[10000] w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-800 shadow-lg"
					sideOffset={8}
					collisionPadding={16}
				>
					<div class="border-b border-gray-200 bg-gray-50 p-3">
						<h3 class="m-0 text-base font-semibold">
							Grid Settings
						</h3>
					</div>

					<div class="flex border-b border-gray-200">
						<button
							class="flex-1 border-b-2 px-3 py-2 text-sm transition-all duration-200 {activeTab ===
							'general'
								? 'border-blue-600 font-medium text-blue-600'
								: 'border-transparent text-gray-500'}"
							onclick={() => (activeTab = 'general')}
						>
							General
						</button>
						<button
							class="flex-1 border-b-2 px-3 py-2 text-sm transition-all duration-200 {activeTab ===
							'advanced'
								? 'border-blue-600 font-medium text-blue-600'
								: 'border-transparent text-gray-500'}"
							onclick={() => (activeTab = 'advanced')}
						>
							Advanced
						</button>
					</div>

					<div class="p-4">
						{#if activeTab === 'general'}
							<!-- Columns -->
							<div class="mb-3 flex items-center justify-between">
								<div
									class="flex items-center gap-1 text-sm font-medium text-gray-700"
								>
									<span>Columns</span>
									<button
										class="flex items-center justify-center p-0.5 text-gray-400 hover:text-gray-600"
										onclick={(e) =>
											showTooltip(
												e,
												'Number of columns in the grid'
											)}
									>
										<Info size={14} weight="bold" />
									</button>
								</div>
								<div class="w-[120px]">
									<Select.Root
										type="single"
										items={columnOptions}
										value={currentOptions.columns?.toString()}
										onValueChange={(v) =>
											updateOption(
												'columns',
												parseInt(v)
											)}
									>
										<Select.Trigger
											class="h-input inline-flex w-full items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm select-none"
											aria-label="Select columns"
										>
											<span class="flex-1 text-left">
												{columnOptions.find(
													(opt) =>
														opt.value ===
														currentOptions.columns?.toString()
												)?.label ||
													`${currentOptions.columns} Columns`}
											</span>
											<CaretUpDown
												class="ml-auto size-4 text-gray-500"
											/>
										</Select.Trigger>
										<Select.Portal>
											<Select.Content
												class="z-[10000] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
												sideOffset={4}
											>
												<Select.ScrollUpButton
													class="flex w-full items-center justify-center bg-white py-1"
												>
													<CaretDoubleUp
														class="size-3"
													/>
												</Select.ScrollUpButton>
												<Select.Viewport
													class="max-h-60 p-1"
												>
													{#each columnOptions as option}
														<Select.Item
															class="flex h-8 w-full items-center rounded-sm px-2 py-2 text-sm select-none data-highlighted:bg-gray-100"
															value={option.value}
															label={option.label}
														>
															{#snippet children({
																selected
															})}
																{option.label}
																{#if selected}
																	<div
																		class="ml-auto"
																	>
																		<Check
																			size={14}
																		/>
																	</div>
																{/if}
															{/snippet}
														</Select.Item>
													{/each}
												</Select.Viewport>
												<Select.ScrollDownButton
													class="flex w-full items-center justify-center bg-white py-1"
												>
													<CaretDoubleDown
														class="size-3"
													/>
												</Select.ScrollDownButton>
											</Select.Content>
										</Select.Portal>
									</Select.Root>
								</div>
							</div>

							<!-- Color -->
							<div class="mb-3 flex items-center justify-between">
								<div class="text-sm font-medium text-gray-700">
									<span>Color</span>
								</div>
								<div class="flex w-[120px] items-center gap-2">
									<input
										type="color"
										bind:value={currentOptions.color}
										onclick={handleInputClick}
										oninput={(e) => {
											const target = e.currentTarget;
											updateOption('color', target.value);
										}}
										class="h-6 w-6 cursor-pointer rounded border-0"
									/>
									<span class="text-xs text-gray-500"
										>{currentOptions.color}</span
									>
								</div>
							</div>

							<!-- Opacity - Updated to use bits-ui Slider component -->
							<div class="mb-3 flex items-center justify-between">
								<div class="text-sm font-medium text-gray-700">
									<span>Opacity</span>
								</div>
								<div class="flex w-[120px] items-center">
									<Slider.Root
										type="single"
										value={Math.round(
											(currentOptions.opacity ?? 0.2) *
												100
										)}
										onValueChange={handleOpacityChange}
										class="relative flex w-full touch-none items-center select-none"
										min={0}
										max={100}
										step={10}
									>
										{#snippet children()}
											<span
												class="bg-dark-10 relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full"
											>
												<Slider.Range
													class="absolute h-full bg-blue-600"
												/>
											</span>
											<Slider.Thumb
												index={0}
												class="border-border-input bg-background hover:border-dark-40 focus-visible:ring-foreground dark:bg-foreground dark:shadow-card block size-[18px] cursor-pointer rounded-full border shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
											/>
										{/snippet}
									</Slider.Root>
									<span class="ml-2 text-xs text-gray-500"
										>{Math.round(
											(currentOptions.opacity ?? 0.2) *
												100
										)}%</span
									>
								</div>
							</div>

							<!-- Max Width -->
							<div class="mb-3 flex items-center justify-between">
								<div class="text-sm font-medium text-gray-700">
									<span>Max Width</span>
								</div>
								<div class="w-[120px]">
									<Select.Root
										type="single"
										items={maxWidthOptions}
										value={currentOptions.maxWidth?.toString()}
										onValueChange={(v) =>
											updateOption(
												'maxWidth',
												parseInt(v)
											)}
									>
										<Select.Trigger
											class="h-input inline-flex w-full items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm select-none"
											aria-label="Select max width"
										>
											<span class="flex-1 text-left">
												{maxWidthOptions.find(
													(opt) =>
														opt.value ===
														currentOptions.maxWidth?.toString()
												)?.label ||
													`${currentOptions.maxWidth}px`}
											</span>
											<CaretUpDown
												class="ml-auto size-4 text-gray-500"
											/>
										</Select.Trigger>
										<Select.Portal>
											<Select.Content
												class="z-[10000] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
												sideOffset={4}
											>
												<Select.ScrollUpButton
													class="flex w-full items-center justify-center bg-white py-1"
												>
													<CaretDoubleUp
														class="size-3"
													/>
												</Select.ScrollUpButton>
												<Select.Viewport
													class="max-h-60 p-1"
												>
													{#each maxWidthOptions as option}
														<Select.Item
															class="flex h-8 w-full items-center rounded-sm px-2 py-2 text-sm select-none data-highlighted:bg-gray-100"
															value={option.value}
															label={option.label}
														>
															{#snippet children({
																selected
															})}
																{option.label}
																{#if selected}
																	<div
																		class="ml-auto"
																	>
																		<Check
																			size={14}
																		/>
																	</div>
																{/if}
															{/snippet}
														</Select.Item>
													{/each}
												</Select.Viewport>
												<Select.ScrollDownButton
													class="flex w-full items-center justify-center bg-white py-1"
												>
													<CaretDoubleDown
														class="size-3"
													/>
												</Select.ScrollDownButton>
											</Select.Content>
										</Select.Portal>
									</Select.Root>
								</div>
							</div>
						{:else}
							<!-- Gap -->
							<div class="mb-3 flex items-center justify-between">
								<div class="text-sm font-medium text-gray-700">
									<span>Gap</span>
								</div>
								<div class="w-[120px]">
									<Select.Root
										type="single"
										items={gapOptions}
										value={currentOptions.gap?.toString()}
										onValueChange={(v) =>
											updateOption('gap', parseInt(v))}
									>
										<Select.Trigger
											class="h-input inline-flex w-full items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm select-none"
											aria-label="Select gap size"
										>
											<span class="flex-1 text-left">
												{gapOptions.find(
													(opt) =>
														opt.value ===
														currentOptions.gap?.toString()
												)?.label ||
													`${currentOptions.gap}px`}
											</span>
											<CaretUpDown
												class="ml-auto size-4 text-gray-500"
											/>
										</Select.Trigger>
										<Select.Portal>
											<Select.Content
												class="z-[10000] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
												sideOffset={4}
											>
												<Select.ScrollUpButton
													class="flex w-full items-center justify-center bg-white py-1"
												>
													<CaretDoubleUp
														class="size-3"
													/>
												</Select.ScrollUpButton>
												<Select.Viewport
													class="max-h-60 p-1"
												>
													{#each gapOptions as option}
														<Select.Item
															class="flex h-8 w-full items-center rounded-sm px-2 py-2 text-sm select-none data-highlighted:bg-gray-100"
															value={option.value}
															label={option.label}
														>
															{#snippet children({
																selected
															})}
																{option.label}
																{#if selected}
																	<div
																		class="ml-auto"
																	>
																		<Check
																			size={14}
																		/>
																	</div>
																{/if}
															{/snippet}
														</Select.Item>
													{/each}
												</Select.Viewport>
												<Select.ScrollDownButton
													class="flex w-full items-center justify-center bg-white py-1"
												>
													<CaretDoubleDown
														class="size-3"
													/>
												</Select.ScrollDownButton>
											</Select.Content>
										</Select.Portal>
									</Select.Root>
								</div>
							</div>

							<!-- Show Margins -->
							<div class="mb-3 flex items-center justify-between">
								<div class="text-sm font-medium text-gray-700">
									<span>Show Margins</span>
								</div>
								<div>
									<label
										class="relative inline-block h-5 w-5"
									>
										<input
											type="checkbox"
											class="peer h-0 w-0 opacity-0"
											bind:checked={
												currentOptions.showMargins
											}
											onchange={(e) => {
												const target = e.currentTarget;
												updateOption(
													'showMargins',
													target.checked
												);
											}}
										/>
										<span
											class="absolute top-0 left-0 h-5 w-5 rounded border border-gray-300 bg-white peer-checked:border-blue-600 peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[6px] after:hidden after:h-[9px] after:w-[4px] after:rotate-45 after:border-[0_2px_2px_0] after:border-white after:content-[''] peer-checked:after:block"
										></span>
									</label>
								</div>
							</div>

							<!-- Margin Color -->
							<div
								class="mb-3 flex items-center justify-between {!currentOptions.showMargins
									? 'pointer-events-none opacity-50'
									: ''}"
							>
								<div class="text-sm font-medium text-gray-700">
									<span>Margin Color</span>
								</div>
								<div class="flex w-[120px] items-center gap-2">
									<input
										type="color"
										bind:value={currentOptions.marginColor}
										onclick={handleInputClick}
										oninput={(e) => {
											const target = e.currentTarget;
											updateOption(
												'marginColor',
												target.value
											);
										}}
										disabled={!currentOptions.showMargins}
										class="h-6 w-6 cursor-pointer rounded border-0"
									/>
									<span class="text-xs text-gray-500"
										>{currentOptions.marginColor}</span
									>
								</div>
							</div>

							<!-- Padding -->
							<div class="mb-3 flex items-center justify-between">
								<div class="text-sm font-medium text-gray-700">
									<span>Padding</span>
								</div>
								<div class="w-[120px]">
									<Select.Root
										type="single"
										items={paddingOptions}
										value={currentOptions.padding?.toString()}
										onValueChange={(v) =>
											updateOption(
												'padding',
												parseInt(v)
											)}
									>
										<Select.Trigger
											class="h-input inline-flex w-full items-center rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm select-none"
											aria-label="Select padding"
										>
											<span class="flex-1 text-left">
												{paddingOptions.find(
													(opt) =>
														opt.value ===
														currentOptions.padding?.toString()
												)?.label ||
													`${currentOptions.padding}px`}
											</span>
											<CaretUpDown
												class="ml-auto size-4 text-gray-500"
											/>
										</Select.Trigger>
										<Select.Portal>
											<Select.Content
												class="z-[10000] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
												sideOffset={4}
											>
												<Select.ScrollUpButton
													class="flex w-full items-center justify-center bg-white py-1"
												>
													<CaretDoubleUp
														class="size-3"
													/>
												</Select.ScrollUpButton>
												<Select.Viewport
													class="max-h-60 p-1"
												>
													{#each paddingOptions as option}
														<Select.Item
															class="flex h-8 w-full items-center rounded-sm px-2 py-2 text-sm select-none data-highlighted:bg-gray-100"
															value={option.value}
															label={option.label}
														>
															{#snippet children({
																selected
															})}
																{option.label}
																{#if selected}
																	<div
																		class="ml-auto"
																	>
																		<Check
																			size={14}
																		/>
																	</div>
																{/if}
															{/snippet}
														</Select.Item>
													{/each}
												</Select.Viewport>
												<Select.ScrollDownButton
													class="flex w-full items-center justify-center bg-white py-1"
												>
													<CaretDoubleDown
														class="size-3"
													/>
												</Select.ScrollDownButton>
											</Select.Content>
										</Select.Portal>
									</Select.Root>
								</div>
							</div>
						{/if}

						<!-- Mobile View Button -->
						<button
							class="mt-4 flex w-full items-center justify-center gap-1.5 rounded bg-blue-600 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
							onclick={handleSetMobileOptions}
						>
							<DeviceMobile size={14} weight="bold" />
							<span>Set Mobile View (375px)</span>
						</button>

						<!-- Reset Button -->
						<button
							class="mt-2 flex w-full items-center justify-center gap-1.5 rounded bg-red-600 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700"
							onclick={handleResetOptions}
						>
							<ArrowCounterClockwise size={14} weight="bold" />
							<span>Reset to Defaults</span>
						</button>
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	</div>
</div>

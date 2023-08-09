<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css'
	// Most of your app wide CSS should be put in this file
	import '../app.scss'

	import { onMount } from 'svelte'

	import { objectEntries } from '$lib/utils/common'

	const size = 1920
	const dragDiffMax = 12
	const sliders = {
		image: { value: 0, max: 28 },
		zoom: { value: 0, max: 100 },
	}

	let dragStartX: number | null = null

	function getImageSrc(image: number) {
		return `./images/MaisonArchi/${image}-${size}.jpg`
	}

	function updateValue(name: keyof typeof sliders, incr: boolean) {
		const { value, max } = sliders[name]
		sliders[name].value = (value + (incr ? 1 : max)) % (max + 1)
	}

	function getDragX(event: MouseEvent | TouchEvent) {
		return (
			(event as TouchEvent).touches ? (event as TouchEvent).touches[0] : (event as MouseEvent)
		).clientX
	}

	function dragStart(event: MouseEvent | TouchEvent) {
		dragStartX = getDragX(event)
	}

	function drag(event: MouseEvent | TouchEvent) {
		if (dragStartX === null) return
		const dragX = getDragX(event)
		const dragDiff = dragX - dragStartX
		if (Math.abs(dragDiff) <= dragDiffMax) return
		updateValue('image', dragDiff > 0)
		dragStartX = dragX
	}

	function dragEnd() {
		dragStartX = null
	}

	$: src = getImageSrc(sliders.image.value)
	$: style = `transform: scale(${sliders.zoom.value / 100 + 1})`

	onMount(() => {
		for (let i = 1; i <= sliders.image.max; i++) new Image().src = getImageSrc(i)
	})
</script>

<div class="container mx-auto my-6">
	<div class="flex flex-col items-center gap-6">
		<h1 class="text-secondary-700">Svelte Model Viewer</h1>

		<div
			on:mousedown={dragStart}
			on:touchstart={dragStart}
			on:mousemove={drag}
			on:touchmove={drag}
			on:mouseup={dragEnd}
			on:touchend={dragEnd}
			class="cursor-ew-resize select-none overflow-hidden"
		>
			<img {src} alt="" class="pointer-events-none" {style} />
		</div>

		<ul class="card variant-soft-secondary flex w-80 flex-col gap-6 p-6">
			{#each objectEntries(sliders) as [name, { value, max }]}
				<li>
					<div class="flex items-center justify-between">
						<div class="font-bold capitalize">{name}</div>
						<div class="text-xs">{value} / {max}</div>
					</div>

					<div class="mt-1 flex select-none items-center gap-2.5">
						<button
							class="btn btn-sm variant-filled-secondary font-bold text-white"
							on:click={() => updateValue(name, false)}
						>
							&lt;
						</button>
						<input type="range" bind:value={sliders[name].value} {max} class="mt-1" />
						<button
							class="btn btn-sm variant-filled-secondary font-bold text-white"
							on:click={() => updateValue(name, true)}
						>
							&gt;
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

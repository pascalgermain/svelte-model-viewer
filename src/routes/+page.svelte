<script lang="ts">
	import { onMount } from 'svelte'
	import { RangeSlider } from '@skeletonlabs/skeleton'

	const size = 1920
	const imageMax = 28
	const zoomMax = 100
	const dragDiffMax = 12

	let image = 0
	let zoom = 0
	let dragStartX: number | null = null

	$: src = getImageSrc(image)
	$: style = `transform: scale(${zoom / 100 + 1})`

	onMount(() => {
		for (let i = 1; i <= imageMax; i++) new Image().src = getImageSrc(i)
	})

	function getImageSrc(image: number) {
		return `./images/MaisonArchi/${image}-${size}.jpg`
	}

	function newValue(value: number, max: number, incr: boolean) {
		return (value + (incr ? 1 : max)) % (max + 1)
	}

	function updateImage(incr: boolean) {
		image = newValue(image, imageMax, incr)
	}

	function updateZoom(incr: boolean) {
		zoom = newValue(zoom, zoomMax, incr)
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
		updateImage(dragDiff > 0)
		dragStartX = dragX
	}

	function dragEnd() {
		dragStartX = null
	}
</script>

<div class="flex flex-col items-center">
	<div
		on:mousedown={dragStart}
		on:touchstart={dragStart}
		on:mousemove={drag}
		on:touchmove={drag}
		on:mouseup={dragEnd}
		on:touchend={dragEnd}
		class="overflow-hidden select-none cursor-move"
	>
		<img {src} alt="" class="pointer-events-none" {style} />
	</div>

	<ul class="flex flex-col gap-6 my-6 card p-6 variant-soft-secondary">
		<li>
			<div class="flex justify-between items-center">
				<div class="font-bold">Image</div>
				<div class="text-xs">{image} / {imageMax}</div>
			</div>

			<div class="flex gap-2 items-center mt-1 select-none">
				<button
					class="btn btn-sm variant-filled-secondary font-bold text-white"
					on:click={() => updateImage(false)}
				>
					&lt;
				</button>
				<RangeSlider name="image" bind:value={image} max={imageMax} class="mt-1" />
				<button
					class="btn btn-sm variant-filled-secondary font-bold text-white"
					on:click={() => updateImage(true)}
				>
					&gt;
				</button>
			</div>
		</li>

		<li>
			<div class="flex justify-between items-center">
				<div class="font-bold">Zoom</div>
				<div class="text-xs">{zoom} / {zoomMax}</div>
			</div>

			<div class="flex gap-2 items-center mt-1 select-none">
				<button
					class="btn btn-sm variant-filled-secondary font-bold text-white"
					on:click={() => updateZoom(false)}
				>
					&lt;
				</button>
				<RangeSlider name="zoom" bind:value={zoom} max={zoomMax} class="mt-1" />
				<button
					class="btn btn-sm variant-filled-secondary font-bold text-white"
					on:click={() => updateZoom(true)}
				>
					&gt;
				</button>
			</div>
		</li>
	</ul>
</div>

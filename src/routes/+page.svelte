<script lang="ts">
	import { onMount } from 'svelte'

	const size = 1920
	const imageMax = 28
	const zoomMax = 100
	const dragDiffMax = 12

	let image = 0
	let zoom = 0
	let dragStartX: number | null = null

	$: src = getImageSrc(image)
	$: style = `transform: scale(${zoom / 50 + 1})`

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

<div class="flex flex-col">
	<div
		on:mousedown={dragStart}
		on:touchstart={dragStart}
		on:mousemove={drag}
		on:touchmove={drag}
		on:mouseup={dragEnd}
		on:touchend={dragEnd}
		class="select-none cursor-move"
	>
		<img {src} {style} alt="" class="pointer-events-none" />
	</div>

	<div class="relative inline-flex flex-col gap-6 my-6 mx-auto">
		<div>
			<div>Image : {image}</div>
			<div class="inline-flex gap-1 select-none">
				<button on:click={() => updateImage(false)}>-</button>
				<input type="range" bind:value={image} max={imageMax} />
				<button on:click={() => updateImage(true)}>+</button>
			</div>
		</div>

		<div>
			<div>Zoom : {zoom}</div>
			<div class="inline-flex gap-1 select-none">
				<button on:click={() => updateZoom(false)}>-</button>
				<input type="range" bind:value={zoom} max={zoomMax} />
				<button on:click={() => updateZoom(true)}>+</button>
			</div>
		</div>
	</div>
</div>

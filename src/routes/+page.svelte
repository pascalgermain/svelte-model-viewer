<script lang="ts">
	import { onMount } from 'svelte'
	import { RangeSlider } from '@skeletonlabs/skeleton'

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
		{#each objectEntries(sliders) as [name, { value, max }]}
			<li>
				<div class="flex justify-between items-center">
					<div class="font-bold capitalize">{name}</div>
					<div class="text-xs">{value} / {max}</div>
				</div>

				<div class="flex gap-2 items-center mt-1 select-none">
					<button
						class="btn btn-sm variant-filled-secondary font-bold text-white"
						on:click={() => updateValue(name, false)}
					>
						&lt;
					</button>
					<RangeSlider {name} bind:value={sliders[name].value} {max} class="mt-1" />
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

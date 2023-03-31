<script lang="ts">
	const size = 1920
	const imageMax = 28
	const zoomMax = 100

	let image = 0
	let zoom = 0

	$: src = `/images/MaisonArchi/${image}-${size}.jpg`
	$: style = `transform: scale(${zoom / 50 + 1})`

	function newValue(value: number, max: number, incr: boolean) {
		return (value + (incr ? 1 : max)) % (max + 1)
	}

	function updateImage(incr: boolean) {
		image = newValue(image, imageMax, incr)
	}

	function updateZoom(incr: boolean) {
		zoom = newValue(zoom, zoomMax, incr)
	}
</script>

<img {src} {style} alt="" />

<br />
<div>
	Image : {image}
	<div>
		<button on:click={() => updateImage(false)}>-</button>
		<input type="range" bind:value={image} max={imageMax} />
		<button on:click={() => updateImage(true)}>+</button>
	</div>
</div>

<br />
<div>
	Zoom : {zoom}
	<div>
		<button on:click={() => updateZoom(false)}>-</button>
		<input type="range" bind:value={zoom} max={zoomMax} />
		<button on:click={() => updateZoom(true)}>+</button>
	</div>
</div>

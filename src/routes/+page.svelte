<script lang="ts">
	import { onMount } from 'svelte'
	import * as SC from 'svelte-cubed'
	import * as Three from 'three'
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

	const modelLoader = new GLTFLoader()
	const modelURL = '/models/MaisonArchi/MaisonArchi.gltf'
	let model: GLTF | null = null

	onMount(async () => {
		model = await modelLoader.loadAsync(modelURL)
	})
</script>

<SC.Canvas background={new Three.Color(0x7bb585)} antialias>
	<!-- <SC.PerspectiveCamera position={[-10, 36, 20]} near={0.1} far={500} fov={40} /> -->
	<SC.PerspectiveCamera near={0.1} far={500} fov={40} />

	<SC.OrbitControls
		enabled={true}
		enableZoom={true}
		autoRotate={false}
		autoRotateSpeed={2}
		enableDamping={true}
		dampingFactor={0.1}
		target={[-6, 17, 0]}
	/>

	<SC.DirectionalLight
		color={new Three.Color(0xffffff)}
		position={[0, 10, 10]}
		intensity={0.75}
		shadow={false}
	/>

	<SC.AmbientLight color={new Three.Color(0xffffff)} intensity={0.75} />

	{#if model}
		<!-- <SC.Primitive object={model.scene} scale={[0.05, 0.05, 0.05]} /> -->
		<SC.Primitive object={model.scene} scale={[1, 1, 1]} />
	{/if}
</SC.Canvas>

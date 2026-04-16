<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface Props {
	src: string
	cols?: number
	rows?: number
	autoPlay?: boolean
	preload?: boolean
	loop?: boolean
	theme?: string
	speed?: number
}

const props = withDefaults(defineProps<Props>(), {
	cols: 80,
	rows: 24,
	autoPlay: false,
	preload: false,
	loop: false,
	theme: 'asciinema',
	speed: 1,
})

const playerContainer = ref<HTMLElement | null>(null)
let playerInstance: any = null

async function initPlayer() {
	// 客户端判断使用 import.meta.client（符合 Nuxt3/Vite 最新规范）
	if (!import.meta.client || !playerContainer.value)
		return

	try {
		// 5. 修改：导入逻辑
		const AsciinemaPlayer = await import('asciinema-player')
		// CSS 建议在组件顶层或全局按需引入，但在 setup 动态引入也行
		await import('asciinema-player/dist/bundle/asciinema-player.css')

		if (playerInstance) {
			playerInstance.dispose()
		}

		playerInstance = AsciinemaPlayer.create(props.src, playerContainer.value, {
			cols: props.cols,
			rows: props.rows,
			autoPlay: props.autoPlay,
			preload: props.preload,
			loop: props.loop,
			theme: props.theme,
			speed: props.speed,
		})
	}
	catch (error) {
		console.error('Failed to initialize AsciinemaPlayer:', error)
	}
}

onMounted(() => {
	initPlayer()
})

watch(() => props.src, () => {
	initPlayer()
})

onBeforeUnmount(() => {
	if (playerInstance?.dispose) {
		playerInstance.dispose()
	}
})
</script>

<template>
<div ref="playerContainer" class="asciinema-player-wrapper" />
</template>

<style scoped lang="scss">
.asciinema-player-wrapper.asciinema-player-wrapper {
	overflow: hidden;
	width: 100%;
	min-height: 200px;
	margin: 1rem 0;
	border-radius: 6px;
	background-color: #000;
	font-family: var(--font-monospace);
	font-size: var(--console-font-size, 14px);
}
</style>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 样式可以在服务端安全引入
import 'asciinema-player/dist/bundle/asciinema-player.css'

const props = withDefaults(defineProps<{
	type?: string
   url: string // 将 url 设为必传，因为播放器必须有地址
}>(), {
	type: 'default'
})

// 使用 ref 替代 MD5 生成 ID 的方式
const playerContainer = ref<HTMLElement | null>(null)
let player: any = null

onMounted(async () => {
  // 确保 DOM 已经存在且传入了 url
	if (playerContainer.value && props.url) {
	try {
      // 关键：在 onMounted 中使用动态导入 (Dynamic Import)
      // 这样可以确保 asciinema-player 只在浏览器端被加载和执行，完美避开 Nuxt SSR 报错
      const AsciinemaPlayer = await import('asciinema-player')
      
      player = AsciinemaPlayer.create(props.url, playerContainer.value, {
        // 在这里可以传入额外的播放器配置，例如：
        // autoPlay: false,
        // theme: 'asciinema'
      })
	} catch (error) {
      console.error('Failed to load asciinema-player:', error)
	}
	}
})

onBeforeUnmount(() => {
  // 组件销毁时清理播放器，防止多页面切换时内存泄漏
	if (player) {
		player.dispose()
	}
})
</script>

<template>
	<div class="terminal-video">
		<div ref="playerContainer" class="player-container"></div>
	</div>
</template>

<style lang="scss" scoped>
.terminal-video {
  /* 增加一些基础样式，防止播放器加载前页面抖动或大小异常 */
	width: 100%;
	margin: 1rem 0;

	.player-container {
	border-radius: 8px;
	overflow: hidden;
	}
}
</style>

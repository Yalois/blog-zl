<script setup lang="ts">
import { LazyPopoverLightbox } from '#components'

const modalStore = useModalStore()
const zoomEl = shallowRef<HTMLImageElement>()
const zoomCaption = ref('')

const { open: openLightbox } = modalStore.use(
	() => h(LazyPopoverLightbox, {
		el: zoomEl.value!,
		caption: zoomCaption.value || undefined,
	}),
	{ unique: true },
)

/** 点击文章内图片放大预览（Pic 组件已自带灯箱，跳过） */
function onClickImage(event: MouseEvent) {
	const img = (event.target as HTMLElement | null)?.closest('img') as HTMLImageElement | null
	if (!img || !img.closest('.article') || img.closest('figure.image, a'))
		return
	zoomEl.value = img
	zoomCaption.value = img.alt || img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || ''
	openLightbox()
}

onMounted(() => document.addEventListener('click', onClickImage))
onBeforeUnmount(() => document.removeEventListener('click', onClickImage))
</script>

<template>
<NuxtLoadingIndicator />
<NuxtRouteAnnouncer :style="{ position: 'absolute' }" />
<BlogSkipToContent />
<BlogSidebar />
<div id="content">
	<main id="main-content">
		<NuxtPage />
		<BlogFooter />
	</main>
	<BlogAside />
</div>
<BlogPanel />
<BikariyaModals />
</template>

<!-- eslint-disable-next-line vue/enforce-style-attribute -->
<style lang="scss">
#blog-root {
	display: flex;
	justify-content: center;
	gap: 1rem;
	min-width: 0;
}

#blog-sidebar, #blog-aside {
	flex: 0 0 280px; // 防止搜索框 grow
	position: sticky;
	top: 0;
	height: 100vh;
	height: 100dvh;
	min-width: 0; // 防止搜索框撑开页面
	scrollbar-width: thin;

	@media (max-width: $breakpoint-widescreen) {
		flex-shrink: 0.2;
	}
}

#content {
	display: flex;
	gap: 1rem;

	// 若设置的是 max-width，则内部 main 宽度为 fit-content，可能无法撑满
	// 此时即使设置 flex-grow，也会影响 #sidebar 无法正确 shrink
	width: $breakpoint-widescreen;
	min-width: 0; // 解决父级 flexbox 设置 justify-content: center 时溢出左侧消失的问题

	// 此处不建议给内容设置 padding
	> #main-content {
		position: relative; // 使切换页动画的“离场页面”（absolute）以内容区为基准
		flex-grow: 1; // 使较小宽度的内容占满

		// overflow: hidden; // 会使一部分元素吸顶失效

		// 使内容正确计算宽度而不横向溢出
		// 也可设置 width: 0 或者 contain: inline-size（兼容性不佳）
		min-width: 0;
	}
}

#main-content .article img {
	cursor: zoom-in;
}
</style>

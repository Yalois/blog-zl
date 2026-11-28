<script setup lang="ts">
const route = useRoute()

const layoutStore = useLayoutStore()
layoutStore.setAside(['toc'])

const { data: post } = await useAsyncData(
	route.path,
	() => queryCollection('content').path(route.path).first(),
)

const contentStore = useContentStore()
const { toc, meta } = storeToRefs(contentStore)

const excerpt = computed(() => post.value?.description || '')

function setTocAndMeta() {
	toc.value = post.value?.body.toc
	meta.value = post.value?.meta
}

setTocAndMeta()

if (post.value) {
	useSeoMeta({
		title: post.value.title,
		ogType: 'article',
		ogImage: post.value.image,
		description: post.value.description,
	})
	layoutStore.setAside(post.value.meta?.aside as WidgetName[] | undefined)
}
else {
	const event = useRequestEvent()
	event && setResponseStatus(event, 404)
	route.meta.title = '404'
	layoutStore.setAside(['blog-log'])
}

if (import.meta.dev) {
	watchEffect(() => {
		setTocAndMeta()
		layoutStore.setAside(post.value?.meta?.aside as WidgetName[] | undefined)
	})
}
</script>

<template>
<div class="post-page">
	<template v-if="post">
		<PostHeader v-bind="post" />
		<PostExcerpt v-if="excerpt" :excerpt />
		<!-- 使用 float-in 动画会导致搜索跳转不准确 -->
		<ContentRenderer
			class="article"
			:class="getPostTypeClassName(post?.type, { prefix: 'md' })"
			:value="post"
			tag="article"
		/>

		<PostFooter v-bind="post" />
		<PostSurround />
		<PostComment />
	</template>

	<ZError
		v-else
		icon="solar:confounded-square-bold-duotone"
		title="内容为空或页面不存在"
	/>
</div>
</template>

<style lang="scss" scoped>
.post-page {
	animation: post-fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes post-fade-in {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@media (prefers-reduced-motion: reduce) {
	.post-page {
		animation: none;
	}
}
</style>

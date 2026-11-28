<script setup lang="ts">
import type { MemosMemo } from '~/types/moment'

const props = defineProps<{
	memo: MemosMemo
}>()

const emit = defineEmits<{
	comment: [memo: MemosMemo]
}>()

const appConfig = useAppConfig()
const instance = computed(() => appConfig.moments.instance)
const html = computed(() => renderMomentMarkdown(props.memo.content, instance.value))
const tags = computed(() => props.memo.tags || [])
const displayTime = computed(() => props.memo.displayTime || props.memo.createTime)
</script>

<template>
<article class="moment card upraise">
	<header class="moment-head">
		<UtilDate :date="displayTime" relative />

		<span v-if="memo.pinned" class="pinned">
			<Icon name="ph:push-pin-bold" />
			置顶
		</span>
	</header>

	<div
		v-if="memo.content"
		class="article moment-content"
		v-html="html"
	/>

	<MomentMedia :memo="memo" />

	<footer class="moment-foot">
		<div class="tags">
			<span v-for="tag in tags" :key="tag" class="tag">
				#{{ tag }}
			</span>
		</div>

		<div class="actions">
			<button class="action" aria-label="查看评论" @click="emit('comment', memo)">
				<Icon name="ph:chat-circle-bold" />
				<span>评论</span>
			</button>
		</div>
	</footer>
</article>
</template>

<style lang="scss" scoped>
.moment {
	padding: 1rem 1.1rem;
	border-radius: 1rem;
}

.moment-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	font-size: 0.8rem;
	color: var(--c-text-3);
}

.pinned {
	display: inline-flex;
	align-items: center;
	gap: 0.2em;
	color: var(--c-primary);
}

.moment-content {
	margin: 0.6rem 0;
	font-size: 0.95rem;

	:deep(> :first-child) {
		margin-top: 0;
	}

	:deep(> :last-child) {
		margin-bottom: 0;
	}
}

.moment-foot {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	justify-content: space-between;
	gap: 0.5rem;
}

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
}

.tag {
	padding: 0.1em 0.5em;
	border-radius: 1em;
	background-color: var(--c-bg-soft);
	font-size: 0.75rem;
	color: var(--c-text-2);
}

.actions {
	display: flex;
	gap: 0.3rem;
}

.action {
	display: inline-flex;
	align-items: center;
	gap: 0.25em;
	padding: 0.25em 0.5em;
	border-radius: 0.5em;
	font-size: 0.8rem;
	color: var(--c-text-2);
	transition: background-color 0.2s, color 0.2s;

	&:hover {
		background-color: var(--c-bg-soft);
		color: var(--c-primary);
	}
}
</style>

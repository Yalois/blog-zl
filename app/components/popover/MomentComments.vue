<script setup lang="ts">
import type { MemosMemo } from '~/types/moment'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
	memo: MemosMemo
	open?: boolean
	duration?: number
}>()

const emit = defineEmits<{
	close: []
}>()

const appConfig = useAppConfig()
const uid = computed(() => getMomentUid(props.memo))
const commentPath = computed(() => `${appConfig.moments.commentPathPrefix}${uid.value}`)

useEventListener('keydown', (event) => {
	if (event.key === 'Escape')
		emit('close')
})
</script>

<template>
<Transition name="moment-comments">
	<section
		v-if="open"
		v-bind="$attrs"
		class="moment-comments card"
		role="dialog"
		aria-modal="true"
		aria-label="碎碎念评论"
	>
		<header class="moment-comments-head">
			<div>
				<span>碎碎念</span>
				<UtilDate :date="memo.createTime" relative />
			</div>

			<button aria-label="关闭评论" @click="emit('close')">
				<Icon name="ph:x-bold" />
			</button>
		</header>

		<PostComment
			:path="commentPath"
			title="评论"
		/>
	</section>
</Transition>
</template>

<style lang="scss" scoped>
.moment-comments {
	--z-index-popover: 1000;

	position: fixed;
	overflow: auto;
	inset-inline: 0;
	top: 8vh;
	width: min(42rem, 92vw);
	max-height: 84vh;
	margin-inline: auto;
	padding: 1rem;
}

.moment-comments-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;

	> div {
		display: flex;
		align-items: center;
		gap: 0.6em;
		font-size: 0.85rem;
		color: var(--c-text-2);
	}

	> button {
		padding: 0.3rem;
		border-radius: 0.4rem;
		font-size: 1.1rem;
		transition: background-color 0.2s, color 0.2s;

		&:hover {
			background-color: var(--c-bg-soft);
			color: var(--c-primary);
		}
	}
}

:deep(.z-comment) {
	margin: 0;

	> h3 {
		margin-top: 0.8rem;
	}
}

.moment-comments-enter-active,
.moment-comments-leave-active {
	transition: opacity 0.2s, transform 0.2s;
}

.moment-comments-enter-from,
.moment-comments-leave-to {
	opacity: 0;
	transform: translateY(0.5rem);
}
</style>

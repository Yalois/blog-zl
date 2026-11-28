<script setup lang="ts">
import type { MemosMemo } from '~/types/moment'
import { LazyPopoverMomentComments } from '#components'

const appConfig = useAppConfig()
const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'comm-group'])

useSeoMeta({
	title: '碎碎念',
	description: `${appConfig.title}的碎碎念，记录日常的想法和片段。`,
	ogType: 'website',
})

const { list, pending, error, hasMore, initialized, refresh, loadMore } = useMoments()

const selected = ref<MemosMemo>()
const modalStore = useModalStore()
const commentModal = modalStore.use(
	() => h(LazyPopoverMomentComments, { memo: selected.value! }),
	{ unique: true },
)

async function openComments(memo: MemosMemo) {
	if (commentModal.status.value !== 'closed')
		await commentModal.close()

	selected.value = memo
	commentModal.open()
}

onBeforeRouteLeave(async () => {
	if (commentModal.status.value !== 'closed')
		await commentModal.close()
})
</script>

<template>
<div class="moments">
	<div class="mobile-only">
		<BlogHeader to="/" tag="h1" />
	</div>

	<header class="moments-header">
		<div>
			<h1>碎碎念</h1>
			<p>想到什么就写什么，来自 Memos。</p>
		</div>
	</header>

	<div v-if="error" class="moments-error card">
		<Icon name="ph:warning-circle-bold" />
		<div>
			<p>碎碎念加载失败</p>
			<small>{{ error }}</small>
		</div>
		<ZButton text="重试" @click="refresh()" />
	</div>

	<section v-if="!error || list.length" class="moments-list" :aria-busy="pending">
		<template v-if="!initialized && !error">
			<div v-for="index in 3" :key="index" class="moment-skeleton card">
				<div class="skeleton-line short" />
				<div class="skeleton-line" />
				<div class="skeleton-line" />
			</div>
		</template>

		<MomentCard
			v-for="memo in list"
			:key="memo.name"
			:memo
			@comment="openComments"
		/>

		<div v-if="initialized && !pending && !list.length && !error" class="moments-empty card">
			<Icon name="ph:chat-teardrop-dots-bold" />
			<p>还没有碎碎念。</p>
		</div>

		<div v-if="hasMore && !error" class="moments-more">
			<ZButton
				:disabled="pending"
				:text="pending ? '加载中...' : '加载更多'"
				@click="loadMore()"
			/>
		</div>

		<p v-else-if="list.length && !error" class="moments-end">
			没有更多了
		</p>
	</section>
</div>
</template>

<style lang="scss" scoped>
.moments {
	padding: 1rem;
}

.moments-header {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 1rem;
	margin: 1rem 0 1.5rem;

	> div > h1 {
		margin-bottom: 0.2em;
		font-family: var(--font-creative);
		font-size: 1.8rem;
		font-weight: 600;
	}

	> div > p {
		font-size: 0.85rem;
		color: var(--c-text-3);
	}
}

.moments-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.moment-skeleton {
	padding: 1rem 1.1rem;
	border-radius: 1rem;
}

.skeleton-line {
	height: 0.8rem;
	margin: 0.7rem 0;
	border-radius: 1rem;
	background: linear-gradient(90deg, var(--c-bg-soft) 25%, var(--c-bg-2) 50%, var(--c-bg-soft) 75%);
	background-size: 200% 100%;
	animation: skeleton 1.2s infinite;

	&.short {
		width: 30%;
		margin-top: 0;
	}
}

@keyframes skeleton {
	from { background-position: 200% 0; }
	to { background-position: -200% 0; }
}

.moments-error {
	display: flex;
	align-items: center;
	gap: 0.8rem;
	padding: 1rem;

	> svg {
		flex-shrink: 0;
		font-size: 1.8rem;
		color: var(--c-primary);
	}

	> div {
		flex-grow: 1;
		min-width: 0;

		> p {
			font-weight: 600;
		}

		> small {
			overflow-wrap: anywhere;
			color: var(--c-text-3);
		}
	}
}

.moments-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	padding: 3rem 1rem;
	color: var(--c-text-3);

	> svg {
		font-size: 2.5rem;
	}
}

.moments-more {
	display: flex;
	justify-content: center;
}

.moments-end {
	padding: 1rem;
	font-size: 0.8rem;
	text-align: center;
	color: var(--c-text-3);
}

@media (max-width: $breakpoint-phone) {
	.moments-header {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}
}

@media (prefers-reduced-motion: reduce) {
	.skeleton-line {
		animation: none;
	}
}
</style>

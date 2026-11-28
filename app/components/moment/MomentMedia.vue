<script setup lang="ts">
import type { MemosMemo } from '~/types/moment'

const props = defineProps<{
	memo: MemosMemo
}>()

const appConfig = useAppConfig()
const instance = computed(() => appConfig.moments.instance)

const images = computed(() => (props.memo.attachments || []).filter(isImageAttachment))
const files = computed(() => (props.memo.attachments || []).filter(item => !isImageAttachment(item)))
const showImages = computed(() => !hasInlineImage(props.memo) && images.value.length > 0)
const hasContent = computed(() => showImages.value || files.value.length > 0)

function getFileIcon(type: string) {
	if (type.startsWith('audio/'))
		return 'ph:music-notes-bold'
	if (type.startsWith('video/'))
		return 'ph:video-bold'
	if (type.includes('pdf'))
		return 'ph:file-pdf-bold'
	if (type.startsWith('image/'))
		return 'ph:image-bold'
	return 'ph:file-bold'
}
</script>

<template>
<div v-if="hasContent" class="moment-media">
	<div v-if="showImages" class="moment-images">
		<Pic
			v-for="image in images"
			:key="image.name"
			:src="getMomentAttachmentUrl(instance, image)"
			:alt="image.filename"
			:width="image.mediaMetadata?.width || undefined"
			:height="image.mediaMetadata?.height || undefined"
		/>
	</div>

	<div v-if="files.length" class="moment-files">
		<a
			v-for="file in files"
			:key="file.name"
			:href="getMomentAttachmentUrl(instance, file)"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Icon :name="getFileIcon(file.type)" />
			<span>{{ file.filename }}</span>
		</a>
	</div>
</div>
</template>

<style lang="scss" scoped>
.moment-media {
	margin: 0.8rem 0;
}

.moment-images {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
	gap: 0.5rem;

	:deep(figure.image) {
		min-width: 0;
		margin: 0;
	}

	:deep(img) {
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
		border-radius: 0.5rem;
		object-fit: cover;
	}
}

.moment-files {
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	margin-top: 0.5rem;

	a {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.6rem;
		border-radius: 0.5rem;
		background-color: var(--c-bg-soft);
		font-size: 0.8rem;
		color: var(--c-text-2);
		transition: color 0.2s, background-color 0.2s;

		&:hover {
			background-color: var(--c-bg-2);
			color: var(--c-primary);
		}

		> span {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
</style>

<script setup lang="ts">
import ImageComponent from '#build/mdc-image-component.mjs'
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'

export interface UtilImgProps {
	src: string
	width?: string | number
	height?: string | number
	alt?: string
	densities?: string
	mirror?: ImgService
	filter?: string
}

const props = withDefaults(defineProps<UtilImgProps>(), {
	alt: '',
})

const src = computed(() => {
	const value = !props.src.startsWith('/') && !props.src.includes('://') && !props.src.startsWith('data:')
		? `/${props.src}`
		: props.src

	if (value.startsWith('/') && !value.startsWith('//')) {
		const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
		if (_base !== '/' && !value.startsWith(_base))
			return joinURL(_base, value)
	}
	if (props.mirror)
		return getImgUrl(value, props.mirror)
	return value
})
</script>

<template>
<component
	:is="ImageComponent"
	:src :alt :width :height :densities
	:style="{ filter }"
	:referrerpolicy="mirror ? 'no-referrer' : undefined"
/>
</template>

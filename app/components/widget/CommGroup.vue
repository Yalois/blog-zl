<script setup lang="ts">
import LinkCard from '../content/LinkCard.vue';

</script>

<template>
<BlogWidget
	card
	dim
	title="其他平台"
	bg-right
>
	<Pic
		src="https://img.sky233.top/img/2026/03/ffea19cdcec44fe724ebdb9f3adc109c8f817233394080aa73d15838ed9045c9.png"
		alt="微信公众号"
		width="100%"
		height="75px"
		class="rounded-full"
	/>


</BlogWidget>
</template>

<style lang="scss" scoped>
.title {
	background-clip: text;
	background-image: linear-gradient(60deg, var(--c-accent) -30%, var(--c-primary), var(--c-text-1));
	background-position: 100% 0;
	background-size: 200%;
	font-size: 1.8em;
	font-weight: 800;
	letter-spacing: 0.05em;
	color: transparent;
	transition: background-position 0.2s;

	.blog-widget:hover & {
		background-position: 0 0;
	}
}

.tip {
	font-size: 0.9em;
	line-height: 2;
}

:deep(.bg-img).bg-img.bg-img {
	opacity: 0.5;
}
</style>

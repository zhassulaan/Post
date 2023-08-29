<template>
	<button class='button'>
		{{ text }}
	</button>
</template>

<script setup>
	const prop = defineProps({
		text: String,
	});
</script>

<style scoped>
	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20.1375vw;
		height: 48px;
		border: none;
		border-radius: 10px;
		background: linear-gradient(134deg, var(--clr-yellow) 0%, rgba(230, 184, 45, .5) 100%);
		color: var(--clr-white);
		font-weight: 600;
		cursor: pointer;
		opacity: .75;
	}
</style>

<template>
	<router-link :to='`/post/${ post.id }`' class='box'>
		<img :src='post.image' class='box-image' :alt='post.name' />
		<div class="box-text">
			<p>{{ post.description }}</p>
		</div>
	</router-link>
</template>

<script setup>
	const prop = defineProps({
		post: Object,
	});
</script>

<style scoped lang='scss'>
	.box {
		position: relative;
		border-radius: 8px;
		overflow: hidden;
		&-image {
			width: 100%;
			height: 100%;
		}
		&-text {
			position: absolute;
			bottom: 0;
			width: 100%;
			background-color: var(--clr-white);
			padding: 8px;
			opacity: .75;
			p {
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
				color: var(--clr-black);
			}
		}
		&:hover {
			scale: 1.05;
		}
	}
</style>

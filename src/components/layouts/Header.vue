<template>
	<header class='header'>
		<router-link to='/'>
			<img src='@/assets/images/logo.png' alt='logo' class='header-logo btn' />
		</router-link>
		
		<div class='header-menu'>
			<span class='header-menu__item btn' v-if='!search' @click='search = true'>
				<icon-search class='header-menu__item-icon' />
				<p class='header-menu__item-text'>Поиск</p>
			</span>
			<search v-else @input='handleSearch' />
			
			<router-link to='/add' class='header-menu__item btn'>
				<p class='header-menu__item-text'>+ Добавить пост</p>
			</router-link>
			
			<router-link to='/favourites' class='header-menu__item btn'>
				<icon-heart class='header-menu__item-icon' />
				<p class='header-menu__item-text'>Избранное</p>
			</router-link>
		</div>
		<Dropdown v-if='search' :posts='filteredImages' @close='search = false' />
	</header>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import Dropdown from '@/components/Dropdown.vue';
	import Search from '@/components/Search.vue';
	import IconHeart from '@/components/icons/Heart.vue';
	import IconSearch from '@/components/icons/Search.vue';

	let posts = JSON.parse(localStorage.getItem('posts'));
	const search = ref(false);
	const searchInput = ref('');
	const filteredImages = computed(() => {
		const query = searchInput.value.toLowerCase().trim();
		if (!query) {
			return [];
		}
		return posts.filter(
			(item) => 
				item.name.toLowerCase().includes(query) ||
				item.name_en.toLowerCase().includes(query) ||
				item.company.toLowerCase().includes(query)
		);
	});

	function handleSearch(value) {
		searchInput.value = value;
	}
</script>

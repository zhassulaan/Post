<template>
  <main class='home container'>
    <div class='home-hero'>
      <div class='home-hero__background'></div>
      <search @input='handleSearch' />
    </div>
    <div class='home-body'>
      <Box
        class='home-body__item'
        :post='item'
        v-for='item in filteredImages'
        :key='item.id'
      />
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { posts } from '@/data';
  import Box from '@/components/Box.vue';
  import Search from '@/components/Search.vue';

  const searchInput = ref('');
  const local_posts = JSON.parse(localStorage.getItem('posts'));
  const filteredImages = computed(() => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      return local_posts;
    }
    return local_posts.filter(
      (item) => 
        item.name.toLowerCase().includes(query) ||
        item.name_en.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query)
    );
  });

  onMounted(() => {
    const data = JSON.parse(localStorage.getItem('posts'));

    if (!data) {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  });

  function handleSearch(value) {
    searchInput.value = value;
  }
</script>

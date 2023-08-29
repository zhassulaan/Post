<template>
  <main class='favourites container'>
    <h1 class='favourites-title'>Избранное</h1>
    <div class='favourites-body'>
      <Box class='home-body__item' :post='item' v-for='item in posts' :key='item.id' />
    </div>
  </main>
</template>

<script setup>
  import Box from '@/components/Box.vue';

  let posts = JSON.parse(localStorage.getItem('saved'));
</script>

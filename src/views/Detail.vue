<template>
  <main class='detail container'>
    <div class='detail-background'>
      <img :src='post.image' class='detail-background__image' :alt='post.name' />
    </div>

    <div class='detail-header'>
      <div class='detail-header__left'>
        <img :src='post.avatar' class='detail-header__left-avatar' :alt='post.company' />
        <h6 class='detail-header__left-title'>{{ post.name_en }}</h6>
        <p class='detail-header__left-subtitle'>{{ `@${ post.company.replace(/\s+/g, '').toLowerCase() }` }}</p>
      </div>
      
      <div class='detail-header__right'>
        <div class='detail-header__right-button btn' @click='handleFavourite()'>
          <icon-heart class='button-icon' :class="{ 'active': saved }" />
        </div>
        <a :href='post.image' download class='detail-header__right-button btn'>
          <icon-download class='button-icon' />
          <p class='button-text'>Download</p>
        </a>
      </div>
    </div>

    <div class='detail-body'>
      <img :src='post.image' class='detail-body__image' :alt='post.name' />
      <icon-maximize class='detail-body__button btn' @click='toggleMaximize' />
    </div>

    <div class='detail-footer'>
      <h3>{{ post.description }}</h3>
    </div>

    <div class='detail-maximized' v-if='isMaximized'>
      <img :src='post.image' class='detail-maximized__image' :class="isWidthLarger ? 'width' : 'height'" :alt='post.name' @load='checkImageDimensions' />
      <div class='detail-maximized__close btn' @click='toggleMaximize'></div>
      <div class='detail-maximized__background' @click='toggleMaximize'></div>
    </div>
  </main>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import IconDownload from '@/components/icons/Download.vue';
  import IconHeart from '@/components/icons/Heart.vue';
  import IconMaximize from '@/components/icons/Maximize.vue';

  const router = useRouter();
  let posts = JSON.parse(localStorage.getItem('posts'));
  const post = posts.find((item) => item.id === router.currentRoute.value.params.id);
  let data = JSON.parse(localStorage.getItem('saved'));
  const saved = ref(data && data.find((item) => item.id === post.id));
  const isWidthLarger = ref(null);
  const isMaximized = ref(false);

  watch(saved, (newValue) => {
    localStorage.setItem('saved', JSON.stringify(data));
  });
  onMounted(() => {
    isMaximized.value = false;
  });

  function handleFavourite() {
    if (saved.value) {
      data = data.filter((item) => item.id !== post.id);
    } else {
      data = data ? [...data, post] : [post];
    }
    saved.value = !saved.value;
    localStorage.setItem('saved', JSON.stringify(data));
  }
  function toggleMaximize() {
    isMaximized.value = !isMaximized.value;
    if (isMaximized.value) {
      document.body.classList.add('freeze');
    } else {
      document.body.classList.remove('freeze');
    }
  }
  function checkImageDimensions(event) {
    const imageElement = event.target;
    if (imageElement.naturalWidth > imageElement.naturalHeight) {
      isWidthLarger.value = true;
    } else {
      isWidthLarger.value = false;
    }
  }
</script>

<template>
  <main class='add container'>
    <h1 class='add-title'>Добавить пост</h1>
    <div class='add-body'>
      <Input
        type='text'
        id='name'
        text='Название поста'
        :text_value='new_post.name'
        @input='handleInput'
      />
      <Input
        type='text'
        id='name_en'
        text='Название поста на англ'
        :text_value='new_post.name_en'
        @input='handleInput'
      />
      <Input
        type='text'
        id='description'
        text='Описание поста'
        :text_value='new_post.description'
        @input='handleInput'
      />
      <Input
        type='file'
        id='image'
        text='Изображение'
        :file_value='new_post.image'
        @input='handleInput'
      />
      <Input
        type='text'
        id='company'
        text='Компания постройки'
        :text_value='new_post.company'
        @input='handleInput'
      />
      <Input
        type='file'
        id='logo'
        text='Логотип компании'
        :file_value='new_post.avatar'
        @input='handleInput'
      />
    </div>
    <div class='add-buttons'>
      <Button text='Отмена' @click='cancelPost()' />
      <Button text='Добавить' @click='addPost()' />
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Button from '@/components/Button.vue';
  import Input from '@/components/Input.vue';

  const router = useRouter();
  let posts = JSON.parse(localStorage.getItem('posts'));
  let new_post = ref({
    name: '',
    name_en: '',
    description: '',
    image: null,
    company: '',
    avatar: null,
  });

  function addPost() {
    new_post.value.id = prepareId(new_post.value.name_en);
    if (new_post.value.name && new_post.value.name_en && new_post.value.description && new_post.value.image && new_post.value.company && new_post.value.avatar) {
      const updatedPosts = [...posts, new_post.value];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      console.log(new_post.value.id);
      router.push('/');
      setTimeout(() => {
          window.location.reload();
        }, 1000);
    }
  }
  function cancelPost() {
    new_post.value = {
      name: '',
      name_en: '',
      description: '',
      image: null,
      company: '',
      avatar: null
    };
  }
  function handleInput(type, value) {
    if (type === 'name') {
      new_post.value.name = value;
    } else if (type === 'name_en') {
      new_post.value.name_en = value;
    } else if (type === 'description') {
      new_post.value.description = value;
    } else if (type === 'image') {
      new_post.value.image = value;
    } else if (type === 'company') {
      new_post.value.company = value;
    } else if (type === 'logo') {
      new_post.value.avatar = value;
    }
    console.log(new_post.value);
  }
  function prepareId(text) {
    let id = text.toLowerCase().replace(/\s+/g, '_');
    if (posts.find(post => post.id === id)) {
      return id + 'a';
    }
    return id;
  }
</script>

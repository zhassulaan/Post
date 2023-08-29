import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import HomeLayout from '../layouts/HomeLayout.vue';
import Home from '../views/Home.vue';

const posts = JSON.parse(localStorage.getItem('posts'));
const routes = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '',
        component: Home,
        name: 'Home',
      }
    ],
  }, {
    path: '/post/:id',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/Detail.vue'),
        name: 'Detail',
        beforeEnter: (to, from, next) => {
          const id = to.params.id;
          const pageExists = posts.some((item) => item.id === id);

          if (pageExists) {
            next();
          } else {
            next('/');
          }
        },
      }
    ],
  }, {
    path: '/add',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/Add.vue'),
        name: 'Add',
      }
    ],
  }, {
    path: '/favourites',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/Favourites.vue'),
        name: 'Favourites',
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

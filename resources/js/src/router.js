import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login/Index.vue'
import SignUp from '@/pages/SignUp/Index.vue'

import Profile from '@/pages/Profile/Index.vue'
import Polls from '@/pages/Polls/Index.vue'
import NotFound from '@/pages/404/Index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Вход',
        requiresAuth: false
      },
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      meta: {
        title: 'Регистрация',
        requiresAuth: false
      },
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        title: 'Профиль',
        requiresAuth: true
      },
      component: Profile
    },
    {
      path: '/',
      name: 'home',
      redirect: {
        name: 'polls'
      }
    },
    {
      path: '/polls',
      name: 'polls',
      meta: {
        title: 'Опросы',
        requiresAuth: true
      },
      component: Polls
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound
    },
  ]
})

export default router
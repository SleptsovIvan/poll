import "vue3-toastify/dist/index.css";
import '../../node_modules/nprogress/nprogress.css' 
import '../css/app.css'

import { createApp } from 'vue'
import app from '@/App.vue'
import axios from 'axios';
import NProgress from 'nprogress';
import router from '@/router'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'
import toastify from "vue3-toastify"
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

const pinia = createPinia()

NProgress.configure({ showSpinner: false });

createApp(app)
.use(router)
.use(pinia)
.use(toastify)
.component('TheHeader', TheHeader)
.component('TheFooter', TheFooter)
.mount('#app')

router.beforeEach((to, from, next) => {
  NProgress.start()
  const userStore = useUserStore(pinia)
  document.title = to.meta.title
  if (to.name == 'login' || to.name == 'signup') {
    return userStore.hasToken() 
      ? next({ name: 'polls' }) 
      : next()
  } else if (!userStore.hasToken()) {
    return next({ name: 'login' })
  } else {
    return next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.request.use(function (config) {
  NProgress.start()
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  NProgress.done()
  return response;
}, function (error) {
  NProgress.done()
  if (error.response.status == 401 || error.response.status == 419) {
    const token = localStorage.getItem('x_xsrf_token')
    if (token) {
      localStorage.removeItem('x_xsrf_token')
    }
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error);
});

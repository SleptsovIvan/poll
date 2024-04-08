import { defineStore } from 'pinia'
import { watch, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToastify } from '@/composables/useToastify'

export const useUserStore = defineStore('user', () => {
  const route = useRoute()
  const toastify = useToastify()
  const isAuth = ref(false)
  const data = reactive({
    name: '',
    email: ''
  }) 

  const hasToken = () => {
    return localStorage.getItem('x_xsrf_token') ? true : false
  }

  const setIsAuth = () => {
    isAuth.value = hasToken()
  }

  const getData = () => {
    axios.get('/api/admin/user')
      .then(res => {
        data.name = res.data.name
        data.email = res.data.email
      })
      .catch(err => {
        toastify.error(err)
      })

  }

  watch(route, setIsAuth)

  return {
    hasToken,
    isAuth,
    getData,
    data
  }
})
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToastify } from '@/composables/useToastify'

export const useAuthStore = defineStore('auth', () => {
  const toastify = useToastify()
  const router = useRouter()

  const formData = reactive({
    signup: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    login: {
      email: '',
      password: '',
    }
  })

  const resetFormData = () => {
    for(const key in formData.signup) {
      formData.signup[key] = ''
    }
    for(const key in formData.login) {
      formData.login[key] = ''
    }
  }

  const xsrfToken = async () => {
    return await axios.get('/sanctum/csrf-cookie')
      .then(res => {
        return res
      })
      .catch(err => {
        console.log(err)
      })
  }

  const action = (name) => {
    axios.post(`/${name}`, { ...formData[name] })
      .then(res => {
        if (res.config?.headers?.['X-XSRF-TOKEN']) {
          localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN'])
          resetFormData()
          router.push({
            name: 'polls'
          })
        }
      })
      .catch(err => {
        toastify.error(err.response.data.message)
      })
  }

  const signup = () => {
    xsrfToken()
      .then(res => {
        action('signup')
      })
  }

  const login = () => {
    xsrfToken()
      .then(res => {
        action('login')
      })
  }

  const logout = () => {
    axios.post('/logout')
      .then(res => {
        localStorage.removeItem('x_xsrf_token')
        resetFormData()
        router.push({
          name: 'login'
        })
      })
      .catch(err => {
        toastify.error(err.response.data.message)
      })
  }

  return {
    formData,
    signup,
    login,
    logout
  }
})
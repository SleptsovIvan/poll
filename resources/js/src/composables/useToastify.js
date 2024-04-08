import { toast } from 'vue3-toastify'

export const useToastify = () => {

  const show = (msg, type = 'default') => {
    toast(msg, {
      theme: 'dark',
      type: type,
      position: 'top-left',
      pauseOnFocusLoss: false,
      autoClose: 2000,
      hideProgressBar: true,
      dangerouslyHTMLString: true,
    })
  }

  const success = (msg) => {
    show(msg, 'success')
  }

  const error = (msg) => {
    show(msg, 'error')
  }

  return {
    success,
    error
  }
}
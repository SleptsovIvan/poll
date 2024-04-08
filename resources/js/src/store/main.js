import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { usePollsStore } from '@/store/polls'

export const useMainStore = defineStore('main', () => {
  const pollsStore = usePollsStore()
  const visible = reactive({
    createPollModal: false,
    editPollModal: false,
  })

  const hide = (key) => {
    visible[key] = false
    if (key == 'editPollModal') {
      pollsStore.itemId = null
      pollsStore.item = {}
    }
  }

  const show = (key) => {
    visible[key] = true
  }

  return {
    visible,
    hide,
    show
  }
})
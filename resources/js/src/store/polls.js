import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useMainStore } from './main'
import { useToastify } from '@/composables/useToastify'

export const usePollsStore = defineStore('polls', () => {
  const mainStore = useMainStore()
  const toastify = useToastify()

  const list = ref([])
  const item = ref({})
  const itemId = ref(null)

  const sampleData = reactive({
    question: '',
    options: [
      {
        id: self.crypto.randomUUID(),
        value: ''
      },
      {
        id: self.crypto.randomUUID(),
        value: ''
      },
    ]
  })

  const resetSampleData = () => {
    sampleData.question = ''
    sampleData.options = [
      {
        id: self.crypto.randomUUID(),
        value: ''
      },
      {
        id: self.crypto.randomUUID(),
        value: ''
      },
    ]
  }

  const getList = () => {
    axios.get('/api/admin/polls')
      .then(res => {
        list.value = res.data.data
      })
      .catch(err => {
        toastify.error(err)
      })
  }

  const getItem = (id) => {
    item.value = {}
    itemId.value = id
    axios.get(`/api/admin/polls/${id}`)
      .then(res => {
        item.value = res.data.data
      })
      .catch(err => {
        toastify.error(err)
      })
  }

  const create = (data) => {
    axios.post('/api/admin/polls', data)
      .then(res => {
        getList()
        item.value = {}
        toastify.success('Создано')
      })
      .catch(err => {
        toastify.error(err)
      })
      .finally(() => {
        resetSampleData()
        mainStore.hide('createPollModal')
      })
  }

  const update = (data) => {
    if (!itemId.value) {
      return
    }
    axios.put(`/api/admin/polls/${itemId.value}`, data)
    .then(res => {
      getList()
      itemId.value = null
      item.value = {}
      toastify.success('Обновлено')
    })
    .catch(err => {
      toastify.error(err)
    })
    .finally(() => {
      mainStore.hide('editPollModal')
    })
  }

  const destroy = (id) => {
    axios.delete(`/api/admin/polls/${id}`)
      .then(res => {
        getList()
        toastify.success('Удалено')
      })
      .catch(err => {
        toastify.error(err)
      })
      .finally(() => {
        resetSampleData()
        mainStore.hide('editPollModal')
      })
  }

  return {
    list,
    getList,
    getItem,
    create,
    update,
    destroy,
    item,
    itemId,
    sampleData
  }
})
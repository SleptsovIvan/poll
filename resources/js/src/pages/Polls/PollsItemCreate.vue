<script setup>
import { ref, reactive } from 'vue'
import { useMainStore } from '@/store/main'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { usePollsStore } from '@/store/polls'

const mainStore = useMainStore()
const pollsStore = usePollsStore()

const data = reactive({
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

const cancel = () => {
  mainStore.hide('createPollModal')
}

const save = () => {
  if (!data.question) {
    return
  }
  
  const options = []
  data.options.forEach(el => {
    if (el.value != '') {
      options.push({
        value: el.value
      })
    }
  })
  
  if (options.length < 2) {
    return
  }

  pollsStore.create({
    question: data.question,
    options: options
  })
}

const addOption = () => {
  data.options.push({
    value: '',
    id: self.crypto.randomUUID(),
  })
}

const removeOption = (index) => {
  if (data.options.length == 2) {
    return
  }
  data.options.splice(index, 1)
}

</script>

<template>
  <div @click.stop="mainStore.hide('createPollModal')" v-if="mainStore.visible.createPollModal"
    class="fixed top-0 left-0 w-full h-full backdrop-blur">
    <div class="mx-auto max-w-[560px]">
      <div class="flex items-center flex-col my-8">
        <div class="font-medium text-3xl">Создать опрос</div>
      </div>

      <form @click.stop class="flex flex-col p-11 pb-12 rounded-xl bg-white shadow-xl border border-gray-50"
        autocomplete="off">
        <div class="mb-1 font-medium">Вопрос</div>

        <textarea placeholder="Введите вопрос" v-model="data.question"
          class="mb-6 border min-h-11 px-4 py-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
        <div>

          <div class="mb-1 font-medium">Ответы</div>
          <div class="flex mb-4 items-center" v-for="(i, index) in data.options" :key="i.id">
            <input type="text" placeholder="Введите вариант ответа" v-model="i.value"
              class="border w-full min-h-11 px-4 py-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50" />

            <div v-if="data.options.length > 2" @click="removeOption(index)"
              class="cursor-pointer ms-2 w-9 min-w-9 h-9 flex items-center hover:bg-blue-600 justify-center bg-blue-500 rounded-full">
              <TrashIcon class="w-5 text-white stroke-2" />
            </div>
          </div>
        </div>

        <div class="mt-4 mb-5">
          <button @click.prevent="addOption" class="btn text-blue-500 hover:text-blue-600">
            <PlusIcon class="w-6 h-6 mr-2" />
            <span>Добавить поле</span>
          </button>
        </div>

        <div class="text-center">
          <span @click="cancel" class="cursor-pointer text-sm text-blue-500 hover:text-blue-600">
            Отмена
          </span>
        </div>

        <button @click.prevent="save" class="btn-solid mt-4">Сохранить</button>
      </form>
    </div>
  </div>
</template>
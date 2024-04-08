<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/store/main'
import { usePollsStore } from '@/store/polls'

import { useToastify } from '@/composables/useToastify'
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import BaseLineCounter from '@/components/UI/BaseLineCounter.vue'

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {
        type: 'poll',
        question: '',
        created_at: '',
        options: []
      }
    }
  },
})

const mainStore = useMainStore() 
const pollsStore = usePollsStore()
const toastify = useToastify()

const deletePoll = () => {
  pollsStore.destroy(props.item.id)
}

const total = computed(() => {
  return props.item.options.reduce((sum, el) => sum + el.count, 0)
})

const showItem = () => {
  pollsStore.getItem(props.item.id)
  mainStore.show('editPollModal')
}

</script>
<template>
  <div @click="showItem" class="group p-2 border border-gray-100 bg-white rounded-lg cursor-pointer shadow-lg">
    <div class="p-3 h-full flex flex-col rounded-lg group-hover:bg-blue-50">
      <div class="flex flex-wrap justify-between items-center border-b border-gray-200 mb-3">
        <div class="text-xs">ID: {{ props.item.id }}</div>
        <div class="text-xs">
          {{ new Date(props.item.created_at)
            .toLocaleString('ru-RU', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }) 
          }}
        </div>
      </div>
      
      <div class="grow">
        <div class="text mb-2">{{ props.item.question }}</div>
        <span class="text-xs">Кол-во ответов: {{ total }}</span>

        <ul>
          <li v-for="i in props.item.options" class="mt-2">
            <span class="text-xs">{{ i.value }}</span>
            <BaseLineCounter :count="i.count" :total="total"/>
          </li>
        </ul>
      </div>

      <div class="flex justify-end mt-4 border-t border-gray-200 pt-2">
        <!-- <div @click.prevent="deletePoll"
          class="w-9 h-9 flex items-center hover:bg-blue-600 justify-center bg-blue-500 rounded-full">
          <PencilSquareIcon class="w-5 text-white stroke-2" />
        </div> -->

        <div @click.stop="deletePoll"
          class="ms-1 w-9 h-9 flex items-center hover:bg-blue-600 justify-center bg-blue-500 rounded-full">
          <TrashIcon class="w-5 text-white stroke-2" />
        </div>
      </div>
    </div>
  </div>
</template>
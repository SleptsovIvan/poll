<script setup>
import PollsItem from './PollsItem.vue';
import { usePollsStore } from '@/store/polls'
const pollsStore = usePollsStore()
pollsStore.getList()
</script>

<template>
  <div class="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <PollsItem v-for="i in pollsStore.list" :item="i" />
  </div>
</template>
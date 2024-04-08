<script setup>
import PollsList from './PollsList.vue'
import PollsItemCreate from './PollsItemCreate.vue'
import PollsItemEdit from './PollsItemEdit.vue'

</script>

<template>
  <div class="px-5">
    <PollsItemCreate />
    <PollsItemEdit />
    <PollsList />

  </div>
</template>
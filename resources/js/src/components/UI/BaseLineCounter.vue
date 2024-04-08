<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 0
  },
})

const start = reactive({
  count: null,
  percent: null
})

const counter = reactive({
  count: 0,
  percent: 0
})

const getPercent = () => {
  return props.total
    ? 100 - Math.ceil(((props.total - props.count) * 100) / props.total)
    : 0
}

const animate = (name, value, time) => {
  if (start[name] == null) {
    start[name] = time
  }
  const run = time - start[name]
  counter[name] = value > 0
    ? Math.ceil(value * Math.min(run / 500, 1))
    : 0

  if (run < 500) {
    name == 'count'
      ? requestAnimationFrame(animateCount)
      : requestAnimationFrame(animateLine)
  }
}

const animateLine = (time) => {
  animate('percent', getPercent(), time)
}

const animateCount = (time) => {
  animate('count', props.count, time)
}

requestAnimationFrame(animateLine)
requestAnimationFrame(animateCount)
</script>

<template>
  <div class="flex items-center">
    <div class="w-full">
      <svg width="100%" height="6px" xmlns="http://www.w3.org/2000/svg">
        <line class="stroke-blue-200 stroke-[6px]" y1="3px" y2="3px" x1="0%" x2="100%" />
        <line class="stroke-blue-500 stroke-[6px]" y1="3px" y2="3px" x1="0%" :x2="`${counter.percent}%`" />
      </svg>
    </div>
    <div class="ms-2 text-xs">
      {{ counter.count }}
    </div>
  </div>
</template>
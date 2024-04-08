<script setup>
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {
        label: 'label',
        type: 'text',
        name: '',
        placeholder: 'placeholder'
      }
    }
  },
  modelValue: [String, Number]
})

const emit = defineEmits([
  'update:modelValue'
])

const input = (e) => {
  emit('update:modelValue', e.target.value)
}

</script>

<template>
  <div>
    <label class="block mb-1 font-medium">
      {{ props.data.label }}
    </label>
    
    <div class="relative mb-6">
      <input class="form-input w-full ps-12"
        :name="props.data.name"
        :type="props.data.type" 
        :value="props.modelValue" 
        :placeholder="props.data.placeholder"
        @input="input" 
      >
      <div class="absolute top-0 left-0 h-11 w-12 flex items-center justify-center">
        <div class="w-6 text-gray-500 stroke-2">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
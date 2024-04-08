<script setup>
import { useRouter } from 'vue-router';
import BaseInput from '@/components/UI/BaseInput.vue'
import { UserCircleIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()
const inputs = [
  {
    data: {
      label: 'Имя',
      type: 'text',
      name: 'name',
      placeholder: 'Mr. John',
    },
    icon: UserIcon,
  },
  {
    data: {
      label: 'Логин',
      type: 'email',
      name: 'email',
      placeholder: 'john@example.com',
    },
    icon: EnvelopeIcon,
  },
  {
    data: {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      placeholder: 'Минимум 8 символов',
    },
    icon: LockClosedIcon,
  },
  {
    data: {
      label: 'Подтверждение пароля',
      type: 'password',
      name: 'password_confirmation',
      placeholder: 'Минимум 8 символов',
    },
    icon: LockClosedIcon,
  },
]


const updateFormData = (e) => {
  // console.log(e)
}
</script>

<template>
  <div>
    <div class="mx-auto max-w-[560px]">
      <div class="flex items-center flex-col my-8">
        <div class="mb-8 rounded-full">
          <UserCircleIcon class="w-16 text-blue-500" />
        </div>
        <div class="font-medium text-3xl">Создать аккаунт</div>
      </div>

      <form class="flex flex-col p-11 pb-12 rounded-xl bg-white shadow-xl border border-gray-50" autocomplete="off">
        <BaseInput v-for="i in inputs" :data="i.data" v-model="authStore.formData.signup[i.data.name]"
          @update:modelValue="updateFormData">
          <component :is="i.icon"></component>
        </BaseInput>
        
        <div class="text-center">
          <span @click="router.push({name: 'login'})" class="cursor-pointer text-sm text-blue-500 hover:text-blue-600">
            У меня есть аккаунт
          </span>
        </div>

        <button @click.prevent="authStore.signup" class="btn-solid mt-4">Создать аккаунт</button>
      </form>
    </div>
  </div>
</template>
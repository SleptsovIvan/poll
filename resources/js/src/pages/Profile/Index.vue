<script setup>
import BaseInput from '@/components/UI/BaseInput.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useAuthStore } from '@/store/auth';
import { UserIcon, UserCircleIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';

const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

userStore.getData()

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
  }
]

const updateFormData = (e) => {
  console.log(userStore.data)
}

const save = () => {
  console.log(userStore.data)
}
</script>

<template>
  <div class="mx-auto max-w-[560px] ">
    <div class="flex items-center flex-col my-8">
      <div class="mb-8 rounded-full">
        <UserCircleIcon class="w-16 text-blue-500" />
      </div>
      <div class="font-medium text-3xl">Профиль пользователя</div>
    </div>

    <form class="flex flex-col p-11 pb-12 rounded-xl bg-white shadow-xl border border-gray-50">
      <BaseInput v-for="i in inputs" :data="i.data" v-model="userStore.data[i.data.name]"
        @update:modelValue="updateFormData">
        <component :is="i.icon"></component>
      </BaseInput>

      <div class="text-center">
        <span @click="authStore.logout" class="cursor-pointer text-sm text-blue-500 hover:text-blue-600">
          Выйти
        </span>
      </div>

      <button @click.prevent="save" class="btn-solid mt-4">Сохранить</button>
    </form>
  </div>
</template>
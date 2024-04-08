<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { UserIcon } from '@heroicons/vue/24/solid'

import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user';
import { useMainStore } from '@/store/main'

const mainStore = useMainStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const menu = ref(null)
const show = ref(false)

const showMenu = () => {
	if (show.value) {
		menu.value.blur()
	} else {
		show.value = true
	}
}

const hideMenu = () => {
	show.value = false
}

const to = (name) => {
	router.push({
		name: name
	})
	hideMenu()
}

const logout = () => {
	authStore.logout()
	hideMenu()
}

</script>
<template>
	<header>
		<div class="flex items-center justify-between mx-5 max-w-[1880px] w-full p-5 border-b border-blue-200">
			<div class="flex items-center cursor-pointer" @click="router.push({name: 'home'})">
				<img src="/public/favicon-64.png" width="44" alt="">
				<div class="ms-2 text-2xl font-medium hidden sm:block">Опросы</div>
			</div>

			<template v-if="userStore.isAuth">
				<button @click="mainStore.show('createPollModal')" v-if="route.name == 'polls' || route.name == '/'" class="ms-auto me-4 btn-solid rounded-full sm:rounded-lg w-11 p-0 sm:w-auto sm:px-4 md:py-2">
					<PlusIcon class="w-6 h-6"/>
					<span class="ms-2 hidden sm:inline">
						Создать опрос
					</span>
				</button>

				<div ref="menu" class="flex relative" tabindex="0" @focusout="hideMenu">
					<div @click="showMenu"
						class="flex items-center justify-center rounded-full h-11 w-11 bg-blue-500 cursor-pointer hover:bg-blue-600">
						<UserIcon class="text-white h-5 w-5" />
					</div>

					<ul v-if="show" class="absolute bg-white top-11 right-0 rounded-lg p-2 shadow-lg border border-gray-50">
						<li class="text-nowrap text-xs cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-lg" @click="to('polls')">
							Мои опросы
						</li>

						<li class="text-xs cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-lg" @click="to('profile')">
							Профиль
						</li>

						<li class="text-xs cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-lg" @click="logout">
							Выйти
						</li>
					</ul>
				</div>
			</template>
		</div>
	</header>
</template>

<style scoped></style>

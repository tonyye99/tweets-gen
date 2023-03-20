<script setup lang="ts">
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const colorMode = useColorMode()
const user = useSupabaseUser()

const active = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const accountOptions = [
  {
    label: 'Profile',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: 'Edit Profile',
    key: 'editProfile',
    icon: renderIcon(EditIcon)
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }
]

const handleSelect = async (key: string | number) => {
  if (key === 'logout') {
    const client = useSupabaseAuthClient()
    const router = useRouter()

    try {
      const { error } = await client.auth.signOut()
      if (error) {
        console.log(error)
        return
      }

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<template>
  <div>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-naive-black">
      <div class="flex flex-wrap items-center justify-between mx-auto px-10">
        <nuxt-link to="/" class="flex items-center">
          <img src="~/assets/logo.png" class="h-10 mt-1" alt="TweetsGen Logo">
        </nuxt-link>
        <div id="navbar-default" class="flex items-center gap-3">
          <ul class="flex flex-col p-2 bg-white dark:bg-naive-black">
            <li>
              <n-switch v-model:value="active" size="large" class="">
                <template #checked-icon>
                  🌙
                </template>
                <template #unchecked-icon>
                  ☀️
                </template>
              </n-switch>
            </li>
          </ul>
          <n-dropdown v-if="user" :options="accountOptions" @select="handleSelect">
            <n-avatar round size="medium" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          </n-dropdown>
        </div>
      </div>
    </nav>
  </div>
</template>

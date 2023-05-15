<script setup lang="ts">
import {
    PersonCircleOutline as UserIcon,
    Pencil as EditIcon,
    LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'
import useIconRender from '~~/composables/useIconRender'

const user = useSupabaseUser()

const accountOptions = [
    {
        label: 'Profile',
        key: 'profile',
        icon: useIconRender(UserIcon)
    },
    {
        label: 'Edit Profile',
        key: 'editProfile',
        icon: useIconRender(EditIcon)
    },
    {
        label: 'Logout',
        key: 'logout',
        icon: useIconRender(LogoutIcon)
    }
]

const handleSelect = async (key: string | number) => {
    if (key === 'logout') {
        const client = useSupabaseAuthClient()
        const router = useRouter()

        try {
            const { error } = await client.auth.signOut()
            if (error) {
                // console.log(error)
                return
            }

            router.push('/')
        } catch (error) {
            // console.log(error)
        }
    }
}

const avatar = computed(() => {
    if (!user.value) {
        return ''
    }

    return user.value?.user_metadata?.avatar_url
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-between mx-auto px-10">
    <nuxt-link to="/" class="flex items-center">
      <img src="~/assets/logo.png" class="h-10" alt="TweetsGen Logo">
    </nuxt-link>
    <div id="navbar-default" class="flex items-center gap-3">
      <n-dropdown v-if="user" :options="accountOptions" @select="handleSelect">
        <n-avatar round size="medium" :src="avatar"
          fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import AIGenerateIcon from '@vicons/fluent/TextContinuous20Filled'
import MagicWriterIcon from '@vicons/fa/Magic'
import ScheduleIcon from '@vicons/antd/ScheduleOutlined'
import CalendarIcon from '@vicons/ionicons5/CalendarOutline'
import ConnectedAccIcon from '@vicons/fluent/PlugDisconnected20Regular'
import SettingIcon from '@vicons/fluent/ContentSettings16Regular'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    key: 'label-1',
    label: () =>
      h(
        'span',
        {
          style: {
            color: 'grey',
            fontSize: '12px'
          }
        },
        { default: () => 'Contents' }
      )
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'ai-contents'
          }
        },
        { default: () => 'AI Contents' }
      ),
    key: 'ai-contents',
    icon: renderIcon(AIGenerateIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/magic-writer'
          }
        },
        { default: () => 'Magic Writer' }
      ),
    key: 'magic-writer',
    icon: renderIcon(MagicWriterIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/ai-contents'
          }
        },
        { default: () => 'Content Scheduling' }
      ),
    key: 'content-scheduling',
    icon: renderIcon(ScheduleIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/ai-contents'
          }
        },
        { default: () => 'Content Calendar' }
      ),
    key: 'content-calendar',
    icon: renderIcon(CalendarIcon)
  },
  {
    key: 'divider-1',
    type: 'divider'
  },
  {
    label: 'Connected Accounts',
    key: 'connected-accounts',
    icon: renderIcon(ConnectedAccIcon)
  },
  {
    label: 'Account Settings',
    key: 'account-settings',
    icon: renderIcon(SettingIcon)
  }
]

const menuOptionsCollapse: MenuOption[] = [
  {
    key: 'label-1',
    label: () =>
      h(
        'span',
        {
          style: {
            color: 'grey',
            fontSize: '12px'
          }
        },
        { default: () => 'Contents' }
      )
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'ai-contents'
          }
        },
        { default: () => 'AI Contents' }
      ),
    key: 'ai-contents',
    icon: renderIcon(AIGenerateIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/magic-writer'
          }
        },
        { default: () => 'Magic Writer' }
      ),
    key: 'magic-writer',
    icon: renderIcon(MagicWriterIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/ai-contents'
          }
        },
        { default: () => 'Content Scheduling' }
      ),
    key: 'content-scheduling',
    icon: renderIcon(ScheduleIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/ai-contents'
          }
        },
        { default: () => 'Content Calendar' }
      ),
    key: 'content-calendar',
    icon: renderIcon(CalendarIcon)
  },
  {
    key: 'label-2',
    label: () =>
      h(
        'span',
        {
          style: {
            color: 'grey',
            fontSize: '12px'
          }
        },
        { default: () => 'Settings' }
      )
  },
  {
    label: 'Connected Accounts',
    key: 'connected-accounts',
    icon: renderIcon(ConnectedAccIcon)
  },
  {
    label: 'Account Settings',
    key: 'account-settings',
    icon: renderIcon(SettingIcon)
  }
]

const menu = ref<MenuOption[]>()
const activeKey = ref<string | null>(null)
const collapsed = ref(false)

const route = useRoute()
activeKey.value = route.path?.split('/')[1]

const onCollapse = () => {
  collapsed.value = true
  menu.value = menuOptionsCollapse
}

const onExpand = () => {
  collapsed.value = false
  menu.value = menuOptions
}

const colorMode = useColorMode()
const user = useSupabaseUser()

const active = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

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
  <n-layout>
    <n-layout-header style="padding: 18px" bordered>
      <div class="flex flex-wrap items-center justify-between mx-auto px-10">
        <nuxt-link to="/" class="flex items-center">
          <img src="~/assets/logo.png" class="h-10" alt="TweetsGen Logo">
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
    </n-layout-header>
    <n-layout has-sider class="h-screen bg-white dark:bg-naive-black">
      <n-layout-sider :bordered="!collapsed" collapse-mode="width" :collapsed-width="64" :width="240"
        :collapsed="collapsed" show-trigger @collapse="onCollapse" @expand="onExpand">
        <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :options="menu" />
      </n-layout-sider>
      <n-layout embedded content-style="padding: 24px;" class="bg-naive-white dark:bg-naive-dark">
        <div class="min-h-screen bg-white dark:bg-naive-black rounded-sm p-5">
          <NuxtPage />
        </div>
        <TheFooter />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

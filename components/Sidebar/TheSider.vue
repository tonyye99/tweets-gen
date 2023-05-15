<script setup lang="ts">
import AIGenerateIcon from '@vicons/fluent/TextContinuous20Filled'
import MagicWriterIcon from '@vicons/fa/Magic'
import ScheduleIcon from '@vicons/antd/ScheduleOutlined'
import CalendarIcon from '@vicons/ionicons5/CalendarOutline'
import ConnectedAccIcon from '@vicons/fluent/PlugDisconnected20Regular'
import SettingIcon from '@vicons/fluent/ContentSettings16Regular'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'

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
        icon: useIconRender(AIGenerateIcon)
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
        icon: useIconRender(MagicWriterIcon)
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
        icon: useIconRender(ScheduleIcon)
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
        icon: useIconRender(CalendarIcon)
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
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/connected-accounts'
                    }
                },
                { default: () => 'Connected Accounts' }
            ),
        key: 'connected-accounts',
        icon: useIconRender(ConnectedAccIcon)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/account-settings'
                    }
                },
                { default: () => 'Account Settings' }
            ),
        key: 'account-settings',
        icon: useIconRender(SettingIcon)
    }
]

const menuOptionsCollapse: MenuOption[] = [
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
        icon: useIconRender(AIGenerateIcon)
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
        icon: useIconRender(MagicWriterIcon)
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
        icon: useIconRender(ScheduleIcon)
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
        icon: useIconRender(CalendarIcon)
    },
    {
        key: 'divider-1',
        type: 'divider'
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/connected-accounts'
                    }
                },
                { default: () => 'Connected Accounts' }
            ),
        key: 'connected-accounts',
        icon: useIconRender(ConnectedAccIcon)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        path: '/account-settings'
                    }
                },
                { default: () => 'Account Settings' }
            ),
        key: 'account-settings',
        icon: useIconRender(SettingIcon)
    }
]

const collapsed = ref(false)
const menu = ref<MenuOption[]>()

const onCollapse = () => {
    collapsed.value = true
    menu.value = menuOptionsCollapse
}

const onExpand = () => {
    collapsed.value = false
    menu.value = menuOptions
}

onExpand()

const activeKey = ref<string | null>(null)
const route = useRoute()

watch(
    () => route.path,
    (path) => {
        activeKey.value = path?.replace('/', '')
    },
    { immediate: true }
)
</script>

<template>
  <n-layout-sider collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed" show-trigger
    @collapse="onCollapse" @expand="onExpand">
    <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :options="menu" />
  </n-layout-sider>
</template>

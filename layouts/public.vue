<script setup lang="ts">
import {
  NConfigProvider,
  GlobalThemeOverrides,
  darkTheme,
  lightTheme
} from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1DA1F2',
    actionColor: '#1DA1F2'
  },
  Input: {
    borderHover: '#1DA1F2',
    borderFocus: '#1DA1F2'
  },
  Select: {
    peers: {
      InternalSelection: {
        borderHover: '#1DA1F2',
        borderActive: '#1DA1F2',
        borderFocus: '#1DA1F2'
      }
    }
  },
  Switch: {
    railColorActive: '#1DA1F2'
  },
  Button: {
    colorPrimary: '#1DA1F2',
    colorHoverPrimary: '#118BD7',
    colorFocusPrimary: '#118BD7',
    colorPressedPrimary: '#118BD7',
    borderPressedPrimary: '#1DA1F2',
    borderFocusPrimary: '#1DA1F2',
    borderHoverPrimary: '#1DA1F2',
    borderHover: '#1DA1F2',
    textColorGhostPressedPrimary: '#1DA1F2',
    textColorGhostHoverPrimary: '#1DA1F2',
    textColorGhostFocusPrimary: '#1DA1F2'
  }
}

const colorMode = useColorMode()

const theme = computed(() => {
  return colorMode.value === 'dark' ? darkTheme : lightTheme
})
</script>

<template>
  <div>
    <ClientOnly>
      <n-config-provider :theme-overrides="themeOverrides" :theme="theme">
        <PublicTheHeader />
        <div class="min-h-screen bg-white dark:bg-naive-dark">
          <n-message-provider>
            <NuxtPage />
          </n-message-provider>
        </div>
        <PublicTheFooter />
      </n-config-provider>
    </ClientOnly>
  </div>
</template>

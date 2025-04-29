<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})
</script>

<template>
  <client-only v-if="!colorMode?.forced">
    <u-button
      :icon="isDark ? 'iconamoon:mode-light-duotone' : 'iconamoon:mode-dark-duotone'"
      color="neutral"
      variant="ghost"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="size-8" />
    </template>
  </client-only>
</template>

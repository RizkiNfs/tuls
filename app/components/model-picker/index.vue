<script setup lang="ts">
const data = useLiveQuery('SELECT * FROM model_providers;')
const options = computed(() => {
  return data?.rows?.value?.map((i: any) => i.name)
})
</script>

<template>
  <u-select-menu class="min-w-[150px]" default-value="Open AI" :items="options">
    <template #content-bottom>
      <hr>
      <u-button
        icon="iconamoon:sign-plus-duotone"
        color="neutral"
        variant="ghost"
      >
        add model
      </u-button>
    </template>
  </u-select-menu>
</template>

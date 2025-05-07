<script setup lang="ts">
const { execute: selectModels, result } = useDB(
  db => () => db?.query.models.findMany(),
  { subscribe: ['db:table:models'] },
)

const options = computed(() => {
  return result?.value.map(i => i.name)
})

await selectModels()
</script>

<template>
  <u-select-menu class="min-w-[150px]" placeholder="Select Model" :items="options">
    <template #content-bottom>
      <hr>
      <u-button
        to="/settings"
        icon="iconamoon:sign-plus-duotone"
        color="neutral"
        variant="ghost"
      >
        add model
      </u-button>
    </template>
  </u-select-menu>
</template>

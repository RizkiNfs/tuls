<script setup lang="ts">
import type { Model } from '~/db/schema'
import { models } from '~/db/schema'

const props = defineProps<{
  providerId: string
}>()

const { execute: insertModel } = useDB(
  db => (values: Model) => db.insert(models).values(values),
  { publish: ['db:table:models'] },
)

const model = ref('')

async function handleSubmit() {
  if (model.value) {
    await insertModel({
      id: crypto.randomUUID(),
      name: model.value,
      providerId: props.providerId,
    })
    model.value = ''
  }
}
</script>

<template>
  <form class="flex gap-4 mt-2" @submit.prevent="handleSubmit">
    <u-input v-model.trim="model" size="xl" class="flex-1" />
    <u-button icon="iconamoon:sign-plus-duotone" variant="soft" type="submit" />
  </form>
</template>

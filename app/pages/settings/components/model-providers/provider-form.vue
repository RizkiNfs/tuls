<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ModelProvider } from '~/db/schema'
import * as v from 'valibot'
import { modelProviders } from '~/db/schema'

const emit = defineEmits<{
  submit: []
}>()

const schema = v.object({
  name: v.string(),
  url: v.pipe(v.string(), v.url('Invalid URL')),
  apiKey: v.string(),
})

type Schema = v.InferOutput<typeof schema>

const initialState = {
  name: '',
  url: '',
  apiKey: '',
}

const state = reactive<Schema>(structuredClone(initialState))

const { execute: insertModelProvider } = useDB(
  db => (values: ModelProvider) => db.insert(modelProviders).values(values),
  { publish: ['db:table:modelProviders'] },
)

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  const id = crypto.randomUUID()
  await insertModelProvider({
    id,
    name: event.data.name,
    url: event.data.url,
    apiKey: event.data.apiKey,
  })

  Object.assign(state, structuredClone(initialState))

  emit('submit')
}
</script>

<template>
  <u-form :schema="schema" :state="state" class="space-y-4" @submit="handleSubmit">
    <u-form-field label="Name" name="name">
      <u-input v-model="state.name" class="block" />
    </u-form-field>

    <u-form-field label="url" name="url">
      <u-input v-model="state.url" class="block" />
    </u-form-field>

    <u-form-field label="API key" name="apiKey">
      <u-input v-model="state.apiKey" class="block" />
    </u-form-field>

    <u-button type="submit" variant="soft">
      Save
    </u-button>
  </u-form>
</template>

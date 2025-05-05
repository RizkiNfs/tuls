<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as v from 'valibot'

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
const pg = usePGlite()

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  const id = crypto.randomUUID()
  await pg.query(
    `INSERT INTO model_providers (id, name, url, api_key) VALUES ($1,$2,$3,$4);`,
    [id, event.data.name, event.data.url, event.data.apiKey],
  )
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

<script setup lang="ts">
import ModelForm from './model-form.vue'

const { execute: selectModelProviders, result } = useDB(
  db => () => db?.query.modelProviders.findMany({ with: { models: true } }),
  { subscribe: ['db:table:modelProviders', 'db:table:models'] },
)
await selectModelProviders()
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <u-card
      v-for="provider in result"
      :key="provider.id"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <p>{{ provider.name }}</p>
          <div>
            <u-button variant="ghost" icon="iconamoon:edit-duotone" />
            <u-button variant="ghost" icon="iconamoon:trash-duotone" />
          </div>
        </div>
      </template>
      <template #default>
        <div>
          <h3 class="font-semibold">
            Models
          </h3>
          <ul class="mt-2">
            <li
              v-for="model in provider.models"
              :key="model.id"
              class="rounded flex items-center justify-between"
            >
              <p class="p-1 px-2">
                {{ model.name }}
              </p>
              <u-button variant="ghost" icon="iconamoon:trash-duotone" />
            </li>
          </ul>
          <ModelForm :provider-id="provider.id" class="mt-2" />
        </div>
      </template>
    </u-card>
  </div>
</template>

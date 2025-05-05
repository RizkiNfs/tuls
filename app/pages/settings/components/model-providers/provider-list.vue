<script setup lang="ts">
interface Provider {
  id: string
  name: string
  url: string
  api_key: string
}
const data = useLiveQuery<Provider>('SELECT * FROM model_providers;')
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <u-card
      v-for="provider in data.rows.value"
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
          <h3 class="font-semibold">Models</h3>
          <ul class="mt-2">
            <li class="hover:bg-primary-50 rounded flex items-center justify-between">
              <p class="p-1 px-2">
                gemini-2.0-flash-lite
              </p>
              <u-button variant="ghost" icon="iconamoon:trash-duotone" />
            </li>
          </ul>
          <div class="flex gap-4 mt-2">
            <u-input size="xl" class="flex-1" />
            <u-button icon="iconamoon:sign-plus-duotone" variant="soft" />
          </div>
        </div>
      </template>
    </u-card>
  </div>
</template>

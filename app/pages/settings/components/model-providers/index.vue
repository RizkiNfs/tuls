<script setup lang="ts">
import ProviderForm from './provider-form.vue'
import ProviderList from './provider-list.vue'

const isShowForm = ref(false)
</script>

<template>
  <div>
    <div class="flex">
      <h2 class="text-lg font-semibold mb-3 flex-1">
        Providers
      </h2>
      <u-button icon="iconamoon:sign-plus-duotone" variant="soft" @click="isShowForm = true">
        Add Provider
      </u-button>
    </div>
    <u-modal v-model:open="isShowForm" title="Modal with title">
      <template #body>
        <ProviderForm @submit="isShowForm = false" />
      </template>
    </u-modal>
    <ProviderList class="mt-4" />
  </div>
</template>

<script setup lang="ts">
const { execute: selectNotes, result } = useDB(
  db => () => db?.query.notes.findMany(),
  { subscribe: ['db:insert:notes', 'db:update:notes'] },
)

await selectNotes()
</script>

<template>
  <div class="flex">
    <aside class="w-[264px] p-4 border-r min-h-screen fixed left-0 top-0">
      <nuxt-link to="/" class="text-xl font-semibold">
        Tuls
      </nuxt-link>
      <div class="mt-6 mb-8">
        <new-note-button />
      </div>
      <div class="">
        <p class="font-semibold">
          Recent
        </p>
        <ul class="mt-2">
          <li v-for="note in result" :key="note.id" class="not-last:mb-1 flex items-center min-h-8">
            <nuxt-link :to="`/notes/${note.id}`" class="flex-1 hover:text-primary">
              {{ note.title }}
            </nuxt-link>
            <u-dropdown-menu
              :items="[
                { label: 'Delete', icon: 'iconamoon:trash-duotone' },
              ]"
              :content="{
                align: 'start',
                side: 'bottom',
                sideOffset: 8,
              }"
            >
              <u-button
                size="sm"
                icon="iconamoon:menu-kebab-vertical-duotone"
                color="neutral"
                variant="ghost"
              />
            </u-dropdown-menu>
          </li>
        </ul>
      </div>
    </aside>
    <div class="flex-1 ml-[264px]">
      <header class="p-2 flex justify-between  sticky top-0">
        <model-picker />
        <div>
          <color-mode-button />
          <u-button
            to="/settings"
            icon="iconamoon:settings-duotone"
            color="neutral"
            variant="ghost"
          />
        </div>
      </header>
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

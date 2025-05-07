<script setup lang="ts">
import type { Note } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { notes } from '~/db/schema'

const route = useRoute()

const id = route.params.id as string

const { execute: selectNote, result: note } = useDB(db => (id: string) => db
  .query
  .notes
  .findFirst({ where: eq(notes.id, id) }),
)

await selectNote(id)

const { execute: updateContent } = useDB(db => (payload: { id: string, values: Omit<Note, 'id'> }) => db
  .update(notes)
  .set(payload.values)
  .where(eq(notes.id, payload.id)),
)

async function handleUpdateContent({ html, json }: { html: string, json: string }) {
  await updateContent({
    id,
    values: {
      contentHTML: html,
      contentJSON: json,
    },
  })
}

async function handleUpdateTitle(title: string) {
  await updateContent({
    id,
    values: {
      title,
    },
  })
}
</script>

<template>
  <div class="max-w-2xl mx-auto min-h-screen">
    <note-editor
      v-if="note?.id"
      :key="note.id"
      :title="note?.title || ''"
      :content="note?.contentHTML || ''"
      @update-content="handleUpdateContent"
      @update-title="handleUpdateTitle"
    />
  </div>
</template>

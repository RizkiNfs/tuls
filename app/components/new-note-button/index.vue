<script setup lang="ts">
import { notes } from '~/db/schema'

const router = useRouter()

const { execute: insertNote } = useDB((id: string, db) => db.insert(notes).values({
  id,
  title: 'Untitled note',
  contentHTML: '',
  contentJSON: '',
}))

async function createNote() {
  const id = crypto.randomUUID()
  await insertNote(id)
  router.push(`/notes/${id}`)
}
</script>

<template>
  <u-button
    block
    variant="outline"
    icon="iconamoon:sign-plus-duotone"
    @click="createNote"
  >
    New Note
  </u-button>
</template>

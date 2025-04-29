<script setup lang="ts">
const router = useRouter()
const pg = usePGlite()
async function createNote() {
  const id = crypto.randomUUID()
  await pg.query(
    `INSERT INTO notes (id, title, content_json, content_html) VALUES ($1,$2,$3,$4);`,
    [id, 'Untitled note', '', ''],
  )
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

<script setup lang="ts">
const route = useRoute()
const pg = usePGlite()

interface Note {
  id: string
  title: string
  content_html: string
  content_json: string
}

const [note] = (await pg.query<Note>(`SELECT * FROM notes WHERE id=$1`, [route.params.id])).rows

function handleUpdateContent({ html, json }: { html: string, json: string }) {
  pg.query(
    `UPDATE notes SET content_html=$2, content_json=$3 WHERE id = $1;`,
    [note?.id, html, json],
  )
}

function handleUpdateTitle(title: string) {
  pg.query(
    `UPDATE notes SET title=$2 WHERE id = $1;`,
    [note?.id, title],
  )
}
</script>

<template>
  <div class="max-w-2xl mx-auto min-h-screen">
    <note-editor
      v-if="note?.id"
      :key="note.id"
      :title="note?.title"
      :content="note?.content_html"
      @update-content="handleUpdateContent"
      @update-title="handleUpdateTitle"
    />
  </div>
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import {
  EditorContent,
  useEditor,
} from '@tiptap/vue-3'

const editor = useEditor({
  extensions: [
    StarterKit,
  ],
  content: `
    <p>
      Try to select <em>this text</em> to see what we call the bubble menu.
    </p>
    <p>
      Neat, isn’t it? Add an empty paragraph to see the floating menu.
    </p>
  `,
})
</script>

<template>
  <EditorContent :editor="editor" />
</template>

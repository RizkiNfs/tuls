<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import {
  Editor,
  EditorContent,
} from '@tiptap/vue-3'
import { BubbleMenu, FloatingMenu } from '@tiptap/vue-3/menus'

const { content = '', title: titleProps = '' } = defineProps<{
  content?: string
  title?: string
}>()

const emit = defineEmits<{
  updateContent: [{ html: string, json: string }]
  updateTitle: [string]
}>()

const title = ref(titleProps)

const editor = shallowRef(new Editor({
  extensions: [
    StarterKit,
  ],
  content,
}))

const handleUpdateContent = useDebounceFn(() => {
  emit('updateContent', { html: editor.value.getHTML(), json: JSON.stringify(editor.value.getJSON()) })
}, 1_000)

function handleUpdateTitle() {
  emit('updateTitle', title.value || 'Untitled Note')
}

editor.value.on('update', handleUpdateContent)

onUnmounted(() => {
  editor.value?.destroy()
})
</script>

<template>
  <u-input
    v-model="title"
    class="mb-6 w-full"
    size="xl"
    placeholder="Title"
    @blur="handleUpdateTitle"
  />
  <div v-if="editor">
    <BubbleMenu
      :editor="editor"
    >
      <u-card class="flex items-center gap-2" :ui="{ body: 'sm:p-2 p-2', root: 'p-2' }">
        <u-button
          variant="ghost"
          icon="iconamoon:comment-dots-duotone"
        >
          Ask AI
        </u-button>
        <u-button
          :variant="editor?.isActive('bold') ? 'soft' : 'ghost'"
          icon="hugeicons:text-bold"
          color="neutral"
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
        />
        <u-button
          :variant="editor?.isActive('italic') ? 'soft' : 'ghost'"
          icon="hugeicons:text-italic"
          color="neutral"
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
        />
        <u-button
          :variant="editor?.isActive('strike') ? 'soft' : 'ghost'"
          icon="hugeicons:text-strikethrough"
          color="neutral"
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
        />
      </u-card>
    </BubbleMenu>

    <FloatingMenu
      :editor="editor"
    >
      <div class="flex items-center gap-2 p-2">
        <u-button
          variant="ghost"
          icon="iconamoon:comment-dots-duotone"
        >
          Ask AI
        </u-button>
        <u-button
          icon="hugeicons:heading-02"
          variant="ghost"
          color="neutral"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />
        <u-button
          icon="hugeicons:heading-03"
          variant="ghost"
          color="neutral"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
        <u-button
          icon="hugeicons:left-to-right-list-bullet"
          variant="ghost"
          color="neutral"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        />
      </div>
    </FloatingMenu>
  </div>
  <EditorContent
    :editor="editor"
    class="editor"
  />
</template>

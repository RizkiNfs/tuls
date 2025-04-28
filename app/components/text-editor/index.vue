<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import {
  EditorContent,
  useEditor,
} from '@tiptap/vue-3'
import { BubbleMenu, FloatingMenu } from '@tiptap/vue-3/menus'

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
  <div v-if="editor">
    <BubbleMenu
      class="bubble-menu"
      :tippy-options="{ duration: 100 }"
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
      class="flex items-center gap-2 p-2"
      :editor="editor"
    >
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
    </FloatingMenu>
  </div>
  <EditorContent class="[&>div]:p-4" :editor="editor" />
</template>

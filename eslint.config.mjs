import antfu, { javascript, node, regexp, test, typescript, vue } from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    vue,
    javascript,
    typescript,
    regexp,
    node,
    test,
  }),
)

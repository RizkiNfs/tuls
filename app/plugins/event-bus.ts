import mitt from 'mitt'

const eventBus = mitt<Record<EventType, unknown>>()

export default defineNuxtPlugin(() => {
  return {
    provide: {
      eventBus,
    },
  }
})

export type EventType = 'db:table:modelProviders'
  | 'db:table:models'
  | 'db:table:notes'
  | 'db:insert:notes'
  | 'db:update:notes'

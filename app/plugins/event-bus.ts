import mitt from 'mitt'

type EventType = string

const eventBus = mitt<Record<EventType, unknown>>()

export default defineNuxtPlugin(() => {
  return {
    provide: {
      eventBus,
    },
  }
})

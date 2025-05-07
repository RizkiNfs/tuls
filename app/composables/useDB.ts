import type { PgliteDatabase } from 'drizzle-orm/pglite'
import type { ShallowRef } from 'vue'
import type { ModelProvider, Schema } from '~/db/schema'
import type { EventType } from '~/plugins/event-bus'
import { modelProviders } from '~/db/schema'

interface Options {
  subscribe?: EventType[]
  publish?: EventType[]
}

function useSubscribe(refresh: () => void, options: Options) {
  const { $eventBus } = useNuxtApp()

  if (options?.subscribe?.length) {
    for (const eventType of options.subscribe) {
      $eventBus.on(eventType, refresh)
    }
  }

  onUnmounted(() => {
    if (options?.subscribe?.length) {
      for (const eventType of options.subscribe) {
        $eventBus.off(eventType, refresh)
      }
    }
  })
}

function usePublish(options: Options) {
  const { $eventBus } = useNuxtApp()

  function publish() {
    if (options?.publish?.length) {
      for (const eventType of options.publish) {
        $eventBus.emit(eventType)
      }
    }
  }

  return publish
}

export function useDB<Result>(action: (db: PgliteDatabase<Schema>) => () => Promise<Result>, options?: Options): { result: ShallowRef<Result>, execute: () => Promise<Result> }
export function useDB<Payload, Result>(action: (db: PgliteDatabase<Schema>) => (payload: Payload) => Promise<Result>, options?: Options): { result: ShallowRef<Result>, execute: (payload: Payload) => Promise<Result> }
export function useDB<Payload, Result>(action: (db: PgliteDatabase<Schema>) => (payload?: Payload) => Promise<Result>, options?: Options) {
  const { $db } = useNuxtApp()
  const result = shallowRef<null | Result>(null)
  const latestPayload = shallowRef<any>()

  function refresh() {
    execute(latestPayload.value)
  }

  useSubscribe(refresh, options || {})
  const publish = usePublish(options || {})

  async function execute(): Promise<Result>
  async function execute(payload: Payload): Promise<Result>
  async function execute(payload?: Payload): Promise<Result> {
    latestPayload.value = payload
    const res = await action($db)(payload)
    result.value = res

    publish()

    return res
  }
  return { execute, result }
}

export async function useInsertModelProviders(values: ModelProvider) {
  const { $db } = useNuxtApp()

  await $db
    .insert(modelProviders)
    .values(values)
}

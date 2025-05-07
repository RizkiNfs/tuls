import type { PgliteDatabase } from 'drizzle-orm/pglite'
import type { ShallowRef } from 'vue'
import type { ModelProvider, Schema } from '~/db/schema'
import { modelProviders } from '~/db/schema'

export function useDB<Result>(action: (db: PgliteDatabase<Schema>) => () => Promise<Result>): { result: ShallowRef<Result>, execute: () => Promise<Result> }
export function useDB<Payload, Result>(action: (db: PgliteDatabase<Schema>) => (payload: Payload) => Promise<Result>): { result: ShallowRef<Result>, execute: (payload: Payload) => Promise<Result> }
export function useDB<Payload, Result>(action: (db: PgliteDatabase<Schema>) => (payload?: Payload) => Promise<Result>) {
  const { $db } = useNuxtApp()
  const result = shallowRef<null | Result>(null)

  async function execute(): Promise<Result>
  async function execute(payload: Payload): Promise<Result>
  async function execute(payload?: Payload): Promise<Result> {
    const res = await action($db)(payload)
    result.value = res
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

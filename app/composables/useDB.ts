import type { PgliteDatabase } from 'drizzle-orm/pglite'
import type { ModelProvider, Schema } from '~/db/schema'
import { modelProviders } from '~/db/schema'

export function useDB<Payload, Result>(action: (payload: Payload, db: PgliteDatabase<Schema>) => Promise<Result>) {
  const { $db } = useNuxtApp()
  const result = shallowRef<null | Result>(null)

  const execute = async (payload: Payload): Promise<Result> => {
    const res = await action(payload, $db)
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

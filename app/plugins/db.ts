import type { PgliteDatabase } from 'drizzle-orm/pglite'
import type { Schema } from '../db/schema'
import { drizzle } from 'drizzle-orm/pglite'
import { schema } from '../db/schema'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hookOnce('pglite', async (pg) => {
    const db = drizzle(pg as any, { schema })
    nuxtApp.provide('db', db)

    await pg.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id UUID PRIMARY KEY,
        title VARCHAR(255),
        content_json TEXT,
        content_html TEXT,
        is_archived BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS model_providers (
        id UUID PRIMARY KEY,
        name VARCHAR(255),
        url TEXT,
        api_key TEXT
      );

      CREATE TABLE IF NOT EXISTS models (
        id UUID PRIMARY KEY,
        name VARCHAR(255),
        provider_id UUID
      );
    `)
  })
})

declare module '#app' {
  interface NuxtApp {
    $db: PgliteDatabase<Schema>
  }
}

import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const notes = pgTable('notes', {
  id: uuid().primaryKey(),
  title: varchar({ length: 255 }),
  contentJSON: text('content_json'),
  contentHTML: text('content_html'),
  isArchived: boolean('is_archived'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})
export type Note = typeof notes.$inferInsert

export const modelProviders = pgTable('model_providers', {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }),
  url: text(),
  apiKey: text('api_key'),
})

export const models = pgTable('models', {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }),
  providerId: uuid('provider_id'),
})

export type Model = typeof models.$inferSelect

export const modelProvidersRelation = relations(modelProviders, ({ many }) => ({
  models: many(models),
}))

export const modelsRelations = relations(models, ({ one }) => ({
  provider: one(modelProviders, { fields: [models.providerId], references: [modelProviders.id] }),
}))

export type ModelProvider = typeof modelProviders.$inferInsert

export const schema = {
  notes,
  modelProviders,
  modelProvidersRelation,
  models,
  modelsRelations,
}

export type Schema = typeof schema

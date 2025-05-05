export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hookOnce('pglite', async (pg) => {
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
        name VARCHAR(24),
        url TEXT,
        api_key TEXT
      );
    `)
  })
})

import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema',
  datasource: {
    url: process.env.DATABASE_URL,
  },

  migrations: {
    path: 'prisma/migrations',
    seed:
      process.env.NODE_ENV === 'development'
        ? 'tsx prisma/seeds/admin.seed.ts'
        : undefined,
  },
});
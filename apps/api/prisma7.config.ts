import { existsSync } from 'node:fs';
import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

const envFile = existsSync('.env') ? '.env' : '.env.example';
config({ path: envFile });

export default defineConfig({
  schema: '../../prisma/schema.prisma',
  migrations: {
    path: '../../prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    env: {
      DATABASE_URL:
        'postgresql://postgres:postgres@localhost:5432/luminatech?schema=public',
      PORT: '3000',
    },
  },
});

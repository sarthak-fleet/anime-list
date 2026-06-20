import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineVitestConfig } from '@saas-maker/test-config/vitest';

export default defineVitestConfig({
  environment: 'jsdom',
  setupFiles: ['./vitest.setup.ts'],
  include: [
    'src/**/*.test.{ts,tsx}',
    'components/**/*.test.{ts,tsx}',
    'lib/**/*.test.{ts,tsx}',
  ],
  exclude: ['dist/**', 'e2e/**'],
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
});

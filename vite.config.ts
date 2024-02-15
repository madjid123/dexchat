import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { fileURLToPath } from 'url';

// because __dirname was showing undefined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number.parseInt(process.env.PORT!) || 3000,
  },
  preview: {
    port: Number.parseInt(process.env.PORT!) || 3000,
  },
  plugins: [
    react({
      include: '**/*.tsx',
    }),
    viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
    },
  },
});

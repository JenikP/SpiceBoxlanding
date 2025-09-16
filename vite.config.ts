import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite configuration for the SpiceBox front‑end.  Setting base to "./" ensures
// that the generated asset URLs are relative so that the app will load
// correctly when served from Vercel's static hosting.  We also expose
// convenient module aliases so you can import from '@/...' and '@shared/...'.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/UK-Crime-Map-App/',
  plugins: [react()],
  test: {
    environment: 'jsdom'
  }
})

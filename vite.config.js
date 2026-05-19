import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        cfplDeck: fileURLToPath(new URL('./cfpl-deck.html', import.meta.url)),
        redLotusDeck: fileURLToPath(new URL('./red-lotus-deck.html', import.meta.url)),
        querygenUsecases: fileURLToPath(new URL('./querygen-usecases.html', import.meta.url)),
        pharmaChemDeck: fileURLToPath(new URL('./pharma-chem-deck.html', import.meta.url)),
      },
    },
  },
})

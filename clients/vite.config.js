// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
    build: {
        minify: 'esbuild', // Utilisez l'option 'esbuild' pour minimiser votre code
        sourcemap: false, // Désactivez les sourcemaps pour réduire la taille de votre code
    },
    define: {
        production: '"production"', // Définit la variable d'environnement
    },
});

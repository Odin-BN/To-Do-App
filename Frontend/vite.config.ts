import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration file
// This file configures the Vite development server and plugins for the project.

export default defineConfig({
  plugins: [
    react(), // Enables React support with Vite using the official plugin.
  ],
  server: {
    port: 8080, // Configures the development server to run on port 8080.
  },
});

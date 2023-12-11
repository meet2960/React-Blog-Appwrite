import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'
// import { fileURLToPath } from "url";
import jsconfigPaths from 'vite-jsconfig-paths'
// https://vitejs.dev/config/
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(),jsconfigPaths()],
 
});



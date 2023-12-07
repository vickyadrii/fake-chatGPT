import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE)
  }
})

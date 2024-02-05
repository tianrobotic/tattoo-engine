import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.HOST': JSON.stringify(env.HOST),
      'process.env.BACKEND_HOST': JSON.stringify(env.BACKEND_HOST),
      'process.env.BACKEND_PORT': JSON.stringify(env.BACKEND_PORT)

    },
    plugins: [react()],
  }
})

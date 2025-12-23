import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ 
      include: ['src'],
      exclude: ['src/App.tsx', 'src/main.tsx'],
      insertTypesEntry: true 
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MantineDoubleClickEditable',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@mantine/core',
        '@mantine/hooks'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mantine/core': 'MantineCore',
          '@mantine/hooks': 'MantineHooks'
        }
      }
    }
  }
})

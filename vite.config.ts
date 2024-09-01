import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        format: 'umd', // 使用 UMD 格式，这样会生成一个可直接在浏览器中使用的非模块文件
      }
    }
  }
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/todo/" // 여기서 repository-name을 리포지토리 이름으로 변경
});


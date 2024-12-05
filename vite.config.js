import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig(({ mode }) => {
  const branch = process.env.VITE_BRANCH || 'default'; // .env에서 브랜치 읽기

  console.log(`Current mode: ${mode}`);

  return {
    plugins: [react()],
    base: '/', // 기본 경로 설정
    publicDir: 'public', // public 디렉토리 위치

    build: {
      outDir: `dist-${branch}`, // 브랜치별 빌드 디렉토리
    },

    define: {
      __BRANCH__: JSON.stringify(branch), // 전역 변수로 브랜치 정보 제공
    },

    server: {
      historyApiFallback: true, // 새로고침 시 라우팅 문제 해결
    },
  };
});

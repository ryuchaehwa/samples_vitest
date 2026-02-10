export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,      // expect, describe 등을 전역 사용
    environment: 'jsdom', // 브라우저 환경 모사
    setupFiles: ['./tests/setup.js'], // 테스트 전 실행할 설정
    alias: {
      '@': path.resolve(__dirname, './src'), // 경로 별칭 (@/components 등)
    },
  },
});
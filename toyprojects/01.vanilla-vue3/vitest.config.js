// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()], // Vitest가 .vue 파일을 이해하게 해줍니다.
  test: {
    // Node 환경에서 테스트를 실행 (Vanilla JS API 테스트에 적합)
    globals: true,
    environment: "node",
    // 위에서 만든 setup 파일의 경로를 지정
    setupFiles: ["./vitest.setup.js"],
  },
});

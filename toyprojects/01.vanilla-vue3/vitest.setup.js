// vitest.setup.js
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/mocks/server";

// 1. 모든 테스트 시작 전: MSW 서버 가동
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  // 'error' 설정은 모킹하지 않은 API 호출 시 에러를 내뱉어 실수를 방지합니다.
});

// 2. 각 테스트 종료 후: 핸들러 초기화
afterEach(() => {
  server.resetHandlers();
  // 테스트 하나가 끝날 때마다 설정된 임시 핸들러를 지워 테스트 간 독립성을 유지합니다.
});

// 3. 모든 테스트 종료 후: MSW 서버 종료
afterAll(() => {
  server.close();
});

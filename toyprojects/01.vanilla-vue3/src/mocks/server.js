// src/mocks/server.js
// mock 서버 설정 - axios 모킹 할 땐 네트워크 단이기 때문에 서버는 node 사용
import { setupServer } from "msw/node";
import { handlers } from "./handler"; // 도메인별 핸들러들을 모은 배열

export const server = setupServer(...handlers);

// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers"; // 도메인별 핸들러들을 모은 배열

export const server = setupServer(...handlers);

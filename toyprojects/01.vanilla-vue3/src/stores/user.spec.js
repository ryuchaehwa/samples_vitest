import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../tests/setup"; // 경로에 맞춰 수정
import { useUserStore } from "./user";

describe("User Store TDD (JS Version)", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("성공적으로 데이터를 가져오면 users 배열을 채운다", async () => {
    const userStore = useUserStore();

    await userStore.fetchUsers();

    expect(userStore.users).toHaveLength(2);
    expect(userStore.users[0].name).toBe("김철수");
  });

  it("데이터가 없을 때(Empty)를 처리해야 한다", async () => {
    // 런타임에 빈 배열 응답으로 덮어쓰기
    server.use(
      http.get("/api/users", () => {
        return HttpResponse.json([]);
      }),
    );

    const userStore = useUserStore();
    await userStore.fetchUsers();

    expect(userStore.users).toEqual([]);
    expect(userStore.errorMessage).toBe("");
  });

  it("404 에러 발생 시 에러 메시지를 세팅한다", async () => {
    server.use(
      http.get("/api/users", () => {
        return new HttpResponse(null, { status: 404 });
      }),
    );

    const userStore = useUserStore();
    await userStore.fetchUsers();

    expect(userStore.users).toEqual([]);
    expect(userStore.errorMessage).toBe("사용자를 찾을 수 없습니다.");
  });
});

// import { setActivePinia, createPinia } from "pinia";
// import { describe, it, expect, beforeEach } from "vitest";
// import { useUserStore } from "./user";

// describe("User Store Getters TDD", () => {
//   beforeEach(() => {
//     setActivePinia(createPinia());
//   });

//   it("adminUsers는 role이 admin인 사용자만 반환해야 한다", () => {
//     const userStore = useUserStore();

//     // 1. 테스트를 위한 데이터 세팅 (State에 직접 주입)
//     // Getters 테스트할 때는 굳이 API를 호출(Action 실행)하지 않아도 돼.
//     // 상태값만 바꿔놓고 계산이 잘 되는지 보면 되니까!
//     userStore.users = [
//       { id: 1, name: "관리자1", role: "admin" },
//       { id: 2, name: "일반인1", role: "user" },
//       { id: 3, name: "관리자2", role: "admin" },
//     ];

//     // 2. Assert: 결과 확인
//     const admins = userStore.adminUsers;

//     expect(admins).toHaveLength(2); // 2명이어야 함
//     expect(admins.every((u) => u.role === "admin")).toBe(true); // 모두 admin이어야 함
//     expect(admins[0].name).toBe("관리자1");
//   });
// })

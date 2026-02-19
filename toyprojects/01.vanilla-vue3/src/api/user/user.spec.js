import { describe, it, expect } from "vitest";
import { userRepository } from "./user.repo";

describe("User Repository TDD", () => {
  it("getUsers 호출 시 MSW가 제공한 데이터를 받아야 한다", async () => {
    // 1. 실행: 실제 외부 API를 쏘는 것 같지만 MSW가 가로챔
    const users = await userRepository.getUsers();

    // 2. 검증: 데이터가 배열인지 확인
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it("데이터 수신 후 Transformer가 정상 작동하여 정제된 데이터를 반환해야 한다", async () => {
    const users = await userRepository.getUsers();
    const firstUser = users[0];

    // 3. 검증: Transformer를 거쳐서 우리가 약속한 필드(id, name)가 있는지 확인
    // 서버 데이터는 userName인데, 만약 우리가 name으로 바꾸기로 했다면 그게 있는지 확인
    expect(firstUser).toHaveProperty("id");
    expect(firstUser).toHaveProperty("name");
    expect(firstUser).toHaveProperty("email");

    // 검증값이 undefined일 때 체크
    // expect(firstUser.address).toBeUndefined();   # 현재 세팅해둔 값인 경우 에러 리턴

    // 검증값의 타입과는 관련없이 데이터 자체만 넘어올 때 체크
    expect(firstUser.address).toEqual(expect.any(String)); // String, Number 처럼 특정 타입인 경우에 허용
    // expect(firstUser.address).toEqual(expect.anything()); // null이나 undefined가 아닌 모든 값 허용
  });
});

describe("User Repository TDD", () => {
  it("사용자가 선택한 user id가 서버로 전달되어야 한다", async () => {
    const user = await userRepository.getUserById(1);

    // return 결과값이 Object 타입임을 체크
    expect(user).toEqual(expect.any(Object));

    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.name).toBe("Axios Mocking Test");
  });
});

// it("401 에러 시 null을 반환하고 로그아웃 로직을 실행해야 한다", async () => {
//   // 1. 401 에러 강제 발생 설정
//   server.use(
//     http.get("", () => {
//       return new HttpResponse(null, { status: 401 });
//     }),
//   );

//   // 2. 실행
//   const user = await userRepository.getUserById(1);

//   // 3. 검증
//   expect(user).toBeNull(); // 에러 시 null 반환 설계인 경우
// });

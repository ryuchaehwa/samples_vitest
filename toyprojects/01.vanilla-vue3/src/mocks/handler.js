import { http, HttpResponse } from "msw";

export const handlers = [
  // JSONPlaceholder로 가는 요청을 가로채기
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Axios Mocking Test", // 실제 서버 데이터 형식
        email: "mocking@axios.test",
        address: { city: "Uiwang" },
      },
    ]);
  }),

  // 단일 건 조회 및 파라미터 관련 테스트
  http.get("https://jsonplaceholder.typicode.com/users/:id", ({ params }) => {
    console.log("params", params);
    return HttpResponse.json({
      id: Number(params.id),
      name: "Axios Mocking Test", // 실제 서버 데이터 형식
      email: "mocking@axios.test",
      address: { city: "Uiwang" },
    });
  }),
];

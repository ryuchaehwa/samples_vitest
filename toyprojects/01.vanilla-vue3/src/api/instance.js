// src / api / instance.js
import axios from "axios";

// NOTE
// 해당 예제는 네트워크 개발 방법 중 첫번째, 인스턴스 개발 방법.
// 비지니스 로직에 맞는 개발 방법을 선택하여 사용하면 됨.
// axios 패턴와의 네트워크 개발방법은 `TDD를 위한 axios 패턴화 중 비지니스 로직 별 네트워크 개발 방법`에 작성해둠

// Base URL로 기본 설정만 때
const instance = axios.create({ baseURL: "/api" });

// 헤더 및 추가 파라미터 넘길 때
// const instance = axios.create({
//   baseURL: "https://api.example.com", // 실제 서버 주소 (MSW가 이 주소를 가로챕니다)
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// 입구에서 자동으로 토큰 주입(필요시 비지니스 로직 구현 위치)
// instance.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });

// 출구에서 자동으로 에러 감치(필요시 비지니스 로직 구현 위치)
// instance.interceptors.response.use(res => res, error => {
//   if (error.response.status === 401) goToLogin();
//   return Promise.reject(error);
// });

// 비지니스 로직 없는 기본 코드
instance.interceptors.response.use(
  (response) => {
    console.log("2단계: axios 인터셉터");
    // // 200번대 성공 응답이면 데이터 내용물(response)을 그대로 통과
    return response;
  },
  (error) => {
    // 공통에러처리 로직 구현 부분 400, 401, 500 등
    console.log("2단계 에러: axios 인터셉터");
    if (error.response?.status === 400) {
      // 여기서 커스텀 에러로 변환하거나 전역 알림을 띄울 수 있습니다.
      return Promise.reject(new Error("400_interceptor"));
    }
    return Promise.reject(error);
  },
);

export default instance;

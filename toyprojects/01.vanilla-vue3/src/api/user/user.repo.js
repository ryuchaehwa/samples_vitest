// src/modules/api/user/user.repo.js

// NOTE
// repo 사용 목적: 데이터 캡슐화
// 컴포넌트에서 바로 가져다 사용할 수 있는 함수 제공위치(getUsers())
// Axios와 Transformer의 중간 다리역할
// TDD 진행 시 개별 시뮬레이터로 활용 가능(의존성 낮음)

import instance from "../instance.js";
import { transformUserList, transformUser } from "./user.trans";

export const userRepository = {
  // 1. 목록 조회 (배열 변환기 사용)
  async getUsers() {
    try {
      console.log("1단계: Repository에서 API 호출");
      //  const { data } = await instance.get(
      //    "https://jsonplaceholder.typicode.com/users",
      //  );
      const response = await instance.get(
        "https://jsonplaceholder.typicode.com/users",
      );

      // console.log("3단계: Transformer에게 데이터 전달", data);

      // return transformUserList(data);
      return response;
    } catch (e) {
      console.log("2/3단계 에러", e);
      errorHandling(e.response?.status);
      throw e;
    }
  },

  // 2. 단일 조회 (단일 변환기 직접 사용) - user api 함수 추가 작성
  async getUserById(id) {
    try {
      console.log("1단계: 요청 시작 - ID:", id);
      const { data } = await instance.get(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      console.log("2단계: 응답 성공", data); // 여기가 안 찍히면 MSW가 못 잡은 것
      return transformUser(data);
    } catch (e) {
      // 5000ms 타임아웃이 나기 전, 여기서 에러 메시지가 찍히는지 보세요.
      console.error("🚨 에러 상세 내용:", e.message);
      console.error("🚨 에러 코드:", e.code); // 'ECONNABORTED'면 진짜 타임아웃

      errorHandling(e.response?.status);
      throw e;
    }
  },
};

const errorHandling = (status) => {
  if (status === 500) {
    throw new Error("SERVER_EXPLODED");
  }

  // if (status === 401) {
  //   console.error("인증이 만료되었습니다. 다시 로그인해주세요.");
  //   // 필요 시 여기서 로그아웃 처리 등을 수행
  // } else if (status === 400) {
  //   console.error("잘못된 요청입니다.");
  // }
};

// src/modules/api/user/user.repo.js

// NOTE
// repo 사용 목적: 데이터 캡슐화
// 컴포넌트에서 바로 가져다 사용할 수 있는 함수 제공위치(getUsers())
// Axios와 Transformer의 중간 다리역할
// TDD 진행 시 개별 시뮬레이터로 활용 가능(의존성 낮음)

import instance from "../instance.js";
import { transformUserList } from "./user.trans";

export const userRepository = {
  // 1. 목록 조회 (배열 변환기 사용)
  async getUsers() {
    try {
      console.log("1단계: Repository에서 API 호출");
      const { data } = await instance.get(
        "https://jsonplaceholder.typicode.com/users",
      );

      console.log("3단계: Transformer에게 데이터 전달", data);

      return transformUserList(data);
    } catch (e) {
      console.log("2/3단계 에러", e);
    }
  },

  // 2. 단일 조회 (단일 변환기 직접 사용) - user api 함수 추가 작성
  //   async getUserById(id) {
  //     const { data } = await instance.get(`/users/${id}`);
  //     return transformUser(data);
  //   },
};



<template>
<div class="views-main">
    <h1>Axios 코드</h1>
    <div class="code-box">
            <pre>
        <code>
// src / api / instance.js

import axios from "axios";

const instance = axios.create({ baseURL: "/api" });

instance.interceptors.response.use(
  (response) => {
    console.log("2단계: axios 인터셉터");
    return response;
  },
  (error) => {
    console.log("2단계 에러: axios 인터셉터");
    if (error.response?.status === 400) {
      return Promise.reject(new Error("400_interceptor"));
    }
    return Promise.reject(error);
  },
);

export default instance;

        </code>

    </pre>
    <pre>
        <code>
// src/modules/api/user/user.repo.js

import instance from "../instance.js";
import { transformUserList, transformUser } from "./user.trans";

export const userRepository = {
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
      errorHandling(e.response?.status);
      throw e;
    }
  },

  async getUserById(id) {
    try {
      console.log("1단계: 요청 시작 - ID:", id);
      const { data } = await instance.get(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      console.log("2단계: 응답 성공", data);
      return transformUser(data);
    } catch (e) {
      console.error("🚨 에러 상세 내용:", e.message);
      console.error("🚨 에러 코드:", e.code);

      errorHandling(e.response?.status);
      throw e;
    }
  },
};

const errorHandling = (status) => {
  if (status === 500) {
    throw new Error("SERVER_EXPLODED");
  }
};

        </code>
    </pre>

    <pre>
        <code>
// src/modules/api/user/user.trans.js

export const transformUser = (raw) => {
  if (!raw) return null;
  console.log("4단계: Transformer 로직 수행 - 단일 사용자일 경");
  return formatUserInfo(raw);
};

export const transformUserList = (rawList) => {
  if (!Array.isArray(rawList)) return [];
  console.log("4단계: Transformer 로직 수행 - 목록일 경우");
  return rawList.map((raw) => formatUserInfo(raw));
};

const formatUserInfo = (data) => {
  let user = {
    id: data.id,
    name: data.name,
    email: data.email,
    address:
      data.address.street +
      " " +
      data.address.suite +
      " " +
      data.address.city +
      " " +
      data.address.zipcode,
  };

  return user;
};
        </code>
    </pre>
   </div>

   <h1>MSW 코드</h1>
   <div class="code-box">
    <div>
    <pre style="margin: 0 0 20px 0 ">
        <code>
// vitest.setup.js
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

        </code>
    </pre>


    <pre style="margin: 0 0 20px 0 ">
        <code>
// src/mocks/server.js

import { setupServer } from "msw/node";
import { handlers } from "./handler"; 

export const server = setupServer(...handlers);

        </code>
    </pre>


    <pre>
        <code>
// src/mocks/handler.js
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

        </code>
    </pre>
    </div>

    <pre>
        <code>
// src/api/user/user.spec.js
import { describe, it, expect } from "vitest";
import { userRepository } from "./user.repo";

import { server } from "@/mocks/server.js";
import { http, HttpResponse } from "msw";

describe("User Repository TDD", () => {
  it("서버 500 에러 발생 시 SERVER_EXPLODED 메시지를 던져야 한다", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(userRepository.getUsers()).rejects.toThrow("SERVER_EXPLODED");
  });

  it("서버 400 에러 발생 시 400_interceptor 메시지를 던져야 한다", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users", () => {
        return new HttpResponse(null, { status: 400 });
      }),
    );

    await expect(userRepository.getUsers()).rejects.toThrow("400_interceptor");
  });

  it("getUsers 호출 시 MSW가 제공한 데이터를 받아야 한다", async () => {
    const users = await userRepository.getUsers();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it("데이터 수신 후 Transformer가 정상 작동하여 정제된 데이터를 반환해야 한다", async () => {
    const users = await userRepository.getUsers();
    const firstUser = users[0];

    expect(firstUser).toHaveProperty("id");
    expect(firstUser).toHaveProperty("name");
    expect(firstUser).toHaveProperty("email");

    expect(firstUser.address).toEqual(expect.any(String));
  });
});

describe("User Repository TDD", () => {
  it("사용자가 선택한 user id가 서버로 전달되어야 한다", async () => {
    const user = await userRepository.getUserById(1);

    expect(user).toEqual(expect.any(Object));

    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.name).toBe("Axios Mocking Test");
  });

  it("401 에러 시 null을 반환하고 로그아웃 로직을 실행해야 한다", async () => {

    const userError = await userRepository.getUsers();

  });
});

        </code>
    </pre>
   </div>
</div>
</template>

<script setup>
import "github-markdown-css/github-markdown-light.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
</script>

<style>
.code-box {
display: flex;
justify-content: center;
}

.code-box pre {
    padding: 20px;
background-color: #f4f4f4;
margin: 0 10px;
}

.code-box pre code {

}
</style>
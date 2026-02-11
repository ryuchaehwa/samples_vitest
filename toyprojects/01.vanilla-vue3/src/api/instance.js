// src/api/instance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // 실제 서버 주소 (MSW가 이 주소를 가로챕니다)
  headers: {
    "Content-Type": "application/json",
  },
});

// 인터셉터 설정 (나중에 TDD로 하나씩 채워갈 부분입니다)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;

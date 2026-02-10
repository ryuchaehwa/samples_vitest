`div에 타이핑 귀찮아서 그냥 .md로 작성`

# 🎶 Axios 모킹 시나리오

## 1. MSW를 이용한 네트워크 모킹

### ⁉️ MSW 모킹

- API 요청을 보내면 MSW가 이를 중간에서 가로채 대신 response

### 📍 방법

1. axios 코드는 그대로
2. MSW 핸들러로 중간에서 가로채 다시 보낼 response값 설정

### 🛠️ 설정

1. `src/mocks/handlers.js` 파일 생성
2. 해당 파일에 모킹 코드 추가
3. 함수(혹은 프로젝트) 실행 후 response 확인

### 🌈 레퍼런스

- [MSW 공홈](https://mswjs.io/docs/quick-start/)

### 😎 Axios 설계 패턴에 따른 모킹 방법 및 활용

**방법 A. API 인스턴스화**

1. axios 인스턴스 파일 생성
   - ` 업데이트 예정`

**방법 B. 인터셉터 레이어화**

**방법 C. 레포 패턴화**

**방법 D. Vue3의 Composition과 Hook을 활용한 상태관리화**

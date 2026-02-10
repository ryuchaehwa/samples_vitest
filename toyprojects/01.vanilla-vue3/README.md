# 01.vanilla-vue3

## ✅ Basics
```bash
# 프로젝트 설치 시
## 1. Project Setup
> vue create 폴더명

## 2. Project Setup
> 개인이 원하는 설치 환경값(vanilla, ts, vite 등) 선택 후 엔터키를 눌러 설치 완료하기

# git clone 시
## 1. Project Setup
> yarn install

## 2. Compiles and hot-reloads for development
> yarn serve

## 3. Compiles and minifiles for production
> yarn build

## 4. Lints and fixes files
> yarn link
```

## 목적
* ```vue-cli```를 사용하여 가장 기본 세팅이 된 Webpack기반 프로젝트 일 때 TDD 구축을 통하여 전반적인 흐름에 대한 스터디 및 기술 습득


## 🌼 Installed Ones
* Vitest의 TDD는 테스트 대상이 라이브러리와 플러그인에서 다르기 때문에 라이브러리와 플러그인을 구분하여 작성
* 구분기준: ```app.use()```로 시스템에 등록해야 할 때
* Vite 기반의 프로젝트를 구축하여 Vitest를 사용하는것은 크게 연관성이 없기에 바닐라로 먼저 테스트(전반적인 흐름에 대한 스터디 및 기술 습득)
* Vitest는 Vites의 설정 엔진만 빌려쓰는 테스트 러너
* 번들 툴은 vite 말고도 많음


### 🔗 라이브러리득
|라이브러리명|버전|설명|공홈|비고|
|---|---|---|---|---|
|axios|^1.13.5|API 통신|https://axios-http.com||

### 🔗 플러그인
|라이브러리명|버전|설명|공홈|비고|
|---|---|---|---|---|
|vue-router|^4.6.4|라우팅|https://router.vuejs.org||
|pinia|^3.0.4|전역 데이터 관리|https://pinia.vuejs.kr||

## 😎 TDD Infra
### 🔗 Default
|구분|도구|버전|설명|공홈|비고|
|---|---|---|---|---|---|
|AI어시스턴트/에이전트|Claude Code(CC)||어시스턴트|https://code.claude.com/docs/en/overview||
|테스트 러너(runner)|Vitest||프론트 테스트 프레임워크 테스트 러너|https://vitest.dev|
|모킹 라이브러리|Mock Service Worker(MSW)||모킹용|https://mswjs.io|

### 🔗 Others
* 업데이트 중

|구분|도구|버전|설명|공홈|비고|
|---|---|---|---|---|---|
|UI 테스트 러너|storybook||UI 테스트 전용|https://storybook.js.org||
||||||

### 📍 구축 방법 및 항목별 핵심
* 환경구축
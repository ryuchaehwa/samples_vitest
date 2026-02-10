# git clone 으로 전체 코드 받아서 확인할 때

## extension 추가해서 쉽게 체크 가능해요.

1. extension: Comment Anchors(Starlane Studios)
   - 설치하시면 왼쪽 메뉴 가장 하단에 앵커 아이콘 나와요. 그거 누르시면 앵커 위치로 코드바로 확인 가능해요.
   - workspace anchors에 리스트 안나오면 setting.json 수정하시면 되요.
   ```json
     "commentAnchors.tags.anchors": {
    "AXIOS": {
      "iconColor": "default",
      "highlightColor": "#A8C023",
      "scope": "workspace",         # <- 여기 scope을 file이나 다른 값에서 workspace로 변경하면됩니다.
    },
    }
   ```
1. extension: TODO Highlight(Wayou Liu)
   ```json
   # setting.json 파일에 복붙하시거나, 본인이 원하시는대로 세팅하시면 되요. 아래는 샘플 코드입니다.
       "todohighlight.keywords": [
           {
               "text": "BEFORE_TDD:",
               "color": "#000",
               "backgroundColor": "#ffbd2e",
               "isWholeLine": false
           },
           {
               "text": "AXIOS_CASE_A:",
               "color": "#000",
               "backgroundColor": "#ff6b6b",
               "overviewRulerColor": "#ff6b6b"
           }
   ]
   ```

# Sample Vitest Tody Porjects

- Vue3 + Vitest = TDD를 스터디 및 습득을 위한 토이 프로젝트
- 작성 중

## 🗂️ 토이프로젝트 폴더 및 프로젝트 요약

| 프로젝트명          | 주요환경              | 테스트 항목                    | 설정                                                                                                | 비고 |
| ------------------- | --------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- | ---- |
| 01.vanilla-vue3     | vue3 + vanillajs      | 가능한 전체                    | 바닐라 프로젝트이기 때문에 기초 설정을 스터디하는 프로젝트                                          |      |
| 02.vitevue3-vanilla | vite + vue3 + vanilla | 가능한 전체                    | vite를 활용한 프로젝트이기 때문에 vite기반의 기초 설정을 스터디하는 프로젝트                        |      |
| 03.vitevue3-ts      | vite + vue3 + ts      | ts를 활용하는 데이터 부분 중점 | 위 2번 프로젝트에서 vite 기반을 전부 진행할 예정이기 때문에, ts와 특화된 부분만 스터디하는 프로젝트 |      |

## 🌞 TDD Infra

### 01 ~ 03번 프로젝트의 기본 인프라 세팅

| 테스트 유형     | 대상                | 커버리지 목표 | 도구                |
| --------------- | ------------------- | ------------- | ------------------- |
| 단위 테스트     | 순수 함수, 유틸리티 | 90%           | Vitest              |
| 컴포넌트 테스트 | Vue 컴포넌트        | 80%           | @vue/test-utils     |
| 스토어 테스트   | Pinia 스토어        | 85%           | Vitest + Pinia      |
| 라우터 테스트   | 네비게이션 가드     | 80%           | Vitest + Vue Router |
| API 테스트      | Axios 호출          | 80%           | Vitest + MSW        |

### 추가 가능한 TDD 옵션 스택

- 추가 예정
- 인프라별 프로젝트 추가예정

## 📝 프로젝트별 상세 설명

## 01. vanilla-vue3

- ts를 사용하지 않은 바닐라 버전

---

## Checklist

- 추가 예정

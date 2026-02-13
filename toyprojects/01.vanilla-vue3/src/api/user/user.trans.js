// src/modules/api/user/user.trans.js
// 서버에서 들어온 데이터 변환
// 단테 혹은 데이터와 관련된 테스팅을 진행해야 할 때 중심적으로 활용되는 부분
// 유지보수성 향상
// return 일 때 맵핑 오브젝트는 함수화해서 처리 가능. 하단 예제 코드는 기본 코드
// fakeApi Sample Response:
/**
 *  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    }
 */

/**
 * 단일 사용자 객체 변환
 */
export const transformUser = (raw) => {
  if (!raw) return null;
  console.log("4단계: Transformer 로직 수행 - 단일 사용자일 경");
  return {
    id: raw.id,
    name: raw.username,
    email: raw.email,
    address:
      raw.address.street +
      " " +
      raw.address.suite +
      " " +
      raw.address.city +
      " " +
      raw.address.zipcode,
  };
};

/**
 * 사용자 목록 배열 변환
 */
export const transformUserList = (rawList) => {
  if (!Array.isArray(rawList)) return [];
  console.log("4단계: Transformer 로직 수행 - 목록일 경우");
  return rawList.map((raw) => ({
    id: raw.id,
    name: raw.username,
    email: raw.email,
    address:
      raw.address.street +
      " " +
      raw.address.suite +
      " " +
      raw.address.city +
      " " +
      raw.address.zipcode,
  }));
};

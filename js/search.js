import { searchtList } from "./data.js";

const form = document.getElementById("js-searchForm");
const input = document.getElementById("js-searchInput");
const message = document.querySelector(".message");

const onSubmit = (event) => {
  event.preventDefault();
  const value = input.value;

  if (value !== "") {
    // 검색 리스트에서 검색어 찾기
    const index = searchtList.indexOf(value);
    // 검색 결과가 없으면 메시지 표시
    if (index === -1) {
      message.classList.remove("none");
    } else {
      input.value = ""; // 검색어 초기화
      // 검색 결과 가져오기
    }
  }
};

form.addEventListener("submit", onSubmit);

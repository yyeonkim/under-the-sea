import { fetchData } from "./api.js";
import { searchtList } from "./data.js";
import { hide, setData, setStyle, show } from "./util.js";

const searchPage = document.getElementById("js-search");
const form = document.getElementById("js-searchForm");
const input = document.getElementById("js-searchInput");
const message = document.getElementById("js-searchMessage");
const resultPage = document.getElementById("js-result");

const onSubmit = (event) => {
  event.preventDefault();
  const value = input.value;

  if (value !== "") {
    // 검색 리스트에서 검색어 찾기
    const index = searchtList.indexOf(value);
    if (index === -1) {
      // 검색 결과가 없으면 메시지 표시
      show(message);
    } else {
      // 검색 결과 있으면 메시지 숨기기
      hide(message);
      input.value = ""; // 검색어 초기화
      // 검색 결과 가져오기
      const response = fetchData(index);

      if (response.message === "success") {
        // 해양 정보 설정하기
        const data = response.data;
        setData(data);
        // 스타일 설정하기
        setStyle(data);
        // 화면 바꾸기 (검색 화면 --> 결과 화면)
        searchPage.style.display = "none";
        resultPage.style.display = "flex";
      }
    }
  }
};

form.addEventListener("submit", onSubmit);

import { fetchData } from "./api.js";
import { searchtList } from "./data.js";
import { hide, show } from "./util.js";

const searchPage = document.getElementById("js-search");
const form = document.getElementById("js-searchForm");
const input = document.getElementById("js-searchInput");
const message = document.getElementById("js-searchMessage");
const resultPage = document.getElementById("js-result");
const ocean = document.getElementById("js-ocean");
const quality = document.getElementById("js-quality");
const temperature = document.getElementById("js-temperature");
const salt = document.getElementById("js-salt");

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
        const data = response.data;
        ocean.textContent = data["조사정점"];
        quality.textContent = data["수질지수"];
        temperature.textContent = `${Math.round(Number(data["수온"]))}℃`;
        salt.textContent = `${Math.round(Number(data["염분"]))}%`;
        // 화면 바꾸기
        searchPage.style.display = "none";
        resultPage.style.display = "flex";
      }
    }
  }
};

form.addEventListener("submit", onSubmit);

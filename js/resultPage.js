import { setStyle } from "./animation.js";
import { fetchData } from "./api.js";
import { searchtList } from "./data.js";
import { hide, setData, show } from "./util.js";

const searchPage = document.getElementById("js-search");
const resultPage = document.getElementById("js-result");
const form = document.getElementById("js-resultForm");
const input = document.getElementById("js-resultInput");
const message = document.getElementById("js-resultMessage");
const chevron = document.getElementById("js-chevron");

const onSubmit = (event) => {
  event.preventDefault();
  const value = input.value;

  if (value !== "") {
    // 검색 리스트에서 검색어 찾기
    const index = searchtList.indexOf(value);
    // 검색 결과가 없으면 메시지 표시
    if (index === -1) {
      show(message);
    } else {
      hide(message);
      input.value = ""; // 검색어 초기화
      // 검색 결과 가져오기
      const response = fetchData(index);

      if (response.message === "success") {
        const data = response.data;
        setData(data);
        setStyle(data);
      }
    }
  }
};

const onClick = () => {
  resultPage.style.animation = "fadeOut 0.5s ease-out forwards";
  searchPage.style.animation = "fadeIn 0.5s ease-out 0.5s forwards";
};

form.addEventListener("submit", onSubmit);
chevron.addEventListener("click", onClick);

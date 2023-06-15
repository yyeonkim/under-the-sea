// 해양 수치와 파도 색 범위
const range = {
  temp: { min: 4, max: 18 },
  quality: { min: 20, max: 64 },
  salt: { min: 28, max: 35 },
  r1: { min: 0, max: 22 },
  r2: { min: 0, max: 115 },
  g1: { min: 86, max: 176 },
  g2: { min: 178, max: 255 },
  b1: { min: 155, max: 176 },
  b2: { min: 255, max: 230 },
};

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const body = document.querySelector("body");
const ocean = document.getElementById("js-ocean");
const quality = document.getElementById("js-quality");
const temperature = document.getElementById("js-temperature");
const salt = document.getElementById("js-salt");
const wave1 = document.getElementById("js-wave1");
const wave2 = document.getElementById("js-wave2");
const salts = document.getElementById("js-salts");

export const show = (element) => {
  element.classList.remove("none");
};

export const hide = (element) => {
  if (!element.classList.contains("none")) {
    element.classList.add("none");
  }
};

export const setData = (data) => {
  ocean.textContent = data["조사정점"];
  quality.textContent = data["수질지수"];
  temperature.textContent = `${Math.round(Number(data["수온"]))}℃`;
  salt.textContent = `${Math.round(Number(data["염분"]))}%`;
};

export const setStyle = (data) => {
  // 스타일 초기화
  resetStyle();

  const tempValue = Math.round(Number(data["수온"]));
  const saltValue = Math.round(Number(data["염분"]));
  // 배경 설정
  body.style.backgroundColor = `rgb(${2 * tempValue + 92}, ${
    2 * tempValue + 162
  }, ${tempValue + 226})`;

  // 파도 색 설정
  const r1 = mapNumRange({
    num: tempValue,
    fromMin: range.temp.min,
    fromMax: range.temp.max,
    toMin: range.r1.min,
    toMax: range.r1.max,
  });
  const g1 = mapNumRange({
    num: tempValue,
    fromMin: range.temp.min,
    fromMax: range.temp.max,
    toMin: range.g1.min,
    toMax: range.g1.max,
  });
  const b1 = mapNumRange({
    num: tempValue,
    fromMin: range.temp.min,
    fromMax: range.temp.max,
    toMin: range.b1.min,
    toMax: range.b1.max,
  });
  wave1.attributes[2].value = `rgb(${r1}, ${g1}, ${b1})`;
  const r2 = mapNumRange({
    num: tempValue,
    fromMin: range.temp.min,
    fromMax: range.temp.max,
    toMin: range.r2.min,
    toMax: range.r2.max,
  });
  const g2 = mapNumRange({
    num: tempValue,
    fromMin: range.temp.min,
    fromMax: range.temp.max,
    toMin: range.g2.min,
    toMax: range.g2.max,
  });
  const b2 = mapNumRange({
    num: tempValue,
    fromMin: range.temp.min,
    fromMax: range.temp.max,
    toMin: range.b2.min,
    toMax: range.b2.max,
  });
  wave2.attributes[2].value = `rgb(${r2}, ${g2}, ${b2})`;

  // 소금 개수
  const saltNum = mapNumRange({
    num: saltValue,
    fromMin: range.salt.min,
    fromMax: range.salt.max,
    toMin: 10,
    toMax: 30,
  });

  // 소금 추가
  for (let i = 0; i < saltNum; i++) {
    const div = document.createElement("div");
    const size = getRandom(5, 12);
    const duration = getRandom(1, 3);
    div.className = "salt";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.top = `${getRandom(300, windowHeight - 50)}px`;
    div.style.left = `${getRandom(50, windowWidth - 50)}px`;
    div.style.animation = `float ${duration}s ease-in-out 0s infinite;`;
    salts.insertAdjacentElement("afterbegin", div);
    salts.style.opacity = 1;
  }
};

const resetStyle = () => {
  // 소금 없애기
  salts.style.opacity = 0;
  salts.innerHTML = "";
};

const mapNumRange = ({ num, fromMin, fromMax, toMin, toMax }) => {
  return Math.floor(
    ((num - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin
  );
};

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

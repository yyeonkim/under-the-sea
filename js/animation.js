const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// 해양 수치와 파도 색 범위
const range = {
  temp: { min: 4, max: 13 },
  salt: { min: 28, max: 35 },
  r1: { min: 0, max: 22 },
  r2: { min: 0, max: 115 },
  g1: { min: 86, max: 176 },
  g2: { min: 178, max: 255 },
  b1: { min: 155, max: 176 },
  b2: { min: 255, max: 230 },
  top: { min: 300, max: windowHeight - 50 },
};

const body = document.querySelector("body");
// 파도
const wave1 = document.getElementById("js-wave1");
const wave2 = document.getElementById("js-wave2");
// 소금
const salts = document.getElementById("js-salts");
// 해양 생물
const fish1 = document.getElementById("js-fish1");
const fish2 = document.getElementById("js-fish2");
const smallFish2 = document.getElementById("js-smallFish2");
const fish3 = document.getElementById("js-fish3");
const smallFish3 = document.getElementById("js-smallFish3");
const fish4 = document.getElementById("js-fish4");
const turtle = document.getElementById("js-turtle");

export const setStyle = (data) => {
  // 스타일 초기화
  resetStyle();

  const tempValue = Math.round(Number(data["수온"]));
  const saltValue = Math.round(Number(data["염분"]));
  const qualityValue = data["수질지수"];

  // 배경색 설정
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

  // 소금 개수 구하기
  const saltNum = mapNumRange({
    num: saltValue,
    fromMin: range.salt.min,
    fromMax: range.salt.max,
    toMin: 10,
    toMax: 30,
  });

  // saltNum개의 소금 추가
  for (let i = 0; i < saltNum; i++) {
    const div = document.createElement("div");
    const size = getRandom(5, 12);
    const duration = getRandom(1, 3);
    div.className = "salt";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.top = `${getRandom(range.top.min, range.top.max)}px`;
    div.style.left = `${getRandom(50, windowWidth - 50)}px`;
    div.style.animation = `float ${duration}s ease-in-out 0s infinite;`;
    salts.insertAdjacentElement("afterbegin", div);
    salts.style.opacity = 1;
  }

  // 해양 생물 애니메이션 추가
  const easing = "cubic-bezier(0.13, 0.74, 0.9, 0.21)";
  const moveLeft = "moveLeft";
  const moveRight = "moveRight";

  if (qualityValue >= 20) {
    fish1.style.top = `${getRandom(range.top.min, range.top.max)}px`;
    fish1.style.animation = `${moveLeft} 12s ${easing} 2s infinite`;
    smallFish2.style.top = `${getRandom(range.top.min, range.top.max)}px`;
    smallFish2.style.animation = `${moveRight} 10s ${easing} 2s infinite`;
  }
  if (qualityValue >= 25) {
    smallFish3.style.top = `${getRandom(range.top.min, range.top.max)}px`;
    smallFish3.style.animation = `${moveLeft} 11s ${easing} 2s infinite`;
  }
  if (qualityValue >= 30) {
    fish2.style.top = `${getRandom(range.top.min, range.top.max)}px`;
    fish2.style.animation = `${moveRight} 12s ${easing} 2s infinite`;
    fish3.style.top = `${getRandom(range.top.min, range.top.max)}px`;
    fish3.style.animation = `${moveLeft} 13s ${easing} 2s infinite`;
  }
  if (qualityValue >= 35) {
    fish4.style.top = `${getRandom(range.top.min, range.top.max)}px`;
    fish4.style.animation = `${moveRight} 15s ${easing} 3s infinite`;
  }
  if (qualityValue >= 40) {
    turtle.style.top = `${getRandom(range.top.min, range.top.max)}px`;
    turtle.style.animation = `${moveRight} 18s ${easing} 3s infinite`;
  }
};

const resetStyle = () => {
  // 소금 제거
  salts.innerHTML = "";
  // 해양 생물 애니메이션 제거
  fish1.style.animation = "";
  smallFish2.style.animation = "";
  smallFish3.style.animation = "";
  fish2.style.animation = "";
  fish3.style.animation = "";
  fish4.style.animation = "";
  turtle.style.animation = "";
};

/* 
    숫자 범위를 매칭시키는 함수 
    fromMin ~ fromMax 사이의 값 num을 toMin ~ toMax 사이의 값으로 매칭
*/
const mapNumRange = ({ num, fromMin, fromMax, toMin, toMax }) => {
  return Math.floor(
    ((num - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin
  );
};

/* min <= x < max 사이의 값 가져오기 */
const getRandom = (min, max) => {
  // 최댓값은 제외, 최솟값은 포함
  return Math.floor(Math.random() * (max - min)) + min;
};

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

const body = document.querySelector("body");
const ocean = document.getElementById("js-ocean");
const quality = document.getElementById("js-quality");
const temperature = document.getElementById("js-temperature");
const salt = document.getElementById("js-salt");
const wave1 = document.getElementById("js-wave1");
const wave2 = document.getElementById("js-wave2");

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
  const tempValue = Math.round(Number(data["수온"]));
  const saltValue = Math.round(Number(data["염분"]));
  body.style.backgroundColor = `rgb(${2 * tempValue + 92}, ${
    2 * tempValue + 162
  }, ${tempValue + 226})`;
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
};

const mapNumRange = ({ num, fromMin, fromMax, toMin, toMax }) => {
  return Math.floor(
    ((num - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin
  );
};

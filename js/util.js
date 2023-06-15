const ocean = document.getElementById("js-ocean");
const quality = document.getElementById("js-quality");
const temperature = document.getElementById("js-temperature");
const salt = document.getElementById("js-salt");

export const setData = (data) => {
  ocean.textContent = data["조사정점"];
  quality.textContent = data["수질지수"];
  temperature.textContent = `${Math.round(Number(data["수온"]))}℃`;
  salt.textContent = `${Math.round(Number(data["염분"]))}%`;
};

export const show = (element) => {
  element.classList.remove("none");
};

export const hide = (element) => {
  if (!element.classList.contains("none")) {
    element.classList.add("none");
  }
};

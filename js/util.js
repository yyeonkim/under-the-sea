export const show = (element) => {
  element.classList.remove("none");
};

export const hide = (element) => {
  if (!element.classList.contains("none")) {
    element.classList.add("none");
  }
};

const baseUrl =
  "https://api.odcloud.kr/api/3077374/v1/uddi:4d4f74fc-f1a2-48c5-8c31-d44ec84852ec";
const apiKey = "your api key";

const req = new XMLHttpRequest();

export const fetchData = (index) => {
  const page = Math.floor(index / 10) + 1;
  const url = `${baseUrl}?page=${page}&perPage=10&serviceKey=${apiKey}`;
  const resultIndex = index % 10;

  req.open("GET", url, false);
  req.send();

  if (req.status === 200) {
    const res = JSON.parse(req.response);
    return {
      message: "success",
      data: res.data[resultIndex],
    };
  }
  return {
    message: "fail",
  };
};

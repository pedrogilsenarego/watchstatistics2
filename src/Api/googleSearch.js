import axios from "axios";

export const getImages = async (value) => {
  const options = {
    method: "GET",
    url: `https://google-search3.p.rapidapi.com/api/v1/image/q=${value}`,
    headers: {
      "X-User-Agent": "desktop",
      "X-Proxy-Location": "EU",
      "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
      "X-RapidAPI-Key": "500e86fc10msh4ce40aee6c1bea7p160d75jsn70c205194c3f",
    },
  };
  const response = await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return response.data;
};

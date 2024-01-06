import axios from "axios";

const baseUrl = "http://localhost:3001/api/jokes";

const addOneJoke = (joke) => {
  const postHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const request = axios.post(baseUrl, joke, postHeader);
  return request
    .then((response) => {
      return response.data[0];
    })
    .catch((error) => {
      console.log("fail :", error);
    });
};

const getAllJokes = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("fail :", error);
    });
};

const getOneJoke = (id) => {
  const request = axios.get(baseUrl.concat(`/${id}`));
  return request
    .then((response) => {})
    .catch((error) => {
      console.log("fail :", error);
    });
};

const deleteOneJoke = (id) => {
  const request = axios.delete(baseUrl.concat(`/${id}`));
  return request
    .then((response) => {})
    .catch((error) => {
      console.log("fail :", error);
    });
};

export default { addOneJoke, getAllJokes, getOneJoke, deleteOneJoke };

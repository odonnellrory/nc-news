import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-h9q9.onrender.com/api",
});

const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    throw error.response.data;
  } else if (error.request) {
    throw new Error("No response received from server");
  } else {
    throw error;
  }
};

export const getArticles = (page = 1, limit = 10) => {
  return api
    .get("/articles", { params: { p: page, limit } })
    .then(({ data }) => data)
    .catch(handleApiError);
};

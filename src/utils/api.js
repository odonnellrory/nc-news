import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-h9q9.onrender.com/api",
});

const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    throw {
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    throw new Error("No response received from server");
  } else {
    throw error;
  }
};

export const getArticles = (
  page = 1,
  sort_by = "created_at",
  order = "desc",
  topic,
  limit = 10
) => {
  return api
    .get("/articles", { params: { p: page, sort_by, order, topic, limit } })
    .then(({ data }) => data)
    .catch(handleApiError);
};

export const getArticleById = (articleId) => {
  return api
    .get(`/articles/${articleId}`)
    .then(({ data }) => data.article)
    .catch(handleApiError);
};

export const getCommentsByArticleId = (articleId) => {
  return api
    .get(`/articles/${articleId}/comments`)
    .then(({ data }) => data.comments)
    .catch(handleApiError);
};

export const patchArticleVotes = (articleId, increment) => {
  return api
    .patch(`/articles/${articleId}`, { inc_votes: increment })
    .then(({ data }) => data.article)
    .catch(handleApiError);
};

export const postComment = (articleId, username, body) => {
  return api
    .post(`/articles/${articleId}/comments`, { username, body })
    .then(({ data }) => data.comment)
    .catch(handleApiError);
};

export const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`).catch(handleApiError);
};

export const getUsers = () => {
  return api
    .get("/users")
    .then(({ data }) => data.users)
    .catch(handleApiError);
};

export const getTopics = () => {
  return api
    .get("/topics")
    .then(({ data }) => data.topics)
    .catch(handleApiError);
};

export const getArticlesByTopic = (
  topic,
  page = 1,
  sort_by = "created_at",
  order = "desc",
  limit = 10
) => {
  return api
    .get("/articles", { params: { topic, p: page, sort_by, order, limit } })
    .then(({ data }) => data)
    .catch(handleApiError);
};

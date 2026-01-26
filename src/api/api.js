import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-job-application-backend.onrender.com/api"
});

api.interceptors.request.use(config => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export default api;

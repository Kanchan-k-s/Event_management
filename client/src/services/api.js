import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/`,
});
axios.defaults.headers.common['Time-Zone'] = 'Asia/Kolkata';
api.interceptors.request.use((config) => {
  return config;
});

export default api;
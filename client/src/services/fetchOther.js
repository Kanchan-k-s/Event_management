// import axios from "axios";
// const axiosInstance = axios.create({
//   baseURL: "http://worldtimeapi.org/api/",
// });

// import api from "./api";

export default {
  async fetchTimeZone(url) {
    return await fetch(url);
  },
};

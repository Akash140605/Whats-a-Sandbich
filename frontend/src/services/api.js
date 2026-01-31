import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/backend-php/api",
  timeout: 15000
});

// ❌ TEMPORARILY COMMENT THIS BLOCK
/*
api.interceptors.response.use(
  res => res,
  err => {
    if (!err.response) {
      alert("Network Error");
    }
    return Promise.reject(err);
  }
);
*/

export default api;

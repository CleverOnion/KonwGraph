import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器：自动带 token
request.interceptors.request.use(
  (config) => {
    // 假设 token 存在 localStorage，key 为 tokenName/tokenValue
    const tokenName = localStorage.getItem("tokenName");
    const tokenValue = localStorage.getItem("tokenValue");
    if (tokenName && tokenValue) {
      config.headers[tokenName] = tokenValue;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：可统一处理错误
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default request;

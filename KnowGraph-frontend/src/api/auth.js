import request from "./request";

// 登录
export function loginApi(data) {
  return request.post("/auth/login", data);
}

// 注册
export function registerApi(data) {
  return request.post("/auth/register", data);
}

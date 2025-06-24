import request from "./request";

// 获取所有分类
export const getAllCategories = () => {
  return request({
    url: "/categories",
    method: "get",
  });
};

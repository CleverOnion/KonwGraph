import request from "./request";

// 获取所有分类
export const getAllCategories = () => {
  return request({
    url: "/categories",
    method: "get",
  });
};

// 根据ID获取分类详情
export const getCategoryById = (id) => {
  return request({
    url: `/categories/${id}`,
    method: "get",
  });
};

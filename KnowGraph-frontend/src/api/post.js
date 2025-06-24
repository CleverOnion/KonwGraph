import request from "./request";

// 创建文章
export const createPost = (data) => {
  return request({
    url: "/posts",
    method: "post",
    data,
  });
};

export const isLogin = () => {
  return request({
    url: "/posts/isLogin",
    method: "get",
  });
};

// 获取文章列表
export const getPosts = (params) => {
  return request({
    url: "/posts",
    method: "get",
    params,
  });
};

// 获取文章详情
export const getPostDetail = (id) => {
  return request({
    url: `/posts/${id}`,
    method: "get",
  });
};

// 更新文章
export const updatePost = (id, data) => {
  return request({
    url: `/posts/${id}`,
    method: "put",
    data,
  });
};

// 删除文章
export const deletePost = (id) => {
  return request({
    url: `/posts/${id}`,
    method: "delete",
  });
};

import request from "./request";

// 获取文章评论列表
export const getComments = (postId) => {
  return request({
    url: `/posts/${postId}/comments`,
    method: "get",
  });
};

// 创建评论
export const createComment = (postId, data) => {
  return request({
    url: `/posts/${postId}/comments`,
    method: "post",
    data,
  });
};
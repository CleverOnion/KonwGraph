import request from './request';

// 获取用户的收藏夹列表
export const getUserCollections = (userId) => {
  return request({
    url: `/collections/users/${userId}`,
    method: "get",
  });
};

// 创建收藏夹
export const createCollection = (data) => {
  return request({
    url: `/collections`,
    method: "post",
    data,
  });
};

// 更新收藏夹
export const updateCollection = (collectionId, data) => {
  return request({
    url: `/collections/${collectionId}`,
    method: "put",
    data,
  });
};

// 删除收藏夹
export const deleteCollection = (collectionId) => {
  return request({
    url: `/collections/${collectionId}`,
    method: "delete",
  });
};

// 获取收藏夹中的文章
export const getPostsInCollection = (collectionId) => {
  return request({
    url: `/collections/${collectionId}/posts`,
    method: "get",
  });
};

// 检查收藏夹是否可以访问
export const canAccessCollection = (collectionId) => {
  return request({
    url: `/collections/${collectionId}/can-access`,
    method: "get",
  });
};

// 添加文章到收藏夹
export const addPostToCollection = (collectionId, postId) => {
  return request({
    url: `/collections/${collectionId}/posts/${postId}`,
    method: "post",
  });
};

// 从收藏夹移除文章
export const removePostFromCollection = (collectionId, postId) => {
  return request({
    url: `/collections/${collectionId}/posts/${postId}`,
    method: "delete",
  });
};

// 检查文章是否被收藏
export const isPostCollected = (postId) => {
  return request({
    url: `/collections/posts/${postId}/is-collected`,
    method: "get",
  });
};

// 快速收藏文章到默认收藏夹
export const bookmarkPost = (postId) => {
  return request({
    url: `/collections/posts/${postId}/bookmark`,
    method: "post",
  });
};

// 取消收藏文章
export const unbookmarkPost = (postId) => {
  return request({
    url: `/collections/posts/${postId}/bookmark`,
    method: "delete",
  });
};
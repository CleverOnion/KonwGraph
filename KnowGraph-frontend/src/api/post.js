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

// 切换点赞状态（点赞/取消点赞）
export const toggleLike = (id) => {
  return request({
    url: `/posts/${id}/like`,
    method: "post",
  });
};

// 兼容性保留 - 点赞文章（实际调用切换接口）
export const likePost = (id) => {
  return toggleLike(id);
};

// 兼容性保留 - 取消点赞文章（实际调用切换接口）
export const unlikePost = (id) => {
  return toggleLike(id);
};

// 收藏文章到指定收藏夹
export const bookmarkPostToCollection = (postId, collectionId) => {
  return request({
    url: `/collections/${collectionId}/posts/${postId}`,
    method: "post",
  });
};

// 从收藏夹取消收藏文章
export const unbookmarkPostFromCollection = (postId, collectionId) => {
  return request({
    url: `/collections/${collectionId}/posts/${postId}`,
    method: "delete",
  });
};

// 收藏文章到默认收藏夹（兼容性保留）
export const bookmarkPost = (postId, collectionId) => {
  if (collectionId) {
    return bookmarkPostToCollection(postId, collectionId);
  }
  return request({
    url: `/collections/posts/${postId}/bookmark`,
    method: "post",
  });
};

// 从所有收藏夹取消收藏文章（兼容性保留）
export const unbookmarkPost = (postId, collectionId) => {
  if (collectionId) {
    return unbookmarkPostFromCollection(postId, collectionId);
  }
  return request({
    url: `/collections/posts/${postId}/bookmark`,
    method: "delete",
  });
};

// 获取文章点赞和收藏状态
export const getPostStatus = (id) => {
  return request({
    url: `/posts/${id}/status`,
    method: "get",
  });
};

// 增加文章浏览量
export const incrementViewCount = (id) => {
  return request({
    url: `/posts/${id}/view`,
    method: "post",
  });
};

// 根据分类获取文章列表
export const getPostsByCategory = (categoryId, params) => {
  return request({
    url: `/posts/category/${categoryId}`,
    method: "get",
    params,
  });
};

// 获取指定用户的文章列表
export const getPostsByUserId = (userId, params) => {
  return request({
    url: `/posts/user/${userId}`,
    method: "get",
    params,
  });
};

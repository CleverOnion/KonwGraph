import request from './request';

// 获取推荐文章列表
export const getRecommendedPosts = (params) => {
  return request({
    url: '/recommendations/posts',
    method: 'get',
    params,
  });
};

// 获取热门文章列表
export const getHotPosts = (params) => {
  return request({
    url: '/recommendations/hot',
    method: 'get',
    params,
  });
};
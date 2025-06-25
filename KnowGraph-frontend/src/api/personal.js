import request from './request';

// 获取用户个人主页信息
export const getPersonalProfile = (userId) => {
  return request({
    url: `/personal/profile/${userId}`,
    method: 'get',
  });
};

// 获取当前登录用户的个人资料
export const getMyProfile = () => {
  return request({
    url: '/users/me',
    method: 'get',
  });
};

// 关注/取消关注用户
export const toggleFollow = (followingId) => {
  return request({
    url: `/users/${followingId}/follow`,
    method: 'post',
  });
};

// 检查是否关注某用户
export const isFollowing = (followingId) => {
  return request({
    url: `/users/${followingId}/is-following`,
    method: 'get',
  });
};

// 获取关注列表
export const getFollowingList = (userId) => {
  return request({
    url: `/users/${userId}/followings`,
    method: 'get',
  });
};

// 获取粉丝列表
export const getFollowerList = (userId) => {
  return request({
    url: `/users/${userId}/followers`,
    method: 'get',
  });
};

// 更新当前用户资料
export const updateMyProfile = (data) => {
  return request({
    url: '/users/me',
    method: 'put',
    data,
  });
};
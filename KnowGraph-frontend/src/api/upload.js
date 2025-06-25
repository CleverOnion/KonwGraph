import request from './request';

// 上传头像到本地
export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  return request({
    url: '/upload/avatar',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 上传文件到本地（通用）
export const uploadFile = (file, type = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  return request({
    url: '/upload/file',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
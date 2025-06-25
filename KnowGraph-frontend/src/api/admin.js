import request from './request';

// ==================== 用户管理 ====================

/**
 * 分页获取用户列表
 * @param {Object} params - 分页参数
 * @param {number} params.page - 页码
 * @param {number} params.size - 每页大小
 * @returns {Promise}
 */
export const getAdminUsers = (params) => {
  return request({
    url: '/admin/users',
    method: 'get',
    params
  });
};

// ==================== 分类管理 ====================

/**
 * 获取所有分类
 * @returns {Promise}
 */
export const getAdminCategories = () => {
  return request({
    url: '/categories',
    method: 'get'
  });
};

/**
 * 创建分类
 * @param {Object} data - 分类数据
 * @param {string} data.name - 分类名称
 * @param {string} data.slug - 分类标识
 * @param {string} data.description - 分类描述
 * @returns {Promise}
 */
export const createCategory = (data) => {
  return request({
    url: '/categories',
    method: 'post',
    data
  });
};

/**
 * 更新分类
 * @param {number} id - 分类ID
 * @param {Object} data - 更新数据
 * @param {string} data.name - 分类名称
 * @param {string} data.slug - 分类标识
 * @param {string} data.description - 分类描述
 * @returns {Promise}
 */
export const updateCategory = (id, data) => {
  return request({
    url: `/categories/${id}`,
    method: 'put',
    data
  });
};

/**
 * 删除分类
 * @param {number} id - 分类ID
 * @returns {Promise}
 */
export const deleteCategory = (id) => {
  return request({
    url: `/categories/${id}`,
    method: 'delete'
  });
};

/**
 * 根据ID获取分类详情
 * @param {number} id - 分类ID
 * @returns {Promise}
 */// 根据ID获取分类详情
export const getCategoryById = (id) => {
  return request({
    url: `/admin/categories/${id}`,
    method: 'get'
  });
};

// 更新用户状态
export const updateUserStatus = (userId, status) => {
  return request({
    url: `/admin/users/${userId}/status`,
    method: 'put',
    params: { status }
  });
};

// 更新用户角色
export const updateUserRole = (userId, role) => {
  return request({
    url: `/admin/users/${userId}/role`,
    method: 'put',
    params: { role }
  });
};
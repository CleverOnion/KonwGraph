import request from './request';

// ==================== 审核管理 ====================

/**
 * 获取待审核文章列表
 * @param {Object} params - 分页参数
 * @param {number} params.page - 页码
 * @param {number} params.size - 每页大小
 * @param {string} params.status - 文章状态筛选
 * @param {string} params.keyword - 搜索关键词
 * @returns {Promise}
 */
export const getPendingPosts = (params) => {
  return request({
    url: '/admin/posts/pending',
    method: 'get',
    params
  });
};

/**
 * 获取所有文章列表（支持状态筛选）
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.size - 每页大小
 * @param {string} params.status - 文章状态筛选
 * @param {string} params.keyword - 搜索关键词
 * @returns {Promise}
 */
export const getAdminPosts = (params) => {
  return request({
    url: '/admin/posts',
    method: 'get',
    params
  });
};

/**
 * 获取文章详情（用于审核预览）
 * @param {number} postId - 文章ID
 * @returns {Promise}
 */
export const getPostForReview = (postId) => {
  return request({
    url: `/admin/posts/${postId}/review`,
    method: 'get'
  });
};

/**
 * 审核文章
 * @param {Object} data - 审核数据
 * @param {number} data.postId - 文章ID
 * @param {string} data.action - 审核操作：APPROVE(通过) 或 REJECT(驳回)
 * @param {string} data.remark - 审核备注
 * @returns {Promise}
 */
export const reviewPost = (data) => {
  return request({
    url: '/admin/posts/review',
    method: 'post',
    data
  });
};

/**
 * 批量审核文章
 * @param {Object} data - 批量审核数据
 * @param {Array} data.postIds - 文章ID列表
 * @param {string} data.action - 审核操作：APPROVE(通过) 或 REJECT(驳回)
 * @param {string} data.remark - 审核备注
 * @returns {Promise}
 */
export const batchReviewPosts = (data) => {
  return request({
    url: '/admin/posts/batch-review',
    method: 'post',
    data
  });
};

/**
 * 获取审核统计信息
 * @returns {Promise}
 */
export const getReviewStats = () => {
  return request({
    url: '/admin/review/stats',
    method: 'get'
  });
};
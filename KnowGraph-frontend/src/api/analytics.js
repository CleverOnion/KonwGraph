import request from './request';

// ==================== 统计分析 ====================

/**
 * 获取仪表盘统计数据
 * @returns {Promise}
 */
export const getDashboardStats = () => {
  return request({
    url: '/admin/dashboard/stats',
    method: 'get'
  });
};

/**
 * 获取审核统计数据
 * @returns {Promise}
 */
export const getAnalyticsReviewStats = () => {
  return request({
    url: '/admin/review/stats',
    method: 'get'
  });
};
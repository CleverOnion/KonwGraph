package com.cleveronion.knowgraph.analytics.service;

import com.cleveronion.knowgraph.analytics.domain.vo.DashboardStatsVO;
import com.cleveronion.knowgraph.analytics.domain.vo.ReviewStatsVO;

/**
 * 统计分析服务接口
 *
 * @author CleverOnion
 */
public interface AnalyticsService {

    /**
     * 获取仪表盘统计数据
     *
     * @return 仪表盘统计数据
     */
    DashboardStatsVO getDashboardStats();

    /**
     * 获取审核统计数据
     *
     * @return 审核统计数据
     */
    ReviewStatsVO getReviewStats();
}
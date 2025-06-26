package com.cleveronion.knowgraph.analytics.service.impl;

import com.cleveronion.knowgraph.analytics.domain.vo.DashboardStatsVO;
import com.cleveronion.knowgraph.analytics.domain.vo.ReviewStatsVO;
import com.cleveronion.knowgraph.analytics.mapper.AnalyticsMapper;
import com.cleveronion.knowgraph.analytics.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 统计分析服务实现类
 *
 * @author CleverOnion
 */
@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsMapper analyticsMapper;

    @Override
    public DashboardStatsVO getDashboardStats() {
        return DashboardStatsVO.builder()
                .totalUsers(analyticsMapper.getTotalUsers())
                .totalPosts(analyticsMapper.getTotalPosts())
                .pendingPosts(analyticsMapper.getPendingPosts())
                .todayNewUsers(analyticsMapper.getTodayNewUsers())
                .todayNewPosts(analyticsMapper.getTodayNewPosts())
                .totalComments(analyticsMapper.getTotalComments())
                .totalLikes(analyticsMapper.getTotalLikes())
                .build();
    }

    @Override
    public ReviewStatsVO getReviewStats() {
        Long pendingCount = analyticsMapper.getPendingPosts();
        Long approvedCount = analyticsMapper.getApprovedPosts();
        Long rejectedCount = analyticsMapper.getRejectedPosts();
        Long totalCount = pendingCount + approvedCount + rejectedCount;

        return ReviewStatsVO.builder()
                .pendingCount(pendingCount)
                .approvedCount(approvedCount)
                .rejectedCount(rejectedCount)
                .totalCount(totalCount)
                .build();
    }
}
package com.cleveronion.knowgraph.analytics.controller;

import com.cleveronion.knowgraph.analytics.domain.vo.DashboardStatsVO;
import com.cleveronion.knowgraph.analytics.domain.vo.ReviewStatsVO;
import com.cleveronion.knowgraph.analytics.service.AnalyticsService;
import com.cleveronion.knowgraph.common.core.domain.R;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 统计分析控制器
 *
 * @author CleverOnion
 */
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    /**
     * 获取仪表盘统计数据
     *
     * @return 仪表盘统计数据
     */
    @GetMapping("/dashboard/stats")
    public R<DashboardStatsVO> getDashboardStats() {
        DashboardStatsVO stats = analyticsService.getDashboardStats();
        return R.ok(stats);
    }

    /**
     * 获取审核统计数据
     *
     * @return 审核统计数据
     */
    @GetMapping("/review/stats")
    public R<ReviewStatsVO> getReviewStats() {
        ReviewStatsVO stats = analyticsService.getReviewStats();
        return R.ok(stats);
    }
}
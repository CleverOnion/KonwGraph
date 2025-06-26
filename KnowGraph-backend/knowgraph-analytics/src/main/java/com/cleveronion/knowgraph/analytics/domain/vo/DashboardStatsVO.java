package com.cleveronion.knowgraph.analytics.domain.vo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 仪表盘统计数据VO
 *
 * @author CleverOnion
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsVO {

    /**
     * 总用户数
     */
    private Long totalUsers;

    /**
     * 总文章数
     */
    private Long totalPosts;



    /**
     * 待审核文章数
     */
    private Long pendingPosts;

    /**
     * 今日新增用户数
     */
    private Long todayNewUsers;

    /**
     * 今日新增文章数
     */
    private Long todayNewPosts;

    /**
     * 总评论数
     */
    private Long totalComments;

    /**
     * 总点赞数
     */
    private Long totalLikes;
}
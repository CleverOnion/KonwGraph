package com.cleveronion.knowgraph.analytics.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * 统计分析Mapper接口
 *
 * @author CleverOnion
 */
@Mapper
public interface AnalyticsMapper {

    /**
     * 获取总用户数
     *
     * @return 总用户数
     */
    @Select("SELECT COUNT(*) FROM users WHERE deleted_at IS NULL")
    Long getTotalUsers();

    /**
     * 获取总文章数
     *
     * @return 总文章数
     */
    @Select("SELECT COUNT(*) FROM posts WHERE deleted_at IS NULL")
    Long getTotalPosts();



    /**
     * 获取待审核文章数
     *
     * @return 待审核文章数
     */
    @Select("SELECT COUNT(*) FROM posts WHERE status = 'PENDING_REVIEW' AND deleted_at IS NULL")
    Long getPendingPosts();

    /**
     * 获取今日新增用户数
     *
     * @return 今日新增用户数
     */
    @Select("SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE() AND deleted_at IS NULL")
    Long getTodayNewUsers();

    /**
     * 获取今日新增文章数
     *
     * @return 今日新增文章数
     */
    @Select("SELECT COUNT(*) FROM posts WHERE DATE(created_at) = CURDATE() AND deleted_at IS NULL")
    Long getTodayNewPosts();

    /**
     * 获取总评论数
     *
     * @return 总评论数
     */
    @Select("SELECT COUNT(*) FROM comments WHERE status != 'DELETED'")
    Long getTotalComments();

    /**
     * 获取总点赞数
     *
     * @return 总点赞数
     */
    @Select("SELECT COUNT(*) FROM likes")
    Long getTotalLikes();

    /**
     * 获取已通过文章数
     *
     * @return 已通过文章数
     */
    @Select("SELECT COUNT(*) FROM posts WHERE status = 'PUBLISHED' AND deleted_at IS NULL")
    Long getApprovedPosts();

    /**
     * 获取已驳回文章数
     *
     * @return 已驳回文章数
     */
    @Select("SELECT COUNT(*) FROM posts WHERE status = 'REJECTED' AND deleted_at IS NULL")
    Long getRejectedPosts();
}
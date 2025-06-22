package com.cleveronion.knowgraph.content.domain.entity;

import com.cleveronion.knowgraph.content.domain.enums.PostStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 内容实体类 (文章、笔记等)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 内容主键ID
     */
    private Long id;

    /**
     * 作者的用户ID
     */
    private Long userId;

    /**
     * 分类ID
     */
    private Integer categoryId;

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章摘要，用于列表页展示
     */
    private String summary;

    /**
     * Markdown原文
     */
    private String contentMd;

    /**
     * 由Markdown渲染后的HTML内容
     */
    private String contentHtml;

    /**
     * 内容状态
     */
    private PostStatus status;

    /**
     * 是否精选推荐
     */
    private Boolean isFeatured;

    /**
     * 内容发布时间
     */
    private LocalDateTime publishedAt;

    /**
     * 阅读量
     */
    private Integer viewCount;

    /**
     * 点赞数
     */
    private Integer likeCount;

    /**
     * 评论数
     */
    private Integer commentCount;

    /**
     * 收藏数
     */
    private Integer collectCount;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 软删除标记
     */
    private LocalDateTime deletedAt;
} 
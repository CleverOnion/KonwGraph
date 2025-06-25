package com.cleveronion.knowgraph.admin.domain.vo;

import com.cleveronion.knowgraph.content.domain.enums.PostStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 管理员文章视图对象
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminPostVO {

    /**
     * 文章ID
     */
    private Long id;

    /**
     * 作者用户ID
     */
    private Long userId;

    /**
     * 作者用户名
     */
    private String username;

    /**
     * 作者昵称
     */
    private String nickname;

    /**
     * 分类ID
     */
    private Integer categoryId;

    /**
     * 分类名称
     */
    private String categoryName;

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章摘要
     */
    private String summary;

    /**
     * 文章状态
     */
    private PostStatus status;

    /**
     * 是否精选推荐
     */
    private Boolean isFeatured;

    /**
     * 发布时间
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
}
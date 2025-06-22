package com.cleveronion.knowgraph.social.domain.entity;

import com.cleveronion.knowgraph.social.domain.enums.CommentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 评论实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 评论主键ID
     */
    private Long id;

    /**
     * 关联的文章ID
     */
    private Long postId;

    /**
     * 评论者ID
     */
    private Long userId;

    /**
     * 父评论ID，用于实现楼中楼回复
     */
    private Long parentId;

    /**
     * 评论内容
     */
    private String content;

    /**
     * 评论状态
     */
    private CommentStatus status;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
} 
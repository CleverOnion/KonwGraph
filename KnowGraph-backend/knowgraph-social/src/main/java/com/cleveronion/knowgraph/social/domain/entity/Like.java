package com.cleveronion.knowgraph.social.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 点赞实体类 (多态)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Like implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 点赞主键ID
     */
    private Long id;

    /**
     * 点赞的用户ID
     */
    private Long userId;

    /**
     * 被点赞对象的ID (如 post_id, comment_id)
     */
    private Long likableId;

    /**
     * 被点赞对象的类型 (如 'POST', 'COMMENT')
     */
    private String likableType;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
} 
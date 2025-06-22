package com.cleveronion.knowgraph.social.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 用户关注关系实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Follow implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 关注者ID
     */
    private Long followerId;

    /**
     * 被关注者ID
     */
    private Long followingId;

    /**
     * 关注时间
     */
    private LocalDateTime createdAt;
} 
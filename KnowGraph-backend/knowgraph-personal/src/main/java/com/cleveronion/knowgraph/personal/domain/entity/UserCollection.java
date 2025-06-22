package com.cleveronion.knowgraph.personal.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 用户收藏夹实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCollection implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 收藏夹主键ID
     */
    private Long id;

    /**
     * 所属用户ID
     */
    private Long userId;

    /**
     * 收藏夹名称
     */
    private String name;

    /**
     * 收藏夹描述
     */
    private String description;

    /**
     * 是否私密 (false-否, true-是)
     */
    private Boolean isPrivate;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
} 
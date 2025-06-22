package com.cleveronion.knowgraph.content.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 文章与标签的关联实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostTag implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 文章ID
     */
    private Long postId;

    /**
     * 标签ID
     */
    private Integer tagId;
} 
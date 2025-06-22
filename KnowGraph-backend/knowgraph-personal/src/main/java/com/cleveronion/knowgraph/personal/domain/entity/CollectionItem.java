package com.cleveronion.knowgraph.personal.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 收藏夹与文章的关联实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollectionItem implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 收藏夹ID
     */
    private Long collectionId;

    /**
     * 收藏的文章ID
     */
    private Long postId;

    /**
     * 收藏时间
     */
    private LocalDateTime createdAt;
} 
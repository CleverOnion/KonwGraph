package com.cleveronion.knowgraph.social.domain.dto;

import lombok.Data;

/**
 * 创建评论的数据传输对象
 */
@Data
public class CommentCreateDTO {

    /**
     * 父评论ID，如果是对文章直接评论，则为null
     */
    private Long parentId;

    /**
     * 评论内容
     */
    private String content;
} 
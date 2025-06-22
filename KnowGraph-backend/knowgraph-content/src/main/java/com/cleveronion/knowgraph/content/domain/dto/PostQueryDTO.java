package com.cleveronion.knowgraph.content.domain.dto;

import lombok.Data;

/**
 * 文章列表查询的数据传输对象
 */
@Data
public class PostQueryDTO {

    /**
     * 页码，从1开始
     */
    private Integer page = 1;

    /**
     * 每页数量
     */
    private Integer size = 10;

    /**
     * 排序方式: newest, hot
     */
    private String sort = "newest";

    /**
     * 分类ID
     */
    private Integer categoryId;

    /**
     * 标签ID
     */
    private Integer tagId;

    /**
     * 作者ID
     */
    private Long userId;
} 
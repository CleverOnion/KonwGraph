package com.cleveronion.knowgraph.content.domain.dto;

import lombok.Data;

import java.util.List;

/**
 * 创建文章的数据传输对象
 */
@Data
public class PostCreateDTO {

    /**
     * 文章标题
     */
    private String title;

    /**
     * Markdown原文
     */
    private String contentMd;

    /**
     * 文章摘要
     */
    private String summary;
    
    /**
     * 分类ID
     */
    private Integer categoryId;

    /**
     * 标签名称列表
     */
    private List<String> tags;
} 
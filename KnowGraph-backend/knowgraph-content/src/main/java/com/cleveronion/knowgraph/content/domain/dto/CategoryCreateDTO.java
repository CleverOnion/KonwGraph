package com.cleveronion.knowgraph.content.domain.dto;

import lombok.Data;

/**
 * 创建分类的数据传输对象
 */
@Data
public class CategoryCreateDTO {
    private String name;
    private String slug;
    private String description;
} 
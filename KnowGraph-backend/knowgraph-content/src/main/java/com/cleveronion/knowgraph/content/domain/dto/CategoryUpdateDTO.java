package com.cleveronion.knowgraph.content.domain.dto;

import lombok.Data;

/**
 * 更新分类的数据传输对象
 */
@Data
public class CategoryUpdateDTO {
    private Integer parentId;
    private String name;
    private String slug;
    private String description;
} 
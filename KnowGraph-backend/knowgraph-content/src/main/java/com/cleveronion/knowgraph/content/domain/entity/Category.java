package com.cleveronion.knowgraph.content.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 内容分类实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 分类主键ID
     */
    private Integer id;

    /**
     * 父分类ID，用于实现层级结构
     */
    private Integer parentId;

    /**
     * 分类名称
     */
    private String name;

    /**
     * URL友好型别名
     */
    private String slug;

    /**
     * 分类描述
     */
    private String description;
} 
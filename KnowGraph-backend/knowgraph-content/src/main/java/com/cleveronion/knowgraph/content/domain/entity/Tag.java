package com.cleveronion.knowgraph.content.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 标签实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 标签主键ID
     */
    private Integer id;

    /**
     * 标签名称
     */
    private String name;

    /**
     * URL友好型别名
     */
    private String slug;

    /**
     * 引用该标签的文章数
     */
    private Integer postCount;
} 
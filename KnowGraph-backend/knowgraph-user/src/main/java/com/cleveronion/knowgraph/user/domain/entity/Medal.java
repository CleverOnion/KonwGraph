package com.cleveronion.knowgraph.user.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 勋章定义实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Medal implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 勋章主键ID
     */
    private Integer id;

    /**
     * 勋章名称
     */
    private String name;

    /**
     * 勋章描述
     */
    private String description;

    /**
     * 勋章图标URL
     */
    private String iconUrl;

    /**
     * 定义获得该勋章的规则 (JSON格式)
     */
    private String triggerRule;
} 
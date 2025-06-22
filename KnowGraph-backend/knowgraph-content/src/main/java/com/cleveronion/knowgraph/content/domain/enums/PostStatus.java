package com.cleveronion.knowgraph.content.domain.enums;

import lombok.Getter;

/**
 * 内容状态枚举
 */
@Getter
public enum PostStatus {
    DRAFT("草稿"),
    PUBLISHED("已发布"),
    PENDING_REVIEW("待审核"),
    REJECTED("已驳回");

    private final String description;

    PostStatus(String description) {
        this.description = description;
    }
} 
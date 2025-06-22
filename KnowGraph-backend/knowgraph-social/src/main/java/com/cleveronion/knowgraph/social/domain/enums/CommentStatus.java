package com.cleveronion.knowgraph.social.domain.enums;

import lombok.Getter;

/**
 * 评论状态枚举
 */
@Getter
public enum CommentStatus {
    VISIBLE("可见"),
    HIDDEN("隐藏"),
    DELETED("已删除");

    private final String description;

    CommentStatus(String description) {
        this.description = description;
    }
} 
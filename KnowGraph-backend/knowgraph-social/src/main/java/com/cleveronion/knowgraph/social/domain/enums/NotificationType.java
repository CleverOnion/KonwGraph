package com.cleveronion.knowgraph.social.domain.enums;

import lombok.Getter;

/**
 * 通知类型枚举
 */
@Getter
public enum NotificationType {
    NEW_LIKE("新增点赞"),
    NEW_COMMENT("新增评论"),
    NEW_FOLLOWER("新增关注"),
    SYSTEM("系统通知");

    private final String description;

    NotificationType(String description) {
        this.description = description;
    }
} 
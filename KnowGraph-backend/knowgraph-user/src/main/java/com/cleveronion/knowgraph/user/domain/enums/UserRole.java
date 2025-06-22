package com.cleveronion.knowgraph.user.domain.enums;

import lombok.Getter;

/**
 * 用户角色枚举
 */
@Getter
public enum UserRole {
    USER("普通用户"),
    ADMIN("管理员"),
    MODERATOR("版主");

    private final String description;

    UserRole(String description) {
        this.description = description;
    }
} 
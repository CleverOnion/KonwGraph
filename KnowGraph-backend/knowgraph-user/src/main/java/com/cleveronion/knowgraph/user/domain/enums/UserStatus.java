package com.cleveronion.knowgraph.user.domain.enums;

import lombok.Getter;

/**
 * 用户账户状态枚举
 */
@Getter
public enum UserStatus {
    ACTIVE("活跃"),
    BANNED("封禁"),
    PENDING_VERIFICATION("待验证");

    private final String description;

    UserStatus(String description) {
        this.description = description;
    }
} 
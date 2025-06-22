package com.cleveronion.knowgraph.common.core.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 响应状态码枚举
 */
@Getter
@AllArgsConstructor
public enum ResultCode {
    /**
     * 操作成功
     */
    SUCCESS(200, "操作成功"),

    /**
     * 操作失败
     */
    FAILURE(500, "操作失败"),

    /**
     * 客户端认证失败
     */
    UNAUTHORIZED(401, "用户认证失败"),

    /**
     * 资源未找到
     */
    NOT_FOUND(404, "资源未找到"),

    /**
     * 服务器内部错误
     */
    INTERNAL_SERVER_ERROR(500, "服务器内部错误");

    private final int code;
    private final String message;
} 
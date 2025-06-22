package com.cleveronion.knowgraph.common.core.domain;

import com.cleveronion.knowgraph.common.core.enums.ResultCode;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 统一响应体
 *
 * @param <T> 数据类型
 */
@Data
@NoArgsConstructor
public class R<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private int code;
    private String message;
    private T data;

    private R(ResultCode resultCode, T data) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
        this.data = data;
    }

    private R(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> R<T> ok() {
        return new R<>(ResultCode.SUCCESS, null);
    }

    public static <T> R<T> ok(T data) {
        return new R<>(ResultCode.SUCCESS, data);
    }

    public static <T> R<T> ok(String message, T data) {
        return new R<>(ResultCode.SUCCESS.getCode(), message, data);
    }

    public static <T> R<T> fail() {
        return new R<>(ResultCode.FAILURE, null);
    }

    public static <T> R<T> fail(String message) {
        return new R<>(ResultCode.FAILURE.getCode(), message, null);
    }

    public static <T> R<T> fail(int code, String message) {
        return new R<>(code, message, null);
    }

    public static <T> R<T> fail(ResultCode resultCode) {
        return new R<>(resultCode, null);
    }

    public static <T> R<T> fail(ResultCode resultCode, T data) {
        return new R<>(resultCode, data);
    }
} 
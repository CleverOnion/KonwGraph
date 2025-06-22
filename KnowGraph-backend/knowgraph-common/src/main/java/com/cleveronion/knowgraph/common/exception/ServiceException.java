package com.cleveronion.knowgraph.common.exception;

import com.cleveronion.knowgraph.common.core.enums.ResultCode;
import lombok.Getter;

/**
 * 自定义业务异常
 */
@Getter
public final class ServiceException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    /**
     * 错误码
     */
    private final int code;

    /**
     * 错误提示
     */
    private final String message;

    public ServiceException(String message) {
        this.code = ResultCode.FAILURE.getCode();
        this.message = message;
    }

    public ServiceException(ResultCode resultCode) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMessage();
    }
} 
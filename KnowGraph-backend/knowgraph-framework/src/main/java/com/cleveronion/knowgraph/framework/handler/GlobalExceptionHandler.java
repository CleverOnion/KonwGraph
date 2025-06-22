package com.cleveronion.knowgraph.framework.handler;

import cn.dev33.satoken.exception.NotLoginException;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.common.core.enums.ResultCode;
import com.cleveronion.knowgraph.common.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 业务异常
     */
    @ExceptionHandler(ServiceException.class)
    public R<Void> handleServiceException(ServiceException e) {
        log.error("业务异常: {}", e.getMessage());
        return R.fail(e.getCode(), e.getMessage());
    }

    /**
     * Sa-Token 认证异常
     */
    @ExceptionHandler(NotLoginException.class)
    public R<Void> handleNotLoginException(NotLoginException e) {
        log.warn("认证异常: {}", e.getMessage());
        return R.fail(ResultCode.UNAUTHORIZED);
    }

    /**
     * 其他所有异常
     */
    @ExceptionHandler(Exception.class)
    public R<Void> handleException(Exception e) {
        log.error("未知异常: ", e);
        return R.fail(ResultCode.INTERNAL_SERVER_ERROR);
    }
} 
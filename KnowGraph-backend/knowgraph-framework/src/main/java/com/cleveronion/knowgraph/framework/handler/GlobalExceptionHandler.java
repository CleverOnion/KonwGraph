package com.cleveronion.knowgraph.framework.handler;

import cn.dev33.satoken.exception.NotLoginException;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.common.core.enums.ResultCode;
import com.cleveronion.knowgraph.common.exception.ServiceException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static cn.dev33.satoken.SaManager.log;

@RestControllerAdvice
   public class GlobalExceptionHandler {
       @ExceptionHandler(Exception.class)
       public R<Void> handleException(Exception e) {
           log.error("系统异常", e);
           return R.fail(ResultCode.INTERNAL_SERVER_ERROR);
       }

       @ExceptionHandler(ServiceException.class)
       public R<Void> handleServiceException(ServiceException e) {
           log.warn("业务异常: {}", e.getMessage());
           return R.fail(e.getCode(), e.getMessage());
       }

       @ExceptionHandler(NotLoginException.class)
       public R<Void> handleNotLoginException(NotLoginException e) {
           log.warn("未登录异常: {}", e.getMessage());
           return R.fail(ResultCode.UNAUTHORIZED);
       }
   }
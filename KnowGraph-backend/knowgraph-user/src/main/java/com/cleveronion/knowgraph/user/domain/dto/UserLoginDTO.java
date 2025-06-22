package com.cleveronion.knowgraph.user.domain.dto;

import lombok.Data;

/**
 * 用户登录数据传输对象
 */
@Data
public class UserLoginDTO {

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;
} 
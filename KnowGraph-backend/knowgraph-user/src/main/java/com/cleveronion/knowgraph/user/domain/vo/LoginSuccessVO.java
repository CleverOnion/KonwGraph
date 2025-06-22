package com.cleveronion.knowgraph.user.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 登录成功视图对象
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginSuccessVO {

    /**
     * Token 名称 (e.g., "satoken")
     */
    private String tokenName;

    /**
     * Token 值
     */
    private String tokenValue;
} 
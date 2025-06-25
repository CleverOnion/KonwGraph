package com.cleveronion.knowgraph.user.domain.vo;

import lombok.Data;

/**
 * 用户个人资料视图对象
 */
@Data
public class UserProfileVO {

    /**
     * 用户ID
     */
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 头像URL
     */
    private String avatarUrl;

    /**
     * 个人简介
     */
    private String bio;

    /**
     * 积分
     */
    private Integer points;

    private String email;

    /**
     * 用户角色
     */
    private com.cleveronion.knowgraph.user.domain.enums.UserRole role;
}
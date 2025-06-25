package com.cleveronion.knowgraph.user.domain.dto;

import lombok.Data;

/**
 * 用户资料更新数据传输对象
 */
@Data
public class UserUpdateDTO {

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
     * 邮箱
     */
    private String email;
}
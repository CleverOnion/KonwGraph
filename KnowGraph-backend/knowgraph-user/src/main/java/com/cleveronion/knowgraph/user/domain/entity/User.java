package com.cleveronion.knowgraph.user.domain.entity;

import com.cleveronion.knowgraph.user.domain.enums.UserRole;
import com.cleveronion.knowgraph.user.domain.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 用户实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户主键ID
     */
    private Long id;

    /**
     * 用户名，用于登录
     */
    private String username;

    /**
     * 加密后的密码
     */
    private String passwordHash;

    /**
     * 电子邮箱，用于找回密码和通知
     */
    private String email;

    /**
     * 用户昵称
     */
    private String nickname;

    /**
     * 用户头像图片的URL
     */
    private String avatarUrl;

    /**
     * 个人简介
     */
    private String bio;

    /**
     * 用户积分
     */
    private Integer points;

    /**
     * 用户角色: USER-普通用户, ADMIN-管理员, MODERATOR-版主
     */
    private UserRole role;

    /**
     * 账户状态: ACTIVE-活跃, BANNED-封禁, PENDING_VERIFICATION-待验证
     */
    private UserStatus status;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;

    /**
     * 软删除标记
     */
    private LocalDateTime deletedAt;
} 
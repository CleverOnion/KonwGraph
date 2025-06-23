package com.cleveronion.knowgraph.admin.domain.vo;

import com.cleveronion.knowgraph.user.domain.enums.UserRole;
import com.cleveronion.knowgraph.user.domain.enums.UserStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminUserVO {
    private Long id;
    private String username;
    private String nickname;
    private String email;
    private String avatarUrl;
    private UserRole role;
    private UserStatus status;
    private LocalDateTime createdAt;
} 
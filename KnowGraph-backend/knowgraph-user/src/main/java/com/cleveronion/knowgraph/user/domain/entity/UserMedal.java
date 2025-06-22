package com.cleveronion.knowgraph.user.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 用户获得的勋章关联实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserMedal implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 勋章ID
     */
    private Integer medalId;

    /**
     * 授予时间
     */
    private LocalDateTime awardedAt;
} 
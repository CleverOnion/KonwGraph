package com.cleveronion.knowgraph.social.domain.entity;

import com.cleveronion.knowgraph.social.domain.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 系统通知实体类
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 通知主键ID
     */
    private Long id;

    /**
     * 接收通知的用户ID
     */
    private Long recipientId;

    /**
     * 发送通知的用户ID (系统通知时可为NULL)
     */
    private Long senderId;

    /**
     * 通知类型
     */
    private NotificationType type;

    /**
     * 关联实体的ID (如 post_id, comment_id)
     */
    private Long relatedEntityId;

    /**
     * 关联实体的类型
     */
    private String relatedEntityType;

    /**
     * 是否已读 (false-未读, true-已读)
     */
    private Boolean isRead;

    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
} 
package com.cleveronion.knowgraph.social.domain.vo;

import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 评论视图对象
 */
@Data
public class CommentVO {

    private Long id;
    private Long parentId;
    private String content;
    private LocalDateTime createdAt;

    /**
     * 评论作者信息
     */
    private UserProfileVO author;

    /**
     * 子评论列表
     */
    private List<CommentVO> children;
} 
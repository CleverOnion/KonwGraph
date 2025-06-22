package com.cleveronion.knowgraph.social.service;

import com.cleveronion.knowgraph.social.domain.dto.CommentCreateDTO;
import com.cleveronion.knowgraph.social.domain.vo.CommentVO;

import java.util.List;

public interface CommentService {

    /**
     * 创建新评论
     * @param postId 文章ID
     * @param userId 作者ID
     * @param createDTO 评论创建信息
     * @return 创建的评论
     */
    CommentVO createComment(Long postId, Long userId, CommentCreateDTO createDTO);

    /**
     * 获取一篇文章的评论树
     * @param postId 文章ID
     * @return 评论树列表
     */
    List<CommentVO> getCommentTree(Long postId);
} 
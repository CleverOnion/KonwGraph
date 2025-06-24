package com.cleveronion.knowgraph.social.service;

import com.cleveronion.knowgraph.social.domain.vo.PostStatusVO;

/**
 * 文章状态服务接口
 * 用于聚合文章的各种状态信息（点赞、收藏等）
 */
public interface PostStatusService {
    
    /**
     * 获取文章状态
     * @param userId 用户ID
     * @param postId 文章ID
     * @return 文章状态信息
     */
    PostStatusVO getPostStatus(Long userId, Long postId);
}
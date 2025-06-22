package com.cleveronion.knowgraph.social.service;

import com.cleveronion.knowgraph.social.domain.vo.LikeResultVO;

public interface LikeService {

    /**
     * 切换文章的点赞状态
     * @param postId 文章ID
     * @param userId 用户ID
     * @return 最新的点赞状态和数量
     */
    LikeResultVO togglePostLike(Long postId, Long userId);
} 
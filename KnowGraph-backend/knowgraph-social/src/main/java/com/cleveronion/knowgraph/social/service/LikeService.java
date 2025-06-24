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

    /**
     * 检查用户是否已点赞文章
     * @param userId 用户ID
     * @param postId 文章ID
     * @return 是否已点赞
     */
    boolean isPostLiked(Long userId, Long postId);


}
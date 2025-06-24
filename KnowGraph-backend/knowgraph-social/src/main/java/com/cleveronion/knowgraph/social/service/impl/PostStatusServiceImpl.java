package com.cleveronion.knowgraph.social.service.impl;

import com.cleveronion.knowgraph.social.domain.vo.PostStatusVO;
import com.cleveronion.knowgraph.social.service.CollectionService;
import com.cleveronion.knowgraph.social.service.LikeService;
import com.cleveronion.knowgraph.social.service.PostStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 文章状态服务实现类
 * 负责聚合文章的各种状态信息
 */
@Service
@RequiredArgsConstructor
public class PostStatusServiceImpl implements PostStatusService {

    private final LikeService likeService;
    private final CollectionService collectionService;

    @Override
    public PostStatusVO getPostStatus(Long userId, Long postId) {
        boolean liked = likeService.isPostLiked(userId, postId);
        boolean bookmarked = collectionService.isPostCollected(userId, postId);
        return new PostStatusVO(liked, bookmarked);
    }
}
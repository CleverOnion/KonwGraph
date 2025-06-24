package com.cleveronion.knowgraph.social.service.impl;

import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.content.domain.entity.Post;
import com.cleveronion.knowgraph.content.mapper.PostMapper;
import com.cleveronion.knowgraph.social.domain.entity.Like;
import com.cleveronion.knowgraph.social.domain.vo.LikeResultVO;
import com.cleveronion.knowgraph.social.mapper.LikeMapper;
import com.cleveronion.knowgraph.social.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private static final String LIKABLE_TYPE_POST = "POST";

    private final LikeMapper likeMapper;
    private final PostMapper postMapper; // 跨模块注入

    @Override
    @Transactional
    public LikeResultVO togglePostLike(Long postId, Long userId) {
        // 1. 检查文章是否存在
        Post post = postMapper.selectById(postId);
        if (post == null) {
            throw new ServiceException("文章不存在");
        }

        // 2. 检查用户是否已点赞
        Like existingLike = likeMapper.selectOne(userId, postId, LIKABLE_TYPE_POST);

        if (existingLike != null) {
            // 已点赞，执行取消点赞
            likeMapper.deleteById(existingLike.getId());
            postMapper.decrementLikeCount(postId);
            return new LikeResultVO(false, post.getLikeCount() - 1);
        } else {
            // 未点赞，执行点赞
            Like newLike = new Like();
            newLike.setUserId(userId);
            newLike.setLikableId(postId);
            newLike.setLikableType(LIKABLE_TYPE_POST);
            likeMapper.insert(newLike);
            postMapper.incrementLikeCount(postId);
            return new LikeResultVO(true, post.getLikeCount() + 1);
        }
    }

    @Override
    public boolean isPostLiked(Long userId, Long postId) {
        Like existingLike = likeMapper.selectOne(userId, postId, LIKABLE_TYPE_POST);
        return existingLike != null;
    }


}
package com.cleveronion.knowgraph.social.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.social.domain.vo.LikeResultVO;
import com.cleveronion.knowgraph.social.domain.vo.PostStatusVO;
import com.cleveronion.knowgraph.social.service.LikeService;
import com.cleveronion.knowgraph.social.service.PostStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final PostStatusService postStatusService;

    @PostMapping("/posts/{postId}/like")
    public R<LikeResultVO> togglePostLike(@PathVariable Long postId) {
        Long userId = StpUtil.getLoginIdAsLong();
        return R.ok(likeService.togglePostLike(postId, userId));
    }

    @GetMapping("/posts/{postId}/is-liked")
    public R<Boolean> isPostLiked(@PathVariable Long postId) {
        Long userId = StpUtil.getLoginIdAsLong();
        return R.ok(likeService.isPostLiked(userId, postId));
    }

    @GetMapping("/posts/{postId}/status")
    public R<PostStatusVO> getPostStatus(@PathVariable Long postId) {
        Long userId = StpUtil.getLoginIdAsLong();
        return R.ok(postStatusService.getPostStatus(userId, postId));
    }
}
package com.cleveronion.knowgraph.social.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.social.domain.vo.LikeResultVO;
import com.cleveronion.knowgraph.social.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/posts/{postId}/like")
    public R<LikeResultVO> togglePostLike(@PathVariable Long postId) {
        Long userId = StpUtil.getLoginIdAsLong();
        return R.ok(likeService.togglePostLike(postId, userId));
    }
} 
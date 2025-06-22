package com.cleveronion.knowgraph.social.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.social.service.FollowService;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{followingId}/follow")
    public R<Void> toggleFollow(@PathVariable Long followingId) {
        Long followerId = StpUtil.getLoginIdAsLong();
        if (followService.isFollowing(followerId, followingId)) {
            followService.unfollowUser(followingId);
        } else {
            followService.followUser(followingId);
        }
        return R.ok();
    }

    @GetMapping("/{followingId}/is-following")
    public R<Boolean> isFollowing(@PathVariable Long followingId) {
        Long followerId = StpUtil.getLoginIdAsLong();
        return R.ok(followService.isFollowing(followerId, followingId));
    }

    @GetMapping("/{userId}/followings")
    public R<List<UserProfileVO>> getFollowingList(@PathVariable Long userId) {
        return R.ok(followService.getFollowingList(userId));
    }

    @GetMapping("/{userId}/followers")
    public R<List<UserProfileVO>> getFollowerList(@PathVariable Long userId) {
        return R.ok(followService.getFollowerList(userId));
    }
} 
package com.cleveronion.knowgraph.social.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.social.domain.entity.Follow;
import com.cleveronion.knowgraph.social.mapper.FollowMapper;
import com.cleveronion.knowgraph.social.service.FollowService;
import com.cleveronion.knowgraph.user.domain.entity.User;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import com.cleveronion.knowgraph.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author CleverOnion
 * @since 2024-05-20
 */
@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowMapper followMapper;
    private final UserService userService;

    @Override
    public void followUser(Long followingId) {
        Long followerId = StpUtil.getLoginIdAsLong();
        if (Objects.equals(followerId, followingId)) {
            throw new ServiceException("不能关注自己");
        }

        if (isFollowing(followerId, followingId)) {
            throw new ServiceException("已经关注过了");
        }

        Follow follow = Follow.builder()
                .followerId(followerId)
                .followingId(followingId)
                .createdAt(LocalDateTime.now())
                .build();
        followMapper.insert(follow);
    }

    @Override
    public void unfollowUser(Long followingId) {
        Long followerId = StpUtil.getLoginIdAsLong();
        int rows = followMapper.delete(followerId, followingId);
        if (rows == 0) {
            throw new ServiceException("尚未关注该用户，无法取消关注");
        }
    }

    @Override
    public boolean isFollowing(Long followerId, Long followingId) {
        return followMapper.selectOne(followerId, followingId) != null;
    }

    @Override
    public List<UserProfileVO> getFollowingList(Long userId) {
        List<Follow> followList = followMapper.selectFollowingListByUserId(userId);

        if (followList.isEmpty()) {
            return Collections.emptyList();
        }

        List<Long> followingIds = followList.stream()
                .map(Follow::getFollowingId)
                .collect(Collectors.toList());

        List<User> userList = userService.listByIds(followingIds);

        return userList.stream().map(user -> {
            UserProfileVO userProfileVO = new UserProfileVO();
            BeanUtils.copyProperties(user, userProfileVO);
            return userProfileVO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<UserProfileVO> getFollowerList(Long userId) {
        List<Follow> followList = followMapper.selectFollowerListByUserId(userId);

        if (followList.isEmpty()) {
            return Collections.emptyList();
        }

        List<Long> followerIds = followList.stream()
                .map(Follow::getFollowerId)
                .collect(Collectors.toList());

        List<User> userList = userService.listByIds(followerIds);

        return userList.stream().map(user -> {
            UserProfileVO userProfileVO = new UserProfileVO();
            BeanUtils.copyProperties(user, userProfileVO);
            return userProfileVO;
        }).collect(Collectors.toList());
    }

    @Override
    public Long getFollowingCount(Long userId) {
        return followMapper.countFollowing(userId);
    }

    @Override
    public Long getFollowerCount(Long userId) {
        return followMapper.countFollowers(userId);
    }
} 
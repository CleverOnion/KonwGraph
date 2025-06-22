package com.cleveronion.knowgraph.social.service;

import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author CleverOnion
 * @since 2024-05-20
 */
public interface FollowService {

    /**
     * 关注用户
     *
     * @param followingId 被关注者ID
     */
    void followUser(Long followingId);

    /**
     * 取消关注
     *
     * @param followingId 被关注者ID
     */
    void unfollowUser(Long followingId);

    /**
     * 检查是否已关注
     *
     * @param followerId  关注者ID
     * @param followingId 被关注者ID
     * @return boolean
     */
    boolean isFollowing(Long followerId, Long followingId);

    /**
     * 获取用户关注列表
     * @param userId 用户ID
     * @return 关注的用户列表
     */
    List<UserProfileVO> getFollowingList(Long userId);

    /**
     * 获取用户粉丝列表
     * @param userId 用户ID
     * @return 粉丝用户列表
     */
    List<UserProfileVO> getFollowerList(Long userId);
} 
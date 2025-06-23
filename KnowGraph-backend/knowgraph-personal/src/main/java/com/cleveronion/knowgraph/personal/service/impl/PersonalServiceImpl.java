package com.cleveronion.knowgraph.personal.service.impl;

import com.cleveronion.knowgraph.content.domain.dto.PostQueryDTO;
import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.content.service.PostService;
import com.cleveronion.knowgraph.personal.domain.vo.PersonalProfileVO;
import com.cleveronion.knowgraph.personal.service.PersonalService;
import com.cleveronion.knowgraph.social.service.FollowService;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import com.cleveronion.knowgraph.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Personal Service Implementation
 */
@Service
@RequiredArgsConstructor
public class PersonalServiceImpl implements PersonalService {

    private final UserService userService;
    private final PostService postService;
    private final FollowService followService;

    @Override
    public PersonalProfileVO getPersonalProfile(Long userId) {
        // 1. 调用 UserService 获取用户基本信息
        UserProfileVO userProfile = userService.getUserProfileById(userId);

        // 2. 调用 PostService 获取用户发布的文章列表
        PostQueryDTO postQuery = new PostQueryDTO();
        postQuery.setUserId(userId);
        List<PostSimpleVO> posts = postService.listSimplePosts(postQuery);

        // 3. 调用 FollowService 获取关注数和粉丝数
        Long followingCount = followService.getFollowingCount(userId);
        Long followersCount = followService.getFollowerCount(userId);

        // 4. 组装成 PersonalProfileVO 并返回
        PersonalProfileVO profileVO = new PersonalProfileVO();
        profileVO.setUserProfile(userProfile);
        profileVO.setPosts(posts);
        profileVO.setFollowingCount(followingCount);
        profileVO.setFollowersCount(followersCount);

        return profileVO;
    }
} 
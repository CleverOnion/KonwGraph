package com.cleveronion.knowgraph.personal.domain.vo;

import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import lombok.Data;

import java.util.List;

/**
 * Personal Profile View Object
 */
@Data
public class PersonalProfileVO {

    /**
     * 用户基本信息
     */
    private UserProfileVO userProfile;

    /**
     * 发布的文章列表
     */
    private List<PostSimpleVO> posts;

    /**
     * 关注数
     */
    private Long followingCount;

    /**
     * 粉丝数
     */
    private Long followersCount;

    // 未来可以扩展收藏夹、点赞列表等
} 
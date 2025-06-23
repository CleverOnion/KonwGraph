package com.cleveronion.knowgraph.social.mapper;

import com.cleveronion.knowgraph.social.domain.entity.Follow;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author CleverOnion
 * @since 2024-05-20
 */
@Mapper
public interface FollowMapper {

    /**
     * 插入关注记录
     * @param follow 关注关系实体
     * @return 影响行数
     */
    int insert(Follow follow);

    /**
     * 删除关注记录
     * @param followerId 关注者ID
     * @param followingId 被关注者ID
     * @return 影响行数
     */
    int delete(@Param("followerId") Long followerId, @Param("followingId") Long followingId);

    /**
     * 查询关注记录
     * @param followerId 关注者ID
     * @param followingId 被关注者ID
     * @return 关注关系实体
     */
    Follow selectOne(@Param("followerId") Long followerId, @Param("followingId") Long followingId);

    /**
     * 根据用户ID查询关注列表
     * @param userId 用户ID
     * @return 关注关系列表
     */
    List<Follow> selectFollowingListByUserId(@Param("userId") Long userId);

    /**
     * 根据用户ID查询粉丝列表
     * @param userId 用户ID
     * @return 粉丝关系列表
     */
    List<Follow> selectFollowerListByUserId(@Param("userId") Long userId);

    /**
     * 计算用户的关注数
     * @param userId 用户ID
     * @return 关注数
     */
    Long countFollowing(@Param("userId") Long userId);

    /**
     * 计算用户的粉丝数
     * @param userId 用户ID
     * @return 粉丝数
     */
    Long countFollowers(@Param("userId") Long userId);

} 
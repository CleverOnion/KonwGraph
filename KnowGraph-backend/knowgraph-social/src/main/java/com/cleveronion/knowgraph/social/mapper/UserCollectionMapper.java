package com.cleveronion.knowgraph.social.mapper;

import com.cleveronion.knowgraph.social.domain.entity.UserCollection;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserCollectionMapper {
    /**
     * 插入用户收藏夹
     * @param userCollection 收藏夹实体
     * @return 影响行数
     */
    int insert(UserCollection userCollection);

    /**
     * 更新用户收藏夹
     * @param userCollection 收藏夹实体
     * @return 影响行数
     */
    int update(UserCollection userCollection);

    /**
     * 根据ID删除用户收藏夹
     * @param id 收藏夹ID
     * @return 影响行数
     */
    int delete(@Param("id") Long id);

    /**
     * 根据ID查询用户收藏夹
     * @param id 收藏夹ID
     * @return 收藏夹实体
     */
    UserCollection selectById(@Param("id") Long id);

    /**
     * 根据用户ID查询其所有收藏夹
     * @param userId 用户ID
     * @return 收藏夹列表
     */
    List<UserCollection> selectByUserId(@Param("userId") Long userId);
} 
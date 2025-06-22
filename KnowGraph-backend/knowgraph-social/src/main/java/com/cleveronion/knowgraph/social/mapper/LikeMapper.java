package com.cleveronion.knowgraph.social.mapper;

import com.cleveronion.knowgraph.social.domain.entity.Like;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LikeMapper {

    /**
     * 查询一个点赞记录
     * @param userId 用户ID
     * @param likableId 被点赞对象ID
     * @param likableType 被点赞对象类型
     * @return 点赞实体
     */
    Like selectOne(@Param("userId") Long userId, @Param("likableId") Long likableId, @Param("likableType") String likableType);

    /**
     * 插入点赞记录
     * @param like 点赞实体
     * @return 影响行数
     */
    int insert(Like like);

    /**
     * 根据ID删除点赞记录
     * @param id 点赞ID
     * @return 影响行数
     */
    int deleteById(Long id);
} 
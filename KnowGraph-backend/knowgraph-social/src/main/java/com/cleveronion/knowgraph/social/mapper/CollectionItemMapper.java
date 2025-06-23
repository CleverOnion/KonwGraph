package com.cleveronion.knowgraph.social.mapper;

import com.cleveronion.knowgraph.social.domain.entity.CollectionItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CollectionItemMapper {
    /**
     * 插入收藏项目
     * @param collectionItem 收藏项目实体
     * @return 影响行数
     */
    int insert(CollectionItem collectionItem);

    /**
     * 删除收藏项目
     * @param collectionId 收藏夹ID
     * @param postId 文章ID
     * @return 影响行数
     */
    int delete(@Param("collectionId") Long collectionId, @Param("postId") Long postId);

    /**
     * 根据收藏夹ID查询所有收藏项目
     * @param collectionId 收藏夹ID
     * @return 收藏项目列表
     */
    List<CollectionItem> selectByCollectionId(@Param("collectionId") Long collectionId);

    /**
     * 根据文章ID查询收藏项目
     * @param postId 文章ID
     * @return 收藏项目列表
     */
    List<CollectionItem> selectByPostId(@Param("postId") Long postId);

    /**
     * 查询指定的收藏项目是否存在
     * @param collectionId 收藏夹ID
     * @param postId 文章ID
     * @return 收藏项目
     */
    CollectionItem selectOne(@Param("collectionId") Long collectionId, @Param("postId") Long postId);
} 
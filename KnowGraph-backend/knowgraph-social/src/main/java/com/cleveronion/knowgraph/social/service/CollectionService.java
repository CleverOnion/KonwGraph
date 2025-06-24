package com.cleveronion.knowgraph.social.service;

import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.social.domain.entity.UserCollection;

import java.util.List;

public interface CollectionService {

    /**
     * 创建一个新的收藏夹
     * @param name 收藏夹名称
     * @param description 描述
     * @param isPrivate 是否私密
     * @return 创建的收藏夹实体
     */
    UserCollection createCollection(String name, String description, Boolean isPrivate);

    /**
     * 更新收藏夹信息
     * @param collectionId 收藏夹ID
     * @param name 新名称
     * @param description 新描述
     * @param isPrivate 新的私密状态
     */
    void updateCollection(Long collectionId, String name, String description, Boolean isPrivate);

    /**
     * 删除一个收藏夹
     * @param collectionId 收藏夹ID
     */
    void deleteCollection(Long collectionId);

    /**
     * 获取指定用户的所有收藏夹
     * @param userId 用户ID
     * @return 收藏夹列表
     */
    List<UserCollection> getCollectionsByUserId(Long userId);

    /**
     * 将一篇文章添加到一个收藏夹
     * @param collectionId 收藏夹ID
     * @param postId 文章ID
     */
    void addPostToCollection(Long collectionId, Long postId);

    /**
     * 从一个收藏夹中移除一篇文章
     * @param collectionId 收藏夹ID
     * @param postId 文章ID
     */
    void removePostFromCollection(Long collectionId, Long postId);

    /**
     * 获取一个收藏夹中的所有文章
     * @param collectionId 收藏夹ID
     * @return 文章简要信息列表
     */
    List<PostSimpleVO> getPostsInCollection(Long collectionId);

    /**
     * 检查某篇文章是否在用户的收藏夹中
     * @param userId 用户ID
     * @param postId 文章ID
     * @return 如果在任何一个收藏夹中则返回true，否则false
     */
    boolean isPostCollected(Long userId, Long postId);

    /**
     * 将文章收藏到默认收藏夹（如果没有收藏夹则自动创建）
     * @param postId 文章ID
     */
    void bookmarkPostToDefaultCollection(Long postId);

    /**
     * 从所有收藏夹中移除文章
     * @param postId 文章ID
     */
    void unbookmarkPostFromAllCollections(Long postId);

    /**
     * 检查收藏夹是否可以访问
     * 规则：1. 如果是自己的收藏夹，可以访问
     *      2. 如果是别人的公开收藏夹，可以访问
     *      3. 如果是别人的私密收藏夹，不可以访问
     * @param collectionId 收藏夹ID
     * @return true表示可以访问，false表示不可以访问
     */
    boolean canAccessCollection(Long collectionId);

    /**
     * 根据ID获取收藏夹
     * @param collectionId 收藏夹ID
     * @return 收藏夹实体
     */
    UserCollection getCollectionById(Long collectionId);
}
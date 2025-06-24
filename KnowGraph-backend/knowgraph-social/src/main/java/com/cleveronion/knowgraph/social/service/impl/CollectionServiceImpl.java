package com.cleveronion.knowgraph.social.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.content.service.PostService;
import com.cleveronion.knowgraph.social.domain.entity.CollectionItem;
import com.cleveronion.knowgraph.social.domain.entity.UserCollection;
import com.cleveronion.knowgraph.social.mapper.CollectionItemMapper;
import com.cleveronion.knowgraph.social.mapper.UserCollectionMapper;
import com.cleveronion.knowgraph.social.service.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CollectionServiceImpl implements CollectionService {

    private final UserCollectionMapper userCollectionMapper;
    private final CollectionItemMapper collectionItemMapper;
    private final PostService postService; // 跨模块服务注入

    @Override
    @Transactional
    public UserCollection createCollection(String name, String description, Boolean isPrivate) {
        Long userId = StpUtil.getLoginIdAsLong();
        UserCollection collection = UserCollection.builder()
                .userId(userId)
                .name(name)
                .description(description)
                .isPrivate(isPrivate)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        userCollectionMapper.insert(collection);
        return collection;
    }

    @Override
    @Transactional
    public void updateCollection(Long collectionId, String name, String description, Boolean isPrivate) {
        UserCollection existingCollection = verifyAndGetCollection(collectionId);
        existingCollection.setName(name);
        existingCollection.setDescription(description);
        existingCollection.setIsPrivate(isPrivate);
        existingCollection.setUpdatedAt(LocalDateTime.now());
        userCollectionMapper.update(existingCollection);
    }

    @Override
    @Transactional
    public void deleteCollection(Long collectionId) {
        verifyAndGetCollection(collectionId);
        // 首先删除收藏夹内的所有项目
        // 在实际应用中，如果收藏项目数量巨大，这里可能需要分批删除
        List<CollectionItem> items = collectionItemMapper.selectByCollectionId(collectionId);
        if (!CollectionUtils.isEmpty(items)) {
            for (CollectionItem item : items) {
                collectionItemMapper.delete(collectionId, item.getPostId());
            }
        }
        // 然后删除收藏夹本身
        userCollectionMapper.delete(collectionId);
    }

    @Override
    public List<UserCollection> getCollectionsByUserId(Long userId) {
        List<UserCollection> collections = userCollectionMapper.selectByUserId(userId);
        
        // 为每个收藏夹计算文章数量
        for (UserCollection collection : collections) {
            List<CollectionItem> items = collectionItemMapper.selectByCollectionId(collection.getId());
            collection.setPostCount(items.size());
        }
        
        return collections;
    }

    @Override
    @Transactional
    public void addPostToCollection(Long collectionId, Long postId) {
        UserCollection collection = verifyAndGetCollection(collectionId);
        // 检查是否已收藏
        if (collectionItemMapper.selectOne(collectionId, postId) != null) {
            throw new ServiceException("文章已在该收藏夹中");
        }
        CollectionItem item = CollectionItem.builder()
                .collectionId(collectionId)
                .postId(postId)
                .createdAt(LocalDateTime.now())
                .build();
        collectionItemMapper.insert(item);
    }

    @Override
    @Transactional
    public void removePostFromCollection(Long collectionId, Long postId) {
        verifyAndGetCollection(collectionId);
        int rows = collectionItemMapper.delete(collectionId, postId);
        if (rows == 0) {
            throw new ServiceException("文章不在该收藏夹中，无法移除");
        }
    }

    @Override
    public List<PostSimpleVO> getPostsInCollection(Long collectionId) {
        UserCollection collection = userCollectionMapper.selectById(collectionId);
        if (collection == null) {
            throw new ServiceException("收藏夹不存在");
        }
        // 如果是私密收藏夹，只有作者本人能查看
        if (collection.getIsPrivate() && !Objects.equals(collection.getUserId(), StpUtil.getLoginIdAsLong())) {
             throw new ServiceException("无权查看该收藏夹内容");
        }

        List<CollectionItem> items = collectionItemMapper.selectByCollectionId(collectionId);
        if (CollectionUtils.isEmpty(items)) {
            return Collections.emptyList();
        }
        List<Long> postIds = items.stream().map(CollectionItem::getPostId).collect(Collectors.toList());
        return postService.listSimplePostsByIds(postIds);
    }

    @Override
    public boolean isPostCollected(Long userId, Long postId) {
        List<UserCollection> collections = userCollectionMapper.selectByUserId(userId);
        if (CollectionUtils.isEmpty(collections)) {
            return false;
        }
        for (UserCollection collection : collections) {
            if (collectionItemMapper.selectOne(collection.getId(), postId) != null) {
                return true;
            }
        }
        return false;
    }

    /**
     * 辅助方法：校验收藏夹是否存在，以及当前用户是否有权操作
     * @param collectionId 收藏夹ID
     * @return 收藏夹实体
     */
    private UserCollection verifyAndGetCollection(Long collectionId) {
        Long userId = StpUtil.getLoginIdAsLong();
        UserCollection collection = userCollectionMapper.selectById(collectionId);
        if (collection == null) {
            throw new ServiceException("收藏夹不存在");
        }
        if (!Objects.equals(collection.getUserId(), userId)) {
            throw new ServiceException("无权操作他人的收藏夹");
        }
        return collection;
    }

    @Override
    public boolean canAccessCollection(Long collectionId) {
        UserCollection collection = userCollectionMapper.selectById(collectionId);
        if (collection == null) {
            return false; // 收藏夹不存在，不可访问
        }
        
        Long currentUserId = StpUtil.getLoginIdAsLong();
        
        // 如果是自己的收藏夹，可以访问
        if (Objects.equals(collection.getUserId(), currentUserId)) {
            return true;
        }
        
        // 如果是别人的收藏夹，只有公开的才能访问
        return !collection.getIsPrivate();
    }

    @Override
    @Transactional
    public void bookmarkPostToDefaultCollection(Long postId) {
        Long userId = StpUtil.getLoginIdAsLong();
        
        // 获取用户的收藏夹列表
        List<UserCollection> collections = userCollectionMapper.selectByUserId(userId);
        
        UserCollection defaultCollection;
        if (CollectionUtils.isEmpty(collections)) {
            // 如果用户没有收藏夹，创建一个默认收藏夹
            defaultCollection = createCollection("我的收藏", "默认收藏夹", false);
        } else {
            // 使用第一个收藏夹作为默认收藏夹
            defaultCollection = collections.get(0);
        }
        
        // 检查文章是否已经在该收藏夹中
        if (collectionItemMapper.selectOne(defaultCollection.getId(), postId) != null) {
            throw new ServiceException("文章已在收藏夹中");
        }
        
        // 添加到收藏夹
        addPostToCollection(defaultCollection.getId(), postId);
    }

    @Override
    @Transactional
    public void unbookmarkPostFromAllCollections(Long postId) {
        Long userId = StpUtil.getLoginIdAsLong();
        
        // 获取用户的所有收藏夹
        List<UserCollection> collections = userCollectionMapper.selectByUserId(userId);
        
        if (CollectionUtils.isEmpty(collections)) {
            return; // 用户没有收藏夹，无需操作
        }
        
        // 从所有收藏夹中移除该文章
        for (UserCollection collection : collections) {
            CollectionItem existingItem = collectionItemMapper.selectOne(collection.getId(), postId);
            if (existingItem != null) {
                collectionItemMapper.delete(collection.getId(), postId);
            }
        }
    }

    @Override
    public UserCollection getCollectionById(Long collectionId) {
        UserCollection collection = userCollectionMapper.selectById(collectionId);
        if (collection == null) {
            throw new RuntimeException("收藏夹不存在");
        }
        return collection;
    }
}
package com.cleveronion.knowgraph.social.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.social.domain.dto.CollectionCreateDTO;
import com.cleveronion.knowgraph.social.domain.dto.CollectionUpdateDTO;
import com.cleveronion.knowgraph.social.domain.entity.UserCollection;
import com.cleveronion.knowgraph.social.service.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class CollectionController {

    private final CollectionService collectionService;

    // --- 收藏夹管理 ---

    @PostMapping
    public R<UserCollection> createCollection(@Validated @RequestBody CollectionCreateDTO createDTO) {
        UserCollection collection = collectionService.createCollection(
                createDTO.getName(),
                createDTO.getDescription(),
                createDTO.getIsPrivate()
        );
        return R.ok(collection);
    }

    @PutMapping("/{collectionId}")
    public R<Void> updateCollection(@PathVariable Long collectionId, @Validated @RequestBody CollectionUpdateDTO updateDTO) {
        collectionService.updateCollection(
                collectionId,
                updateDTO.getName(),
                updateDTO.getDescription(),
                updateDTO.getIsPrivate()
        );
        return R.ok();
    }

    @DeleteMapping("/{collectionId}")
    public R<Void> deleteCollection(@PathVariable Long collectionId) {
        collectionService.deleteCollection(collectionId);
        return R.ok();
    }

    @GetMapping("/users/{userId}")
    public R<List<UserCollection>> getUserCollections(@PathVariable Long userId) {
        return R.ok(collectionService.getCollectionsByUserId(userId));
    }

    // --- 收藏夹内容管理 ---

    @GetMapping("/{collectionId}/posts")
    public R<Map<String, Object>> getPostsInCollection(@PathVariable Long collectionId) {
        List<PostSimpleVO> posts = collectionService.getPostsInCollection(collectionId);
        UserCollection collection = collectionService.getCollectionById(collectionId);
        
        Map<String, Object> result = new HashMap<>();
        result.put("posts", posts);
        result.put("collection", collection);
        
        return R.ok(result);
    }

    @PostMapping("/{collectionId}/posts/{postId}")
    public R<Void> addPostToCollection(@PathVariable Long collectionId, @PathVariable Long postId) {
        collectionService.addPostToCollection(collectionId, postId);
        return R.ok();
    }

    @DeleteMapping("/{collectionId}/posts/{postId}")
    public R<Void> removePostFromCollection(@PathVariable Long collectionId, @PathVariable Long postId) {
        collectionService.removePostFromCollection(collectionId, postId);
        return R.ok();
    }

    // --- 便捷接口 ---
    @GetMapping("/posts/{postId}/is-collected")
    public R<Boolean> isPostCollected(@PathVariable Long postId) {
        Long userId = StpUtil.getLoginIdAsLong();
        return R.ok(collectionService.isPostCollected(userId, postId));
    }

    @GetMapping("/{collectionId}/can-access")
    public R<Boolean> canAccessCollection(@PathVariable Long collectionId) {
        return R.ok(collectionService.canAccessCollection(collectionId));
    }

    @PostMapping("/posts/{postId}/bookmark")
    public R<Void> bookmarkPost(@PathVariable Long postId) {
        collectionService.bookmarkPostToDefaultCollection(postId);
        return R.ok();
    }

    @DeleteMapping("/posts/{postId}/bookmark")
    public R<Void> unbookmarkPost(@PathVariable Long postId) {
        collectionService.unbookmarkPostFromAllCollections(postId);
        return R.ok();
    }
}
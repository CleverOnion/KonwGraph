package com.cleveronion.knowgraph.content.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import org.springframework.web.bind.annotation.*;
import com.cleveronion.knowgraph.content.domain.dto.PostCreateDTO;
import com.cleveronion.knowgraph.content.domain.dto.PostQueryDTO;
import com.cleveronion.knowgraph.content.domain.dto.PostUpdateDTO;
import com.cleveronion.knowgraph.content.domain.vo.PostDetailVO;
import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.content.service.PostService;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    /**
     * 创建新文章
     */
    @PostMapping
    public R<Long> createPost(@RequestBody PostCreateDTO createDTO) {
        Long userId = StpUtil.getLoginIdAsLong();
        Long postId = postService.createPost(createDTO, userId);
        return R.ok(postId);
    }

    /**
     * 获取文章详情
     */
    @GetMapping("/{id}")
    public R<PostDetailVO> getPostDetail(@PathVariable("id") Long id) {
        return R.ok(postService.getPostDetail(id));
    }

    /**
     * 获取文章列表
     */
    @GetMapping
    public R<List<PostSimpleVO>> getPostList(PostQueryDTO queryDTO) {
        return R.ok(postService.listSimplePosts(queryDTO));
    }

    /**
     * 根据分类获取文章列表
     */
    @GetMapping("/category/{categoryId}")
    public R<List<PostSimpleVO>> getPostsByCategory(
            @PathVariable Integer categoryId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "newest") String sort) {
        PostQueryDTO queryDTO = new PostQueryDTO();
        queryDTO.setCategoryId(categoryId);
        queryDTO.setPage(page);
        queryDTO.setSize(size);
        queryDTO.setSort(sort);
        return R.ok(postService.listSimplePosts(queryDTO));
    }

    /**
     * 更新文章
     */
    @PutMapping("/{id}")
    public R<Void> updatePost(@PathVariable("id") Long id, @RequestBody PostUpdateDTO updateDTO) {
        Long userId = StpUtil.getLoginIdAsLong();
        postService.updatePost(id, updateDTO, userId);
        return R.ok();
    }

    /**
     * 删除文章
     */
    @DeleteMapping("/{id}")
    public R<Void> deletePost(@PathVariable("id") Long id) {
        Long userId = StpUtil.getLoginIdAsLong();
        postService.deletePost(id, userId);
        return R.ok();
    }

    @RequestMapping("isLogin")
    public String isLogin() {
        return StpUtil.getTokenValue() + " " + StpUtil.getLoginId();
    }

    /**
     * 增加文章浏览量
     */
    @PostMapping("/{id}/view")
    public R<Void> incrementViewCount(@PathVariable("id") Long id) {
        postService.incrementViewCount(id);
        return R.ok();
    }
}
package com.cleveronion.knowgraph.social.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.social.domain.dto.CommentCreateDTO;
import com.cleveronion.knowgraph.social.domain.vo.CommentVO;
import com.cleveronion.knowgraph.social.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/posts/{postId}/comments")
    public R<CommentVO> createComment(@PathVariable Long postId, @RequestBody CommentCreateDTO createDTO) {
        Long userId = StpUtil.getLoginIdAsLong();
        return R.ok(commentService.createComment(postId, userId, createDTO));
    }

    @GetMapping("/posts/{postId}/comments")
    public R<List<CommentVO>> getCommentTree(@PathVariable Long postId) {
        return R.ok(commentService.getCommentTree(postId));
    }
} 
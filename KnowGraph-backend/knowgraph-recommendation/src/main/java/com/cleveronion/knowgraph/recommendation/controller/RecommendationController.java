package com.cleveronion.knowgraph.recommendation.controller;

import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.recommendation.service.RecommendationService;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    /**
     * 获取推荐文章列表（用于首页瀑布流）
     *
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @return 分页的文章列表
     */
    @GetMapping("/posts")
    public R<PageInfo<PostSimpleVO>> getRecommendedPosts(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        PageInfo<PostSimpleVO> recommendedPosts = recommendationService.getRecommendedPosts(pageNum, pageSize);
        return R.ok(recommendedPosts);
    }
} 
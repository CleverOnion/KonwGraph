package com.cleveronion.knowgraph.recommendation.service;

import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.github.pagehelper.PageInfo;

public interface RecommendationService {

    /**
     * 获取推荐文章列表
     *
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @return 分页的文章列表
     */
    PageInfo<PostSimpleVO> getRecommendedPosts(Integer pageNum, Integer pageSize);
} 
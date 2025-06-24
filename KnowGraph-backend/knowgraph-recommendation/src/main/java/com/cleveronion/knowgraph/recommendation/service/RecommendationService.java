package com.cleveronion.knowgraph.recommendation.service;

import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.recommendation.domain.vo.HotPostVO;
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

    /**
     * 获取热门文章列表
     *
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @return 分页的热门文章列表（包含热度值）
     */
    PageInfo<HotPostVO> getHotPosts(Integer pageNum, Integer pageSize);
}
package com.cleveronion.knowgraph.recommendation.service.impl;

import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.recommendation.mapper.RecommendationMapper;
import com.cleveronion.knowgraph.recommendation.service.RecommendationService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationServiceImpl implements RecommendationService {

    private final RecommendationMapper recommendationMapper;

    @Override
    public PageInfo<PostSimpleVO> getRecommendedPosts(Integer pageNum, Integer pageSize) {
        // 开启分页
        PageHelper.startPage(pageNum, pageSize);
        // 调用 Mapper 方法查询数据
        List<PostSimpleVO> posts = recommendationMapper.selectRecommendedPosts();
        // 用 PageInfo 包装查询结果，它会包含总数、总页数等信息
        return new PageInfo<>(posts);
    }
} 
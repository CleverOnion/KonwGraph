package com.cleveronion.knowgraph.recommendation.mapper;

import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecommendationMapper {

    /**
     * 查询推荐文章列表
     * @return 文章列表
     */
    List<PostSimpleVO> selectRecommendedPosts();
} 
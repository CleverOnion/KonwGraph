package com.cleveronion.knowgraph.recommendation.mapper;

import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.recommendation.domain.vo.HotPostVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecommendationMapper {

    /**
     * 查询推荐文章列表
     * @return 文章列表
     */
    List<PostSimpleVO> selectRecommendedPosts();

    /**
     * 查询热门文章列表
     * @return 热门文章列表（包含热度值）
     */
    List<HotPostVO> selectHotPosts();
}
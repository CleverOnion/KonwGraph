package com.cleveronion.knowgraph.content.mapper;

import com.cleveronion.knowgraph.content.domain.entity.PostTag;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostTagMapper {

    /**
     * 批量插入文章和标签的关联关系
     * @param postTags 关联关系列表
     * @return 影响行数
     */
    int batchInsert(@Param("postTags") List<PostTag> postTags);

    /**
     * 根据文章ID删除其所有标签关联
     * @param postId 文章ID
     * @return 影响行数
     */
    int deleteByPostId(Long postId);
} 
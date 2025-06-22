package com.cleveronion.knowgraph.social.mapper;

import com.cleveronion.knowgraph.social.domain.entity.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    /**
     * 插入新评论
     * @param comment 评论实体
     * @return 影响行数
     */
    int insert(Comment comment);

    /**
     * 根据文章ID查询其下所有可见的评论
     * @param postId 文章ID
     * @return 评论实体列表
     */
    List<Comment> selectVisibleByPostId(Long postId);
} 
package com.cleveronion.knowgraph.content.mapper;

import com.cleveronion.knowgraph.content.domain.entity.Tag;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TagMapper {

    /**
     * 根据名称查询标签
     * @param name 标签名称
     * @return 标签实体
     */
    Tag selectByName(String name);

    /**
     * 批量插入标签
     * @param tags 标签列表
     * @return 影响行数
     */
    int batchInsert(List<Tag> tags);
    
    /**
     * 批量根据名称查询标签
     * @param names 标签名称列表
     * @return 标签实体列表
     */
    List<Tag> selectByNames(@Param("names") List<String> names);

    /**
     * 根据文章ID查询其所有标签
     * @param postId 文章ID
     * @return 标签实体列表
     */
    List<Tag> selectTagsByPostId(Long postId);

    /**
     * 查询所有标签
     * @return 标签实体列表
     */
    List<Tag> selectAll();
} 
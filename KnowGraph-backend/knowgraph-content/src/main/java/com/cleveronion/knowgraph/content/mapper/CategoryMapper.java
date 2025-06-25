package com.cleveronion.knowgraph.content.mapper;

import com.cleveronion.knowgraph.content.domain.entity.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

    /**
     * 根据ID查询分类
     * @param id 分类ID
     * @return 分类实体
     */
    Category selectById(Integer id);

    /**
     * 查询所有分类
     * @return 分类实体列表
     */
    List<Category> selectAll();

    /**
     * 插入新分类
     * @param category 分类实体
     * @return 影响行数
     */
    int insert(Category category);

    /**
     * 更新分类
     * @param category 分类实体
     * @return 影响行数
     */
    int update(Category category);

    /**
     * 根据ID删除分类
     * @param id 分类ID
     * @return 影响行数
     */
    int deleteById(Integer id);

    /**
     * 查找默认分类
     * @return 默认分类实体
     */
    Category selectDefaultCategory();
}
package com.cleveronion.knowgraph.content.mapper;

import com.cleveronion.knowgraph.content.domain.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import com.cleveronion.knowgraph.content.domain.dto.PostQueryDTO;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface PostMapper {
    
    /**
     * 插入新文章
     * @param post 文章实体
     * @return 影响行数
     */
    int insert(Post post);
    
    /**
     * 根据ID查询文章
     * @param id 文章ID
     * @return 文章实体
     */
    Post selectById(Long id);

    /**
     * 根据条件动态查询文章列表
     * @param queryDTO 查询条件
     * @return 文章实体列表
     */
    List<Post> selectList(@Param("query") PostQueryDTO queryDTO);

    /**
     * 更新文章
     * @param post 文章实体
     * @return 影响行数
     */
    int update(Post post);

    /**
     * 软删除文章
     * @param id 文章ID
     * @param userId 作者ID (用于权限校验)
     * @return 影响行数
     */
    int softDelete(@Param("id") Long id, @Param("userId") Long userId);

    /**
     * 增加文章的点赞数
     * @param postId 文章ID
     * @return 影响行数
     */
    int incrementLikeCount(Long postId);

    /**
     * 减少文章的点赞数
     * @param postId 文章ID
     * @return 影响行数
     */
    int decrementLikeCount(Long postId);

    /**
     * 增加文章的评论数
     * @param postId 文章ID
     * @return 影响行数
     */
    int incrementCommentCount(Long postId);

    /**
     * 增加文章的浏览数
     * @param postId 文章ID
     * @return 影响行数
     */
    int incrementViewCount(Long postId);

    /**
     * 根据ID批量查询文章
     * @param ids 文章ID列表
     * @return 文章实体列表
     */
    List<Post> selectByIds(@Param("ids") List<Long> ids);

    /**
     * 批量更新文章的分类ID
     * @param oldCategoryId 原分类ID
     * @param newCategoryId 新分类ID
     * @return 影响行数
     */
    int updateCategoryId(@Param("oldCategoryId") Integer oldCategoryId, @Param("newCategoryId") Integer newCategoryId);

    /**
     * 根据分类ID查询文章数量
     * @param categoryId 分类ID
     * @return 文章数量
     */
    int countByCategoryId(@Param("categoryId") Integer categoryId);
}
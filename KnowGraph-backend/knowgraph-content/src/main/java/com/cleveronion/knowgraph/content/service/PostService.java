package com.cleveronion.knowgraph.content.service;

import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;
import com.cleveronion.knowgraph.content.domain.dto.PostCreateDTO;
import com.cleveronion.knowgraph.content.domain.dto.PostQueryDTO;
import com.cleveronion.knowgraph.content.domain.dto.PostUpdateDTO;
import com.cleveronion.knowgraph.content.domain.entity.Post;
import com.cleveronion.knowgraph.content.domain.enums.PostStatus;
import com.cleveronion.knowgraph.content.domain.vo.PostDetailVO;
import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;

import java.util.List;

public interface PostService {

    /**
     * 创建新文章
     * @param createDTO 文章创建信息
     * @param userId 作者ID
     * @return 新创建文章的ID
     */
    Long createPost(PostCreateDTO createDTO, Long userId);

    /**
     * 获取文章详情
     * @param postId 文章ID
     * @return 文章详情视图对象
     */
    PostDetailVO getPostDetail(Long postId);

    /**
     * 获取文章列表
     * @param queryDTO 查询条件
     * @return 文章简要信息列表
     */
    List<PostSimpleVO> listSimplePosts(PostQueryDTO queryDTO);

    /**
     * 更新文章
     * @param postId 文章ID
     * @param updateDTO 更新信息
     * @param userId 操作者ID
     */
    void updatePost(Long postId, PostUpdateDTO updateDTO, Long userId);

    /**
     * 删除文章
     * @param postId 文章ID
     * @param userId 操作者ID
     */
    void deletePost(Long postId, Long userId);

    /**
     * 根据文章ID列表获取文章简要信息
     * @param postIds 文章ID列表
     * @return 文章简要信息列表
     */
    List<PostSimpleVO> listSimplePostsByIds(List<Long> postIds);

    /**
     * 增加文章浏览量
     * @param postId 文章ID
     */
    void incrementViewCount(Long postId);

    /**
     * 增加文章评论数
     * @param postId 文章ID
     */
    void incrementCommentCount(Long postId);

    /**
     * 根据ID获取文章实体
     * @param postId 文章ID
     * @return 文章实体
     */
    Post getPostById(Long postId);

    /**
     * 更新文章状态
     * @param postId 文章ID
     * @param status 新状态
     */
    void updatePostStatus(Long postId, PostStatus status);

    /**
     * 分页获取文章列表（管理员用，支持按状态筛选）
     * @param pageQuery 分页查询参数
     * @param status 文章状态（可选）
     * @return 文章分页结果
     */
    PageResultVO<Post> listPostsByStatusForAdmin(PageQueryDTO pageQuery, PostStatus status);
}
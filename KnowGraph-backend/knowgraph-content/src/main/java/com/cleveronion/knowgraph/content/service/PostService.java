package com.cleveronion.knowgraph.content.service;

import com.cleveronion.knowgraph.content.domain.dto.PostCreateDTO;
import com.cleveronion.knowgraph.content.domain.dto.PostQueryDTO;
import com.cleveronion.knowgraph.content.domain.dto.PostUpdateDTO;
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
    List<PostSimpleVO> getPostList(PostQueryDTO queryDTO);

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
     * 根据文章ID列表批量获取文章简要信息
     * @param postIds 文章ID列表
     * @return 文章简要信息列表
     */
    List<PostSimpleVO> listSimplePostsByIds(List<Long> postIds);
} 
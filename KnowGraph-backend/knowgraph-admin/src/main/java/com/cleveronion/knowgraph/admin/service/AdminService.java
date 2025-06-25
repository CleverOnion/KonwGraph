package com.cleveronion.knowgraph.admin.service;

import com.cleveronion.knowgraph.admin.domain.dto.PostReviewDTO;
import com.cleveronion.knowgraph.admin.domain.vo.AdminPostVO;
import com.cleveronion.knowgraph.admin.domain.vo.AdminUserVO;
import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;
import com.cleveronion.knowgraph.content.domain.enums.PostStatus;

public interface AdminService {
    /**
     * 分页获取用户列表
     *
     * @param pageQuery 分页查询参数
     * @return 用户分页结果
     */
    PageResultVO<AdminUserVO> listUsers(PageQueryDTO pageQuery);

    /**
     * 更新用户状态
     *
     * @param userId 用户ID
     * @param status 新状态
     */
    void updateUserStatus(Long userId, String status);

    /**
     * 更新用户角色
     *
     * @param userId 用户ID
     * @param role 新角色
     */
    void updateUserRole(Long userId, String role);

    /**
     * 分页获取文章列表（支持按状态筛选）
     *
     * @param pageQuery 分页查询参数
     * @param status 文章状态（可选）
     * @return 文章分页结果
     */
    PageResultVO<AdminPostVO> listPosts(PageQueryDTO pageQuery, PostStatus status);

    /**
     * 审核文章
     *
     * @param reviewDTO 审核信息
     */
    void reviewPost(PostReviewDTO reviewDTO);

    /**
     * 获取文章详情
     *
     * @param postId 文章ID
     * @return 文章详情
     */
    AdminPostVO getPostDetail(Long postId);
}
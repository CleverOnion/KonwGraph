package com.cleveronion.knowgraph.admin.service.impl;

import com.cleveronion.knowgraph.admin.domain.dto.PostReviewDTO;
import com.cleveronion.knowgraph.admin.domain.vo.AdminPostVO;
import com.cleveronion.knowgraph.admin.domain.vo.AdminUserVO;
import com.cleveronion.knowgraph.admin.service.AdminService;
import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;
import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.content.domain.entity.Category;
import com.cleveronion.knowgraph.content.domain.entity.Post;
import com.cleveronion.knowgraph.content.domain.enums.PostStatus;
import com.cleveronion.knowgraph.content.service.CategoryService;
import com.cleveronion.knowgraph.content.service.PostService;
import com.cleveronion.knowgraph.user.domain.entity.User;
import com.cleveronion.knowgraph.user.domain.enums.UserRole;
import com.cleveronion.knowgraph.user.domain.enums.UserStatus;
import com.cleveronion.knowgraph.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserService userService;
    private final PostService postService;
    private final CategoryService categoryService;

    @Override
    public PageResultVO<AdminUserVO> listUsers(PageQueryDTO pageQuery) {
        // 1. 调用 UserService 获取分页用户数据
        PageResultVO<User> userPageResult = userService.listUsersByPage(pageQuery);

        // 2. 将 User 列表转换为 AdminUserVO 列表
        List<AdminUserVO> adminUserVOs = userPageResult.getRecords().stream()
                .map(this::convertToAdminUserVO)
                .collect(Collectors.toList());

        // 3. 返回最终的分页结果
        return new PageResultVO<>(userPageResult.getTotal(), adminUserVOs);
    }

    @Override
    public void updateUserStatus(Long userId, String status) {
        UserStatus userStatus = UserStatus.valueOf(status);
        userService.updateUserStatus(userId, userStatus);
    }

    @Override
    public void updateUserRole(Long userId, String role) {
        UserRole userRole = UserRole.valueOf(role);
        userService.updateUserRole(userId, userRole);
    }

    @Override
    public PageResultVO<AdminPostVO> listPosts(PageQueryDTO pageQuery, PostStatus status) {
        // 1. 调用 PostService 获取分页文章数据
        PageResultVO<Post> postPageResult = postService.listPostsByStatusForAdmin(pageQuery, status);

        // 2. 将 Post 列表转换为 AdminPostVO 列表
        List<AdminPostVO> adminPostVOs = postPageResult.getRecords().stream()
                .map(this::convertToAdminPostVO)
                .collect(Collectors.toList());

        // 3. 返回最终的分页结果
        return new PageResultVO<>(postPageResult.getTotal(), adminPostVOs);
    }

    @Override
    public void reviewPost(PostReviewDTO reviewDTO) {
        // 1. 验证文章是否存在
        Post post = postService.getPostById(reviewDTO.getPostId());
        if (post == null) {
            throw new ServiceException("文章不存在");
        }

        // 2. 验证文章状态是否为待审核
        if (!PostStatus.PENDING_REVIEW.equals(post.getStatus())) {
            throw new ServiceException("文章状态不是待审核，无法进行审核操作");
        }

        // 3. 根据审核操作更新文章状态
        PostStatus newStatus;
        if ("APPROVE".equals(reviewDTO.getAction())) {
            newStatus = PostStatus.PUBLISHED;
        } else if ("REJECT".equals(reviewDTO.getAction())) {
            newStatus = PostStatus.REJECTED;
        } else {
            throw new ServiceException("无效的审核操作");
        }

        // 4. 更新文章状态
        postService.updatePostStatus(reviewDTO.getPostId(), newStatus);
    }

    @Override
    public AdminPostVO getPostDetail(Long postId) {
        Post post = postService.getPostById(postId);
        if (post == null) {
            throw new ServiceException("文章不存在");
        }
        return convertToAdminPostVO(post);
    }

    private AdminUserVO convertToAdminUserVO(User user) {
        AdminUserVO adminUserVO = new AdminUserVO();
        BeanUtils.copyProperties(user, adminUserVO);
        return adminUserVO;
    }

    private AdminPostVO convertToAdminPostVO(Post post) {
        AdminPostVO adminPostVO = new AdminPostVO();
        BeanUtils.copyProperties(post, adminPostVO);

        // 获取作者信息
        User author = userService.getUserById(post.getUserId());
        if (author != null) {
            adminPostVO.setUsername(author.getUsername());
            adminPostVO.setNickname(author.getNickname());
        }

        // 获取分类信息
        if (post.getCategoryId() != null) {
            Category category = categoryService.getCategoryEntityById(post.getCategoryId());
            if (category != null) {
                adminPostVO.setCategoryName(category.getName());
            }
        }

        return adminPostVO;
    }
}
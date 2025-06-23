package com.cleveronion.knowgraph.admin.service.impl;

import com.cleveronion.knowgraph.admin.domain.vo.AdminUserVO;
import com.cleveronion.knowgraph.admin.service.AdminService;
import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;
import com.cleveronion.knowgraph.user.domain.entity.User;
import com.cleveronion.knowgraph.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserService userService;

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

    private AdminUserVO convertToAdminUserVO(User user) {
        AdminUserVO adminUserVO = new AdminUserVO();
        BeanUtils.copyProperties(user, adminUserVO);
        return adminUserVO;
    }
} 
package com.cleveronion.knowgraph.admin.service;

import com.cleveronion.knowgraph.admin.domain.vo.AdminUserVO;
import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;

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
}
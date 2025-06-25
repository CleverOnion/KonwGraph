package com.cleveronion.knowgraph.admin.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.cleveronion.knowgraph.admin.domain.vo.AdminUserVO;
import com.cleveronion.knowgraph.admin.service.AdminService;
import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;
import com.cleveronion.knowgraph.common.core.domain.R;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /**
     * 分页获取用户列表
     */
    @GetMapping("/users")
    public R<PageResultVO<AdminUserVO>> listUsers(PageQueryDTO pageQuery) {
        PageResultVO<AdminUserVO> pageResult = adminService.listUsers(pageQuery);
        return R.ok(pageResult);
    }

    /**
     * 更新用户状态
     */
    @PutMapping("/users/{userId}/status")
    public R<Void> updateUserStatus(@PathVariable Long userId, @RequestParam String status) {
        adminService.updateUserStatus(userId, status);
        return R.ok();
    }

    /**
     * 更新用户角色
     */
    @PutMapping("/users/{userId}/role")
    public R<Void> updateUserRole(@PathVariable Long userId, @RequestParam String role) {
        adminService.updateUserRole(userId, role);
        return R.ok();
    }
}
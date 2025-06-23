package com.cleveronion.knowgraph.admin.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import com.cleveronion.knowgraph.admin.domain.vo.AdminUserVO;
import com.cleveronion.knowgraph.admin.service.AdminService;
import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;
import com.cleveronion.knowgraph.common.core.domain.R;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@SaCheckRole("ADMIN")
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
} 
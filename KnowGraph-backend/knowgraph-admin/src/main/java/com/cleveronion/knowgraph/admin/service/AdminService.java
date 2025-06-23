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
} 
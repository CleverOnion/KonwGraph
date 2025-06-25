package com.cleveronion.knowgraph.user.service;

import com.cleveronion.knowgraph.user.domain.dto.UserLoginDTO;
import com.cleveronion.knowgraph.user.domain.dto.UserRegisterDTO;
import com.cleveronion.knowgraph.user.domain.dto.UserUpdateDTO;
import com.cleveronion.knowgraph.user.domain.entity.User;
import com.cleveronion.knowgraph.user.domain.enums.UserRole;
import com.cleveronion.knowgraph.user.domain.enums.UserStatus;
import com.cleveronion.knowgraph.user.domain.vo.LoginSuccessVO;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;

import java.util.List;

public interface UserService {

    /**
     * 用户注册
     * @param registerDTO 用户注册信息
     */
    void register(UserRegisterDTO registerDTO);

    /**
     * 用户登录
     * @param userLoginDTO 用户登录信息
     * @return 登录成功后的用户信息
     */
    LoginSuccessVO login(UserLoginDTO userLoginDTO);

    /**
     * 获取用户个人信息
     *
     * @param userId 用户id
     * @return 用户个人信息
     */
    UserProfileVO getUserProfileById(Long userId);

    /**
     * 根据ID列表批量获取用户
     * @param userIds 用户ID列表
     * @return 用户列表
     */
    List<User> listByIds(List<Long> userIds);

    /**
     * 分页获取用户列表
     * @param pageQuery 分页查询参数
     * @return 用户分页结果
     */
    PageResultVO<User> listUsersByPage(PageQueryDTO pageQuery);

    /**
     * 更新用户资料
     * @param userId 用户ID
     * @param updateDTO 更新信息
     */
    void updateProfile(Long userId, UserUpdateDTO updateDTO);

    /**
     * 更新用户状态
     * @param userId 用户ID
     * @param status 新状态
     */
    void updateUserStatus(Long userId, UserStatus status);

    /**
     * 更新用户角色
     * @param userId 用户ID
     * @param role 新角色
     */
    void updateUserRole(Long userId, UserRole role);
}
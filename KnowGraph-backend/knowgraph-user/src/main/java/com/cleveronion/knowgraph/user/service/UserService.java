package com.cleveronion.knowgraph.user.service;

import com.cleveronion.knowgraph.user.domain.dto.UserLoginDTO;
import com.cleveronion.knowgraph.user.domain.dto.UserRegisterDTO;
import com.cleveronion.knowgraph.user.domain.vo.LoginSuccessVO;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;

public interface UserService {

    /**
     * 用户注册
     * @param registerDTO 注册信息
     */
    void register(UserRegisterDTO registerDTO);

    /**
     * 用户登录
     * @param loginDTO 登录信息
     * @return 登录成功信息，包含token
     */
    LoginSuccessVO login(UserLoginDTO loginDTO);

    /**
     * 根据用户ID获取个人资料
     * @param userId 用户ID
     * @return 用户个人资料
     */
    UserProfileVO getUserProfile(Long userId);
} 
package com.cleveronion.knowgraph.user.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.user.domain.dto.UserLoginDTO;
import com.cleveronion.knowgraph.user.domain.dto.UserRegisterDTO;
import com.cleveronion.knowgraph.user.domain.vo.LoginSuccessVO;
import com.cleveronion.knowgraph.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public R<Void> register(@RequestBody UserRegisterDTO registerDTO) {
        userService.register(registerDTO);
        return R.ok();
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public R<LoginSuccessVO> login(@RequestBody UserLoginDTO loginDTO) {
        return R.ok(userService.login(loginDTO));
    }

    /**
     * 用户登出
     */
    @PostMapping("/logout")
    public R<Void> logout() {
        StpUtil.logout();
        return R.ok();
    }
} 
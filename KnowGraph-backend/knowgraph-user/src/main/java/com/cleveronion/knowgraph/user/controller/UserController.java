package com.cleveronion.knowgraph.user.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.user.domain.dto.UserUpdateDTO;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import com.cleveronion.knowgraph.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 获取当前登录用户的个人资料
     */
    @GetMapping("/me")
    public R<UserProfileVO> getMyProfile() {
        Long loginId = StpUtil.getLoginIdAsLong();
        return R.ok(userService.getUserProfileById(loginId));
    }

    /**
     * 更新当前登录用户的个人资料
     */
    @PutMapping("/me")
    public R<Void> updateMyProfile(@Valid @RequestBody UserUpdateDTO updateDTO) {
        Long loginId = StpUtil.getLoginIdAsLong();
        userService.updateProfile(loginId, updateDTO);
        return R.ok();
    }
}
package com.cleveronion.knowgraph.user.service.impl;

import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.user.domain.dto.UserLoginDTO;
import com.cleveronion.knowgraph.user.domain.dto.UserRegisterDTO;
import com.cleveronion.knowgraph.user.domain.entity.User;
import com.cleveronion.knowgraph.user.domain.enums.UserRole;
import com.cleveronion.knowgraph.user.domain.enums.UserStatus;
import com.cleveronion.knowgraph.user.domain.vo.LoginSuccessVO;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import com.cleveronion.knowgraph.user.mapper.UserMapper;
import com.cleveronion.knowgraph.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    @Override
    @Transactional
    public void register(UserRegisterDTO registerDTO) {
        // 1. 校验用户名和邮箱是否已存在
        if (userMapper.selectByUsername(registerDTO.getUsername()) != null) {
            throw new ServiceException("用户名已存在");
        }
        if (userMapper.selectByEmail(registerDTO.getEmail()) != null) {
            throw new ServiceException("电子邮箱已被注册");
        }

        // 2. 构建用户实体
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        // 使用 Sa-Token 自带的加密工具
        user.setPasswordHash(SaSecureUtil.md5(registerDTO.getPassword()));
        user.setEmail(registerDTO.getEmail());
        // 默认昵称与用户名相同
        user.setNickname(registerDTO.getUsername());
        user.setRole(UserRole.USER);
        user.setStatus(UserStatus.ACTIVE);

        // 3. 插入数据库
        userMapper.insert(user);
    }

    @Override
    public LoginSuccessVO login(UserLoginDTO loginDTO) {
        // 1. 根据用户名查询用户
        User user = userMapper.selectByUsername(loginDTO.getUsername());
        if (user == null) {
            throw new ServiceException("用户名或密码错误");
        }
        
        // 2. 校验账户状态
        if (user.getStatus() == UserStatus.BANNED) {
            throw new ServiceException("账户已被封禁");
        }

        // 3. 校验密码
        if (!Objects.equals(user.getPasswordHash(), SaSecureUtil.md5(loginDTO.getPassword()))) {
            throw new ServiceException("用户名或密码错误");
        }

        // 4. 执行登录
        StpUtil.login(user.getId());

        // 5. 返回Token信息
        return new LoginSuccessVO(StpUtil.getTokenName(), StpUtil.getTokenValue());
    }

    @Override
    public UserProfileVO getUserProfile(Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new ServiceException("用户不存在");
        }
        UserProfileVO vo = new UserProfileVO();
        BeanUtils.copyProperties(user, vo);
        return vo;
    }

    @Override
    public List<User> listByIds(List<Long> userIds) {
        if (userIds == null || userIds.isEmpty()) {
            return new java.util.ArrayList<>();
        }
        return userMapper.selectByIds(userIds);
    }
} 
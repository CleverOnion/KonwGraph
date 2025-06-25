package com.cleveronion.knowgraph.user.service.impl;

import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.common.core.domain.PageQueryDTO;
import com.cleveronion.knowgraph.common.core.domain.PageResultVO;
import com.cleveronion.knowgraph.user.domain.dto.UserLoginDTO;
import com.cleveronion.knowgraph.user.domain.dto.UserRegisterDTO;
import com.cleveronion.knowgraph.user.domain.dto.UserUpdateDTO;
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
    public UserProfileVO getUserProfileById(Long userId) {
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

    @Override
    public PageResultVO<User> listUsersByPage(PageQueryDTO pageQuery) {
        // 1. 获取总数
        Long total = userMapper.countTotal();
        if (total == 0) {
            return new PageResultVO<>(0L, new java.util.ArrayList<>());
        }
        // 2. 获取当前页数据
        List<User> records = userMapper.selectListByPage(pageQuery);
        return new PageResultVO<>(total, records);
    }

    @Override
    @Transactional
    public void updateProfile(Long userId, UserUpdateDTO updateDTO) {
        // 1. 检查用户是否存在
        User existingUser = userMapper.selectById(userId);
        if (existingUser == null) {
            throw new ServiceException("用户不存在");
        }

        // 2. 检查邮箱是否被其他用户使用
        if (updateDTO.getEmail() != null && !updateDTO.getEmail().equals(existingUser.getEmail())) {
            User userWithEmail = userMapper.selectByEmail(updateDTO.getEmail());
            if (userWithEmail != null && !userWithEmail.getId().equals(userId)) {
                throw new ServiceException("该邮箱已被其他用户使用");
            }
        }

        // 3. 构建更新对象
        User updateUser = new User();
        updateUser.setId(userId);
        updateUser.setNickname(updateDTO.getNickname());
        updateUser.setAvatarUrl(updateDTO.getAvatarUrl());
        updateUser.setBio(updateDTO.getBio());
        updateUser.setEmail(updateDTO.getEmail());

        // 4. 执行更新
        int result = userMapper.updateProfile(updateUser);
        if (result == 0) {
            throw new ServiceException("更新用户资料失败");
        }
    }

    @Override
    @Transactional
    public void updateUserStatus(Long userId, UserStatus status) {
        // 1. 检查用户是否存在
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new ServiceException("用户不存在");
        }

        // 2. 构建更新对象
        User updateUser = new User();
        updateUser.setId(userId);
        updateUser.setStatus(status);

        // 3. 执行更新
        int result = userMapper.updateById(updateUser);
        if (result == 0) {
            throw new ServiceException("更新用户状态失败");
        }
    }

    @Override
    @Transactional
    public void updateUserRole(Long userId, UserRole role) {
        // 1. 检查用户是否存在
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new ServiceException("用户不存在");
        }

        // 2. 构建更新对象
        User updateUser = new User();
        updateUser.setId(userId);
        updateUser.setRole(role);

        // 3. 执行更新
        int result = userMapper.updateById(updateUser);
        if (result == 0) {
            throw new ServiceException("更新用户角色失败");
        }
    }
}
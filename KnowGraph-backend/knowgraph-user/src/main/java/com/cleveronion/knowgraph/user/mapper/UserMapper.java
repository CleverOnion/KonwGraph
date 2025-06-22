package com.cleveronion.knowgraph.user.mapper;

import com.cleveronion.knowgraph.user.domain.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    /**
     * 根据用户名查询用户
     * @param username 用户名
     * @return 用户实体
     */
    User selectByUsername(String username);

    /**
     * 根据邮箱查询用户
     * @param email 邮箱
     * @return 用户实体
     */
    User selectByEmail(String email);

    /**
     * 插入新用户
     * @param user 用户实体
     * @return 影响行数
     */
    int insert(User user);

    /**
     * 根据ID查询用户
     * @param id 用户ID
     * @return 用户实体
     */
    User selectById(Long id);
} 
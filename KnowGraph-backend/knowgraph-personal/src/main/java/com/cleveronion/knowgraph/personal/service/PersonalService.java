package com.cleveronion.knowgraph.personal.service;

import com.cleveronion.knowgraph.personal.domain.vo.PersonalProfileVO;

/**
 * Personal Service
 */
public interface PersonalService {

    /**
     * 获取用户个人主页信息
     *
     * @param userId 用户ID
     * @return 个人主页信息
     */
    PersonalProfileVO getPersonalProfile(Long userId);
} 
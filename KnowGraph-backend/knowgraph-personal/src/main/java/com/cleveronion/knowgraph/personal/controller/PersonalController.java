package com.cleveronion.knowgraph.personal.controller;

import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.personal.domain.vo.PersonalProfileVO;
import com.cleveronion.knowgraph.personal.service.PersonalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Personal Controller
 */
@RestController
@RequestMapping("/personal")
@RequiredArgsConstructor
public class PersonalController {

    private final PersonalService personalService;

    /**
     * 获取用户个人主页信息
     *
     * @param userId 用户ID
     * @return 个人主页信息
     */
    @GetMapping("/profile/{userId}")
    public R<PersonalProfileVO> getPersonalProfile(@PathVariable Long userId) {
        PersonalProfileVO profile = personalService.getPersonalProfile(userId);
        return R.ok(profile);
    }
} 
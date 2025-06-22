package com.cleveronion.knowgraph.social.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 点赞操作结果视图对象
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeResultVO {

    /**
     * 当前的点赞状态 (true: 已点赞, false: 未点赞)
     */
    private boolean liked;

    /**
     * 最新的点赞总数
     */
    private Integer likeCount;
} 
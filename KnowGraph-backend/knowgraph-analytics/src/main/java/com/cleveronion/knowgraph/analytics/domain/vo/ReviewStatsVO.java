package com.cleveronion.knowgraph.analytics.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 审核统计数据VO
 *
 * @author CleverOnion
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewStatsVO {

    /**
     * 待审核文章数
     */
    private Long pendingCount;

    /**
     * 已通过文章数
     */
    private Long approvedCount;

    /**
     * 已驳回文章数
     */
    private Long rejectedCount;

    /**
     * 总文章数
     */
    private Long totalCount;
}
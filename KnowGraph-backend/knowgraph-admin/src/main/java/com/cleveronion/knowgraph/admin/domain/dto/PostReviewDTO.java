package com.cleveronion.knowgraph.admin.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 文章审核DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostReviewDTO {

    /**
     * 文章ID
     */
    @NotNull(message = "文章ID不能为空")
    private Long postId;

    /**
     * 审核操作：APPROVE(通过) 或 REJECT(驳回)
     */
    @NotBlank(message = "审核操作不能为空")
    private String action;

    /**
     * 审核备注（驳回时必填）
     */
    private String remark;
}
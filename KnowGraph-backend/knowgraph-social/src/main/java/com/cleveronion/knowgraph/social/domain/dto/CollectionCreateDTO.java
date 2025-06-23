package com.cleveronion.knowgraph.social.domain.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
public class CollectionCreateDTO {
    @NotBlank(message = "收藏夹名称不能为空")
    @Size(max = 50, message = "收藏夹名称不能超过50个字符")
    private String name;

    @Size(max = 200, message = "收藏夹描述不能超过200个字符")
    private String description;

    @NotNull(message = "必须指定是否私密")
    private Boolean isPrivate;
} 
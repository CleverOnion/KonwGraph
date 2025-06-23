package com.cleveronion.knowgraph.common.core.domain;

import lombok.Data;

@Data
public class PageQueryDTO {
    private Integer pageNum = 1;
    private Integer pageSize = 10;
} 
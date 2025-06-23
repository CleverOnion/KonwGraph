package com.cleveronion.knowgraph.common.core.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResultVO<T> {
    private Long total;
    private List<T> records;
} 
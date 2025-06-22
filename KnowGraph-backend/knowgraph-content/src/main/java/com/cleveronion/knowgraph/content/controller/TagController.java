package com.cleveronion.knowgraph.content.controller;

import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.content.domain.vo.TagVO;
import com.cleveronion.knowgraph.content.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping
    public R<List<TagVO>> getAllTags() {
        return R.ok(tagService.getAllTags());
    }
} 
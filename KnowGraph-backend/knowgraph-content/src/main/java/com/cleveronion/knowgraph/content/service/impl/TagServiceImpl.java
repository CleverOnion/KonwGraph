package com.cleveronion.knowgraph.content.service.impl;

import com.cleveronion.knowgraph.content.domain.entity.Tag;
import com.cleveronion.knowgraph.content.domain.vo.TagVO;
import com.cleveronion.knowgraph.content.mapper.TagMapper;
import com.cleveronion.knowgraph.content.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagMapper tagMapper;

    @Override
    public List<TagVO> getAllTags() {
        // 为了提高性能，可以对标签列表做缓存
        return tagMapper.selectAll().stream()
                .map(this::mapToTagVO)
                .collect(Collectors.toList());
    }
    
    private TagVO mapToTagVO(Tag tag) {
        TagVO vo = new TagVO();
        BeanUtils.copyProperties(tag, vo);
        return vo;
    }
} 
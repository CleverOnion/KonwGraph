package com.cleveronion.knowgraph.content.service.impl;

import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.content.domain.dto.CategoryCreateDTO;
import com.cleveronion.knowgraph.content.domain.dto.CategoryUpdateDTO;
import com.cleveronion.knowgraph.content.domain.entity.Category;
import com.cleveronion.knowgraph.content.domain.vo.CategoryVO;
import com.cleveronion.knowgraph.content.mapper.CategoryMapper;
import com.cleveronion.knowgraph.content.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryMapper categoryMapper;

    @Override
    public List<CategoryVO> getAllCategories() {
        List<Category> categories = categoryMapper.selectAll();
        return categories.stream().map(this::toVO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CategoryVO createCategory(CategoryCreateDTO createDTO) {
        Category category = new Category();
        category.setName(createDTO.getName());
        category.setSlug(createDTO.getSlug());
        category.setDescription(createDTO.getDescription());
        int rows = categoryMapper.insert(category);
        if (rows != 1) {
            throw new ServiceException("创建分类失败");
        }
        return toVO(category);
    }

    @Override
    @Transactional
    public CategoryVO updateCategory(Integer id, CategoryUpdateDTO updateDTO) {
        Category category = categoryMapper.selectById(id);
        if (category == null) {
            throw new ServiceException("分类不存在");
        }
        category.setName(updateDTO.getName());
        category.setSlug(updateDTO.getSlug());
        category.setDescription(updateDTO.getDescription());
        int rows = categoryMapper.update(category);
        if (rows != 1) {
            throw new ServiceException("更新分类失败");
        }
        return toVO(category);
    }

    @Override
    @Transactional
    public void deleteCategory(Integer id) {
        Category category = categoryMapper.selectById(id);
        if (category == null) {
            throw new ServiceException("分类不存在");
        }
        int rows = categoryMapper.deleteById(id);
        if (rows != 1) {
            throw new ServiceException("删除分类失败");
        }
    }

    private CategoryVO toVO(Category category) {
        if (category == null) return null;
        CategoryVO vo = new CategoryVO();
        vo.setId(category.getId());
        vo.setName(category.getName());
        vo.setSlug(category.getSlug());
        return vo;
    }
}

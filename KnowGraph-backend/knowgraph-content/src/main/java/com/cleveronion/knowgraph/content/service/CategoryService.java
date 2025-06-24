package com.cleveronion.knowgraph.content.service;

import com.cleveronion.knowgraph.content.domain.dto.CategoryCreateDTO;
import com.cleveronion.knowgraph.content.domain.dto.CategoryUpdateDTO;
import com.cleveronion.knowgraph.content.domain.vo.CategoryVO;

import java.util.List;

public interface CategoryService {

    List<CategoryVO> getAllCategories();

    CategoryVO getCategoryById(Integer id);

    CategoryVO createCategory(CategoryCreateDTO createDTO);

    CategoryVO updateCategory(Integer id, CategoryUpdateDTO updateDTO);

    void deleteCategory(Integer id);
}
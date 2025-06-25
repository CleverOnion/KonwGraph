package com.cleveronion.knowgraph.content.service.impl;

import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.content.domain.dto.CategoryCreateDTO;
import com.cleveronion.knowgraph.content.domain.dto.CategoryUpdateDTO;
import com.cleveronion.knowgraph.content.domain.entity.Category;
import com.cleveronion.knowgraph.content.domain.vo.CategoryVO;
import com.cleveronion.knowgraph.content.mapper.CategoryMapper;
import com.cleveronion.knowgraph.content.mapper.PostMapper;
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
    private final PostMapper postMapper;

    @Override
    public List<CategoryVO> getAllCategories() {
        List<Category> categories = categoryMapper.selectAll();
        return categories.stream().map(this::toVO).collect(Collectors.toList());
    }

    @Override
    public CategoryVO getCategoryById(Integer id) {
        Category category = categoryMapper.selectById(id);
        if (category == null) {
            throw new ServiceException("分类不存在");
        }
        return toVO(category);
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
        
        // 检查该分类下是否有文章
        int postCount = postMapper.countByCategoryId(id);
        if (postCount > 0) {
            // 查找或创建默认分类
            Category defaultCategory = getOrCreateDefaultCategory();
            
            // 将该分类下的所有文章转移到默认分类
            int updatedPosts = postMapper.updateCategoryId(id, defaultCategory.getId());
            if (updatedPosts != postCount) {
                throw new ServiceException("文章转移失败");
            }
        }
        
        // 删除分类
        int rows = categoryMapper.deleteById(id);
        if (rows != 1) {
            throw new ServiceException("删除分类失败");
        }
    }
    
    /**
     * 获取或创建默认分类
     * @return 默认分类
     */
    private Category getOrCreateDefaultCategory() {
        // 先查找是否存在默认分类
        Category defaultCategory = categoryMapper.selectDefaultCategory();
        
        if (defaultCategory == null) {
            // 如果不存在，则创建默认分类
            defaultCategory = Category.builder()
                    .name("默认分类")
                    .slug("default")
                    .description("系统默认分类，用于存放未分类的文章")
                    .build();
            
            int rows = categoryMapper.insert(defaultCategory);
            if (rows != 1) {
                throw new ServiceException("创建默认分类失败");
            }
        }
        
        return defaultCategory;
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

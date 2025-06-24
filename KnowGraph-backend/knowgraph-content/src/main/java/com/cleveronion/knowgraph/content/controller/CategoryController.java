package com.cleveronion.knowgraph.content.controller;

import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import com.cleveronion.knowgraph.common.core.domain.R;
import com.cleveronion.knowgraph.content.domain.dto.CategoryCreateDTO;
import com.cleveronion.knowgraph.content.domain.dto.CategoryUpdateDTO;
import com.cleveronion.knowgraph.content.domain.vo.CategoryVO;
import com.cleveronion.knowgraph.content.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public R<List<CategoryVO>> getAllCategories() {
        return R.ok(categoryService.getAllCategories());
    }

    @PostMapping
    //@SaCheckRole("ADMIN")
    public R<CategoryVO> createCategory(@RequestBody CategoryCreateDTO createDTO) {
        return R.ok(categoryService.createCategory(createDTO));
    }

    @PutMapping("/{id}")
    @SaCheckRole("ADMIN")
    public R<CategoryVO> updateCategory(@PathVariable Integer id, @RequestBody CategoryUpdateDTO updateDTO) {
        return R.ok(categoryService.updateCategory(id, updateDTO));
    }

    @DeleteMapping("/{id}")
    @SaCheckRole("ADMIN")
    public R<Void> deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
        return R.ok();
    }

    @RequestMapping("isLogin")
    public String isLogin() {
        return StpUtil.getTokenValue() + " " + StpUtil.getLoginId() + " " + StpUtil.getLoginDevice();
    }
} 
package com.cleveronion.knowgraph.content.service.impl;

import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.content.domain.dto.PostCreateDTO;
import com.cleveronion.knowgraph.content.domain.dto.PostQueryDTO;
import com.cleveronion.knowgraph.content.domain.dto.PostUpdateDTO;
import com.cleveronion.knowgraph.content.domain.entity.Category;
import com.cleveronion.knowgraph.content.domain.entity.Post;
import com.cleveronion.knowgraph.content.domain.entity.PostTag;
import com.cleveronion.knowgraph.content.domain.entity.Tag;
import com.cleveronion.knowgraph.content.domain.enums.PostStatus;
import com.cleveronion.knowgraph.content.domain.vo.CategoryVO;
import com.cleveronion.knowgraph.content.domain.vo.PostDetailVO;
import com.cleveronion.knowgraph.content.domain.vo.PostSimpleVO;
import com.cleveronion.knowgraph.content.domain.vo.TagVO;
import com.cleveronion.knowgraph.content.mapper.CategoryMapper;
import com.cleveronion.knowgraph.content.mapper.PostMapper;
import com.cleveronion.knowgraph.content.mapper.PostTagMapper;
import com.cleveronion.knowgraph.content.mapper.TagMapper;
import com.cleveronion.knowgraph.content.service.PostService;
import com.cleveronion.knowgraph.user.domain.entity.User;
import com.cleveronion.knowgraph.user.mapper.UserMapper;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import lombok.RequiredArgsConstructor;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostMapper postMapper;
    private final TagMapper tagMapper;
    private final PostTagMapper postTagMapper;
    private final CategoryMapper categoryMapper;
    private final UserMapper userMapper; // 跨模块注入

    private final Parser markdownParser = Parser.builder().build();
    private final HtmlRenderer htmlRenderer = HtmlRenderer.builder().build();

    @Override
    @Transactional
    public Long createPost(PostCreateDTO createDTO, Long userId) {
        // 1. 转换 Markdown
        Node document = markdownParser.parse(createDTO.getContentMd());
        String contentHtml = htmlRenderer.render(document);

        // 2. 构建 Post 实体
        Post post = new Post();
        post.setUserId(userId);
        post.setCategoryId(createDTO.getCategoryId());
        post.setTitle(createDTO.getTitle());
        post.setSummary(createDTO.getSummary());
        post.setContentMd(createDTO.getContentMd());
        post.setContentHtml(contentHtml);
        post.setStatus(PostStatus.PUBLISHED); // 默认为直接发布
        post.setIsFeatured(false);
        post.setPublishedAt(LocalDateTime.now());

        // 3. 插入 Post 到数据库
        postMapper.insert(post);
        Long postId = post.getId();

        // 4. 处理标签
        handlePostTags(createDTO.getTags(), postId);

        return postId;
    }

    private void handlePostTags(List<String> tagNames, Long postId) {
        if (CollectionUtils.isEmpty(tagNames)) {
            return;
        }

        // 查询已存在的标签
        List<Tag> existingTags = tagMapper.selectByNames(tagNames);
        List<String> existingTagNames = existingTags.stream().map(Tag::getName).collect(Collectors.toList());

        // 找出需要新建的标签
        List<String> newTagNames = tagNames.stream()
                .filter(name -> !existingTagNames.contains(name))
                .collect(Collectors.toList());

        List<Tag> newTags = new ArrayList<>();
        if (!CollectionUtils.isEmpty(newTagNames)) {
            newTags = newTagNames.stream().map(name -> {
                Tag tag = new Tag();
                tag.setName(name);
                tag.setSlug(name.toLowerCase().replaceAll("\\s+", "-")); // 简单的 slug 生成
                return tag;
            }).collect(Collectors.toList());
            tagMapper.batchInsert(newTags);
        }

        // 合并所有标签ID
        List<Integer> allTagIds = new ArrayList<>();
        existingTags.forEach(tag -> allTagIds.add(tag.getId()));
        newTags.forEach(tag -> allTagIds.add(tag.getId()));

        // 创建关联关系
        List<PostTag> postTags = allTagIds.stream().map(tagId -> {
            PostTag postTag = new PostTag();
            postTag.setPostId(postId);
            postTag.setTagId(tagId);
            return postTag;
        }).collect(Collectors.toList());

        postTagMapper.batchInsert(postTags);
    }


    @Override
    public PostDetailVO getPostDetail(Long postId) {
        Post post = postMapper.selectById(postId);
        if (post == null) {
            throw new ServiceException("文章不存在");
        }

        // 1. 查询作者信息
        User author = userMapper.selectById(post.getUserId());
        UserProfileVO authorVO = mapToUserProfileVO(author);

        // 2. 查询分类信息
        Category category = categoryMapper.selectById(post.getCategoryId());
        CategoryVO categoryVO = mapToCategoryVO(category);

        // 3. 查询标签信息
        List<Tag> tags = tagMapper.selectTagsByPostId(postId);
        List<TagVO> tagVOs = tags.stream().map(this::mapToTagVO).collect(Collectors.toList());

        // 4. 组装VO
        return buildPostDetailVO(post, authorVO, categoryVO, tagVOs);
    }

    private UserProfileVO mapToUserProfileVO(User user) {
        if (user == null) return null;
        UserProfileVO vo = new UserProfileVO();
        vo.setId(user.getId());
        vo.setUsername(user.getUsername());
        vo.setNickname(user.getNickname());
        vo.setAvatarUrl(user.getAvatarUrl());
        vo.setBio(user.getBio());
        vo.setPoints(user.getPoints());
        return vo;
    }

    private CategoryVO mapToCategoryVO(Category category) {
        if (category == null) return null;
        CategoryVO vo = new CategoryVO();
        vo.setId(category.getId());
        vo.setName(category.getName());
        vo.setSlug(category.getSlug());
        return vo;
    }

    private TagVO mapToTagVO(Tag tag) {
        if (tag == null) return null;
        TagVO vo = new TagVO();
        vo.setId(tag.getId());
        vo.setName(tag.getName());
        vo.setSlug(tag.getSlug());
        return vo;
    }

    private PostDetailVO buildPostDetailVO(Post post, UserProfileVO author, CategoryVO category, List<TagVO> tags) {
        PostDetailVO vo = new PostDetailVO();
        vo.setId(post.getId());
        vo.setTitle(post.getTitle());
        vo.setContentHtml(post.getContentHtml());
        vo.setPublishedAt(post.getPublishedAt());
        vo.setViewCount(post.getViewCount());
        vo.setLikeCount(post.getLikeCount());
        vo.setCommentCount(post.getCommentCount());
        vo.setCollectCount(post.getCollectCount());
        vo.setAuthor(author);
        vo.setCategory(category);
        vo.setTags(tags);
        return vo;
    }

    @Override
    public List<PostSimpleVO> getPostList(PostQueryDTO queryDTO) {
        // 1. 查询文章基础信息列表
        List<Post> posts = postMapper.selectList(queryDTO);
        if (CollectionUtils.isEmpty(posts)) {
            return Collections.emptyList();
        }

        // 2. 批量获取作者信息，避免N+1查询
        List<Long> userIds = posts.stream().map(Post::getUserId).distinct().collect(Collectors.toList());
        Map<Long, User> userMap = userMapper.selectByIds(userIds).stream()
                .collect(Collectors.toMap(User::getId, user -> user));

        // 3. 组装成VO列表
        return posts.stream().map(post -> {
            PostSimpleVO vo = new PostSimpleVO();
            vo.setId(post.getId());
            vo.setTitle(post.getTitle());
            vo.setSummary(post.getSummary());
            vo.setPublishedAt(post.getPublishedAt());
            vo.setViewCount(post.getViewCount());
            vo.setLikeCount(post.getLikeCount());
            vo.setCommentCount(post.getCommentCount());
            vo.setAuthor(mapToUserProfileVO(userMap.get(post.getUserId())));
            return vo;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updatePost(Long postId, PostUpdateDTO updateDTO, Long userId) {
        // 1. 校验文章是否存在
        Post existingPost = postMapper.selectById(postId);
        if (existingPost == null) {
            throw new ServiceException("文章不存在");
        }

        // 2. 校验操作者是否为文章作者
        if (!Objects.equals(existingPost.getUserId(), userId)) {
            throw new ServiceException("无权修改此文章");
        }

        // 3. 构建待更新的 Post 实体
        Post postToUpdate = new Post();
        postToUpdate.setId(postId);
        postToUpdate.setTitle(updateDTO.getTitle());
        postToUpdate.setSummary(updateDTO.getSummary());
        postToUpdate.setCategoryId(updateDTO.getCategoryId());

        // 如果内容有变，重新渲染HTML
        if (updateDTO.getContentMd() != null) {
            Node document = markdownParser.parse(updateDTO.getContentMd());
            String contentHtml = htmlRenderer.render(document);
            postToUpdate.setContentMd(updateDTO.getContentMd());
            postToUpdate.setContentHtml(contentHtml);
        }

        // 4. 更新文章基本信息
        postMapper.update(postToUpdate);

        // 5. 更新标签（先删后加）
        if (updateDTO.getTags() != null) {
            postTagMapper.deleteByPostId(postId);
            handlePostTags(updateDTO.getTags(), postId);
        }
    }

    @Override
    public void deletePost(Long postId, Long userId) {
        int rows = postMapper.softDelete(postId, userId);
        if (rows == 0) {
            // 如果影响行数为0，说明文章不存在或用户无权删除
            throw new ServiceException("删除失败，文章不存在或无权限");
        }
    }
} 
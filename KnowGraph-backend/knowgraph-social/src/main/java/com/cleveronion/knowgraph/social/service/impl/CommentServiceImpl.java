package com.cleveronion.knowgraph.social.service.impl;

import com.cleveronion.knowgraph.common.exception.ServiceException;
import com.cleveronion.knowgraph.content.mapper.PostMapper;
import com.cleveronion.knowgraph.social.domain.dto.CommentCreateDTO;
import com.cleveronion.knowgraph.social.domain.entity.Comment;
import com.cleveronion.knowgraph.social.domain.enums.CommentStatus;
import com.cleveronion.knowgraph.social.domain.vo.CommentVO;
import com.cleveronion.knowgraph.social.mapper.CommentMapper;
import com.cleveronion.knowgraph.social.service.CommentService;
import com.cleveronion.knowgraph.user.domain.entity.User;
import com.cleveronion.knowgraph.user.mapper.UserMapper;
import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentMapper commentMapper;
    private final PostMapper postMapper;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public CommentVO createComment(Long postId, Long userId, CommentCreateDTO createDTO) {
        // 1. 插入评论记录
        Comment comment = new Comment();
        comment.setPostId(postId);
        comment.setUserId(userId);
        comment.setParentId(createDTO.getParentId());
        comment.setContent(createDTO.getContent());
        comment.setStatus(CommentStatus.VISIBLE);
        commentMapper.insert(comment);

        // 2. 更新文章评论数
        postMapper.incrementCommentCount(postId);

        // 3. 查询作者信息并组装成VO返回
        User author = userMapper.selectById(userId);
        return mapToCommentVO(comment, author);
    }

    @Override
    public List<CommentVO> getCommentTree(Long postId) {
        // 1. 一次性查询出文章下的所有评论
        List<Comment> allComments = commentMapper.selectVisibleByPostId(postId);
        if (CollectionUtils.isEmpty(allComments)) {
            return new ArrayList<>();
        }

        // 2. 批量获取所有评论的作者信息
        List<Long> userIds = allComments.stream().map(Comment::getUserId).distinct().collect(Collectors.toList());
        Map<Long, User> userMap = userMapper.selectByIds(userIds).stream()
                .collect(Collectors.toMap(User::getId, u -> u));

        // 3. 将所有评论转换为VO，并用ID建立Map方便查找
        Map<Long, CommentVO> voMap = allComments.stream()
                .map(c -> {
                    CommentVO vo = mapToCommentVO(c, userMap.get(c.getUserId()));
                    vo.setChildren(new ArrayList<>()); // 初始化children列表
                    return vo;
                })
                .collect(Collectors.toMap(CommentVO::getId, v -> v));

        // 4. 构建树形结构
        List<CommentVO> rootComments = new ArrayList<>();
        voMap.values().forEach(vo -> {
            if (vo.getParentId() == null) {
                // 顶级评论
                rootComments.add(vo);
            } else {
                // 子评论，找到它的父评论并把自己加进去
                CommentVO parent = voMap.get(vo.getParentId());
                if (parent != null) {
                    parent.getChildren().add(vo);
                }
            }
        });

        return rootComments;
    }

    private CommentVO mapToCommentVO(Comment comment, User author) {
        CommentVO vo = new CommentVO();
        BeanUtils.copyProperties(comment, vo);
        if (author != null) {
            UserProfileVO authorVO = new UserProfileVO();
            BeanUtils.copyProperties(author, authorVO);
            vo.setAuthor(authorVO);
        }
        return vo;
    }
} 
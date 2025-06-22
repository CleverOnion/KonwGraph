package com.cleveronion.knowgraph.content.domain.vo;

import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 文章详情视图对象
 */
@Data
public class PostDetailVO {

    private Long id;
    private String title;
    private String contentHtml;
    private LocalDateTime publishedAt;
    private Integer viewCount;
    private Integer likeCount;
    private Integer commentCount;
    private Integer collectCount;

    /**
     * 作者信息
     */
    private UserProfileVO author;

    /**
     * 分类信息
     */
    private CategoryVO category;

    /**
     * 标签列表
     */
    private List<TagVO> tags;

} 
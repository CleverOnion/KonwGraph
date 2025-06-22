package com.cleveronion.knowgraph.content.domain.vo;

import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 文章列表的简化视图对象
 */
@Data
public class PostSimpleVO {

    private Long id;
    private String title;
    private String summary;
    private LocalDateTime publishedAt;
    private Integer viewCount;
    private Integer likeCount;
    private Integer commentCount;

    /**
     * 作者信息
     */
    private UserProfileVO author;
} 
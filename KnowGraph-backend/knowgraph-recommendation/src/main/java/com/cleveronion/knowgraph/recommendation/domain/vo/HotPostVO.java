package com.cleveronion.knowgraph.recommendation.domain.vo;

import com.cleveronion.knowgraph.user.domain.vo.UserProfileVO;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 热门文章视图对象
 */
@Data
public class HotPostVO {

    private Long id;
    private String title;
    private String summary;
    private LocalDateTime publishedAt;
    private Integer viewCount;
    private Integer likeCount;
    private Integer commentCount;
    
    /**
     * 热度值
     */
    private Double hotScore;

    /**
     * 作者信息
     */
    private UserProfileVO author;
}
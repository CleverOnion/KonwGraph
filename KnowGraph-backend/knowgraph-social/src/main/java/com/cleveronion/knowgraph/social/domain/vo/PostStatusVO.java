package com.cleveronion.knowgraph.social.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostStatusVO {
    
    /**
     * 是否已点赞
     */
    private boolean liked;
    
    /**
     * 是否已收藏
     */
    private boolean bookmarked;
}
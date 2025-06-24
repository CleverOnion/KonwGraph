import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Avatar, Tag, Divider, Tooltip, message, Input, Spin } from "antd";
import { ArrowLeftOutlined, HeartOutlined, HeartFilled, StarOutlined, StarFilled, ShareAltOutlined, EyeOutlined, MessageOutlined, ClockCircleOutlined, UserOutlined, CalendarOutlined, CommentOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getPostDetail, likePost, unlikePost, bookmarkPost, unbookmarkPost, getPostStatus, incrementViewCount } from "../../api/post";
import { getComments, createComment } from "../../api/comment";
import './PostDetailPage.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [viewCountIncremented, setViewCountIncremented] = useState(false);

  const [currentUserId, setCurrentUserId] = useState(null);

  // 获取文章详情
  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const [postResponse, statusResponse] = await Promise.all([
        getPostDetail(id),
        getPostStatus(id)
      ]);
      
      if (postResponse.code === 200) {
        setPost(postResponse.data);
        setLikeCount(postResponse.data.likeCount || 0);
      } else {
        message.error(postResponse.msg || "获取文章详情失败");
        return;
      }
      
      if (statusResponse.code === 200) {
        setLiked(statusResponse.data.liked || false);
        setBookmarked(statusResponse.data.bookmarked || false);
      }
      
      // 增加浏览量（只在首次加载时增加）
      if (!viewCountIncremented) {
        try {
          await incrementViewCount(id);
          setViewCountIncremented(true);
        } catch (error) {
          console.error("增加浏览量失败:", error);
        }
      }
    } catch (error) {
      console.error("获取文章详情失败:", error);
      message.error("获取文章详情失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  // 处理点赞
  const handleLike = async () => {
    // 检查用户是否登录
    const tokenName = localStorage.getItem("tokenName");
    const tokenValue = localStorage.getItem("tokenValue");
    if (!tokenName || !tokenValue) {
      message.error("请先登录后再进行点赞操作");
      return;
    }

    // 检查文章ID是否存在
    if (!id) {
      message.error("文章ID不存在");
      return;
    }

    try {
      // 调用切换点赞状态接口
      const response = await likePost(id);
      if (response.code === 200) {
        // 切换点赞状态
        const newLikedState = !liked;
        setLiked(newLikedState);
        setLikeCount(prev => newLikedState ? prev + 1 : Math.max(0, prev - 1));
        Message.success(newLikedState ? "点赞成功" : "取消点赞");
      } else {
        console.error("点赞操作失败:", response);
        Message.error(response.msg || "操作失败");
      }
    } catch (error) {
      console.error("点赞操作失败:", error);
      // 检查是否是网络错误或认证错误
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          message.error("登录已过期，请重新登录");
        } else if (status === 403) {
          message.error("没有权限进行此操作");
        } else if (status === 404) {
          message.error("文章不存在");
        } else {
          message.error(`服务器错误: ${error.response.data?.msg || '系统异常'}`);
        }
      } else if (error.request) {
        message.error("网络连接失败，请检查网络");
      } else {
        message.error("操作失败，请重试");
      }
    }
  };

  // 收藏功能
  const handleBookmark = async () => {
    // 检查用户是否登录
    const tokenName = localStorage.getItem("tokenName");
    const tokenValue = localStorage.getItem("tokenValue");
    if (!tokenName || !tokenValue) {
      message.error("请先登录后再进行收藏操作");
      return;
    }

    // 检查文章ID是否存在
    if (!id) {
      message.error("文章ID不存在");
      return;
    }

    try {
      if (bookmarked) {
        // 取消收藏
        const response = await unbookmarkPost(id);
        if (response.code === 200) {
          setBookmarked(false);
          message.success("取消收藏");
        } else {
          console.error("取消收藏失败:", response);
          message.error(response.msg || "取消收藏失败");
        }
      } else {
        // 收藏到默认收藏夹
        const response = await bookmarkPost(id);
        if (response.code === 200) {
          setBookmarked(true);
          message.success("收藏成功");
        } else {
          console.error("收藏失败:", response);
          message.error(response.msg || "收藏失败");
        }
      }
    } catch (error) {
      console.error("收藏操作失败:", error);
      // 检查是否是网络错误或认证错误
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          message.error("登录已过期，请重新登录");
        } else if (status === 403) {
          message.error("没有权限进行此操作");
        } else if (status === 404) {
          message.error("文章不存在");
        } else {
          message.error(`服务器错误: ${error.response.data?.msg || '系统异常'}`);
        }
      } else if (error.request) {
        message.error("网络连接失败，请检查网络");
      } else {
        message.error("操作失败，请重试");
      }
    }
  };



  // 分享功能
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("链接已复制到剪贴板");
  };

  // 获取评论列表
  const fetchComments = async () => {
    try {
      setCommentLoading(true);
      const response = await getComments(id);
      if (response.code === 200) {
        setComments(response.data || []);
      } else {
        message.error(response.message || "获取评论失败");
      }
    } catch (error) {
      console.error("获取评论失败:", error);
      message.error("获取评论失败，请重试");
    } finally {
      setCommentLoading(false);
    }
  };

  // 提交评论
  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      message.warning("请输入评论内容");
      return;
    }

    try {
      const commentData = {
        content: newComment.trim(),
        parentId: replyTo?.id || null,
      };
      
      const response = await createComment(id, commentData);
      if (response.code === 200) {
        message.success("评论发布成功");
        setNewComment("");
        setReplyTo(null);
        fetchComments(); // 重新获取评论列表
      } else {
        message.error(response.message || "评论发布失败");
      }
    } catch (error) {
      console.error("评论发布失败:", error);
      message.error("评论发布失败，请重试");
    }
  };

  // 回复评论
  const handleReply = (comment) => {
    setReplyTo(comment);
    setNewComment(`@${comment.author?.nickname || comment.author?.username} `);
  };

  // 取消回复
  const handleCancelReply = () => {
    setReplyTo(null);
    setNewComment("");
  };

  // 格式化时间
  const formatTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (id) {
      setViewCountIncremented(false); // 重置浏览量增加标志
      fetchPostDetail();
      fetchComments();
    }
    
    // 获取当前用户ID
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        setCurrentUserId(user.id);
      } catch (error) {
        console.error('解析用户信息失败:', error);
      }
    }
  }, [id]);

  if (loading) {
    return (
      <div className="post-detail-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-error">
        <h2>文章不存在</h2>
        <Button type="primary" onClick={() => navigate("/")}>
          返回首页
        </Button>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      {/* 返回按钮 */}
      <div className="post-detail-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="back-button"
        >
          返回
        </Button>
      </div>

      {/* 文章主体 */}
      <article className="post-detail-article">
        {/* 文章头部 */}
        <header className="post-header">
          <div className="post-category">
            <Tag color="blue" className="category-tag">
              {post.category?.name || "未分类"}
            </Tag>
          </div>
          
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <div className="author-info">
              <Avatar
                size={48}
                src={post.author?.avatarUrl}
                icon={<UserOutlined />}
                className="author-avatar"
              />
              <div className="author-details">
                <div className="author-name">{post.author?.nickname || post.author?.username || "匿名用户"}</div>
                <div className="post-time">
                  <CalendarOutlined className="time-icon" />
                  {formatTime(post.publishedAt || post.createdAt)}
                </div>
              </div>
            </div>
            
            <div className="post-stats">
              <span className="stat-item">
                <EyeOutlined /> {post.viewCount || 0}
              </span>
              <span className="stat-item">
                <CommentOutlined /> {post.commentCount || 0}
              </span>
            </div>
          </div>
        </header>

        {/* 文章摘要 */}
        {post.summary && (
          <div className="post-summary">
            <p>{post.summary}</p>
          </div>
        )}

        <Divider className="content-divider" />

        {/* 文章内容 */}
        <div className="post-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => <h1 className="content-h1">{children}</h1>,
              h2: ({ children }) => <h2 className="content-h2">{children}</h2>,
              h3: ({ children }) => <h3 className="content-h3">{children}</h3>,
              p: ({ children }) => <p className="content-p">{children}</p>,
              code: ({ inline, children }) => 
                inline ? (
                  <code className="inline-code">{children}</code>
                ) : (
                  <pre className="code-block">
                    <code>{children}</code>
                  </pre>
                ),
              blockquote: ({ children }) => (
                <blockquote className="content-blockquote">{children}</blockquote>
              ),
            }}
          >
            {post.contentHtml || post.contentMd || post.content || "暂无内容"}
          </ReactMarkdown>
        </div>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            <Divider className="tags-divider" />
            <div className="tags-container">
              <span className="tags-label">标签：</span>
              {post.tags.map((tag, index) => (
                <Tag key={index} className="post-tag">
                  {typeof tag === 'object' ? tag.name : tag}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* 评论区域 */}
        <div className="comments-section">
          <Divider className="comments-divider">
            <span className="comments-title">评论 ({comments.length})</span>
          </Divider>

          {/* 评论输入框 */}
          <div className="comment-input-section">
            {replyTo && (
              <div className="reply-info">
                <span>回复 @{replyTo.author?.nickname || replyTo.author?.username}:</span>
                <Button type="link" size="small" onClick={handleCancelReply}>
                  取消回复
                </Button>
              </div>
            )}
            <div className="comment-input-wrapper">
              <Input.TextArea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyTo ? "写下你的回复..." : "写下你的评论..."}
                rows={3}
                className="comment-input"
              />
              <div className="comment-actions">
                <Button
                  type="primary"
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                >
                  {replyTo ? "回复" : "发布评论"}
                </Button>
              </div>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comments-list">
            {commentLoading ? (
              <div className="comments-loading">
                <Spin size="large" />
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                />
              ))
            ) : (
              <div className="no-comments">
                <p>暂无评论，快来发表第一条评论吧！</p>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* 浮动操作栏 */}
      <div className="floating-actions">
        <Tooltip title={liked ? "取消点赞" : "点赞"}>
          <Button
            type={liked ? "primary" : "default"}
            icon={liked ? <HeartFilled /> : <HeartOutlined />}
            onClick={handleLike}
            className={`action-btn like-btn ${liked ? "liked" : ""}`}
          >
            {likeCount}
          </Button>
        </Tooltip>
        
        <Tooltip title={bookmarked ? "取消收藏" : "收藏"}>
          <Button
            type={bookmarked ? "primary" : "default"}
            icon={bookmarked ? <StarFilled /> : <StarOutlined />}
            onClick={handleBookmark}
            className={`action-btn bookmark-btn ${bookmarked ? "bookmarked" : ""}`}
          />
        </Tooltip>
        
        <Tooltip title="分享">
          <Button
            type="default"
            icon={<ShareAltOutlined />}
            onClick={handleShare}
            className="action-btn share-btn"
          />
        </Tooltip>
      </div>
    </div>
  );
};

// 评论项组件
const CommentItem = ({ comment, onReply, level = 0 }) => {
  const formatCommentTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`comment-item ${level > 0 ? 'comment-reply' : ''}`} style={{ marginLeft: level * 20 }}>
      <div className="comment-header">
        <Avatar
          size={32}
          src={comment.author?.avatarUrl}
          icon={<UserOutlined />}
          className="comment-avatar"
        />
        <div className="comment-meta">
          <span className="comment-author">
            {comment.author?.nickname || comment.author?.username || "匿名用户"}
          </span>
          <span className="comment-time">{formatCommentTime(comment.createdAt)}</span>
        </div>
      </div>
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>
      <div className="comment-actions">
        <Button type="link" size="small" onClick={() => onReply(comment)}>
          回复
        </Button>
      </div>
      {/* 子评论 */}
      {comment.children && comment.children.length > 0 && (
        <div className="comment-children">
          {comment.children.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              onReply={onReply}
              level={level + 1}
            />
          ))}
        </div>
      )}
      
     
    </div>
  );
};

export default PostDetailPage;

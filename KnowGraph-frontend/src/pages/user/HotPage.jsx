import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHotPosts } from '../../api/recommendation';
import { getPosts, likePost, unlikePost, bookmarkPost, unbookmarkPost, getPostStatus } from "../../api/post";
import { getMyProfile } from '../../api/personal';
import Message from '../../components/Message';
import TopNavbar from '../../components/TopNavbar';
import Sidebar from '../../components/Sidebar';
import './HotPage.css';
import '../../styles/sidebar.css';

const HotPage = () => {
  const navigate = useNavigate();
  const [hotPosts, setHotPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  // 获取热门文章列表
  const fetchHotPosts = async (page = 1, append = false) => {
    try {
      setLoading(true);
      const response = await getHotPosts({
        pageNum: page,
        pageSize: pageSize,
      });
      if (response.code === 200) {
        const newPosts = response.data?.list || [];
        
        // 检查用户是否登录
        const tokenName = localStorage.getItem("tokenName");
        const tokenValue = localStorage.getItem("tokenValue");
        
        let postsWithStatus = newPosts;
        if (tokenName && tokenValue) {
          // 如果用户已登录，获取每篇文章的点赞收藏状态
          postsWithStatus = await Promise.all(
            newPosts.map(async (post) => {
              try {
                const statusResponse = await getPostStatus(post.id);
                if (statusResponse.code === 200) {
                  return {
                    ...post,
                    liked: statusResponse.data.liked || false,
                    bookmarked: statusResponse.data.bookmarked || false
                  };
                }
              } catch (error) {
                console.error(`获取文章${post.id}状态失败:`, error);
              }
              return {
                ...post,
                liked: false,
                bookmarked: false
              };
            })
          );
        } else {
          // 如果用户未登录，设置默认状态
          postsWithStatus = newPosts.map(post => ({
            ...post,
            liked: false,
            bookmarked: false
          }));
        }
        
        if (append) {
          setHotPosts(prev => [...prev, ...postsWithStatus]);
        } else {
          setHotPosts(postsWithStatus);
        }
        setHasMore(newPosts.length === pageSize);
      } else {
        Message.error(response.msg || '获取热门文章失败');
      }
    } catch (error) {
      console.error('获取热门文章失败:', error);
      Message.error('获取热门文章失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 加载更多
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchHotPosts(nextPage, true);
    }
  };

  // 处理点赞
  const handleLike = async (postId, index, isLiked) => {
    // 检查用户是否登录
    const tokenName = localStorage.getItem("tokenName");
    const tokenValue = localStorage.getItem("tokenValue");
    if (!tokenName || !tokenValue) {
      Message.error("请先登录后再进行点赞操作");
      return;
    }

    try {
      // 调用切换点赞状态接口
      const response = await likePost(postId);
      if (response.code === 200) {
        // 更新本地状态
        const updatedPosts = [...hotPosts];
        const newLikedState = !isLiked;
        updatedPosts[index].liked = newLikedState;
        updatedPosts[index].likeCount = newLikedState 
          ? (updatedPosts[index].likeCount || 0) + 1 
          : Math.max(0, (updatedPosts[index].likeCount || 1) - 1);
        setHotPosts(updatedPosts);
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
          Message.error("登录已过期，请重新登录");
        } else if (status === 403) {
          Message.error("没有权限进行此操作");
        } else if (status === 404) {
          Message.error("文章不存在");
        } else {
          Message.error(`服务器错误: ${error.response.data?.msg || '系统异常'}`);
        }
      } else if (error.request) {
        Message.error("网络连接失败，请检查网络");
      } else {
        Message.error("操作失败，请重试");
      }
    }
  };
  
  // 处理个人空间点击
  const handleProfileClick = async () => {
    // 检查用户是否登录
    const tokenName = localStorage.getItem("tokenName");
    const tokenValue = localStorage.getItem("tokenValue");
    if (!tokenName || !tokenValue) {
      Message.error("请先登录后再访问个人空间");
      navigate("/login");
      return;
    }

    try {
      const response = await getMyProfile();
      if (response.code === 200) {
        const userId = response.data.id;
        navigate(`/users/${userId}`);
      } else {
        Message.error("获取用户信息失败");
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
      Message.error("获取用户信息失败，请重试");
    }
  };

  // 处理收藏
  const handleBookmark = async (postId, index, isBookmarked) => {
    // 检查用户是否登录
    const tokenName = localStorage.getItem("tokenName");
    const tokenValue = localStorage.getItem("tokenValue");
    if (!tokenName || !tokenValue) {
      Message.error("请先登录后再进行收藏操作");
      return;
    }

    try {
      if (isBookmarked) {
        // 取消收藏
        const response = await unbookmarkPost(postId);
        if (response.code === 200) {
          // 更新本地状态
          const updatedPosts = [...hotPosts];
          updatedPosts[index].bookmarked = false;
          setHotPosts(updatedPosts);
          Message.success("取消收藏");
        } else {
          console.error("取消收藏失败:", response);
          Message.error(response.msg || "取消收藏失败");
        }
      } else {
        // 收藏
        const response = await bookmarkPost(postId);
        if (response.code === 200) {
          // 更新本地状态
          const updatedPosts = [...hotPosts];
          updatedPosts[index].bookmarked = true;
          setHotPosts(updatedPosts);
          Message.success("收藏成功");
        } else {
          console.error("收藏失败:", response);
          Message.error(response.msg || "收藏失败");
        }
      }
    } catch (error) {
      console.error("收藏操作失败:", error);
      // 检查是否是网络错误或认证错误
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          Message.error("登录已过期，请重新登录");
        } else if (status === 403) {
          Message.error("没有权限进行此操作");
        } else if (status === 404) {
          Message.error("文章不存在");
        } else {
          Message.error(`服务器错误: ${error.response.data?.msg || '系统异常'}`);
        }
      } else if (error.request) {
        Message.error("网络连接失败，请检查网络");
      } else {
        Message.error("操作失败，请重试");
      }
    }
  };

  // 格式化时间
  const formatTime = (dateTime) => {
    if (!dateTime) return '';

    const now = new Date();
    const postTime = new Date(dateTime);
    const diffInMs = now - postTime;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}分钟前`;
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`;
    } else if (diffInDays < 30) {
      return `${diffInDays}天前`;
    } else {
      return postTime.toLocaleDateString();
    }
  };

  // 格式化热度值
  const formatHotScore = (score) => {
    if (!score) return '0';
    if (score >= 1000) {
      return (score / 1000).toFixed(1) + 'k';
    }
    return Math.round(score).toString();
  };

  useEffect(() => {
    fetchHotPosts();
  }, []);

  return (
    <div className="hot-page-bg">
      {/* 顶部导航栏 */}
      <TopNavbar className="hot-header" />

      <div className="hot-main-layout">
        {/* 左侧栏 */}
        <Sidebar activeItem="hot" className="app-sidebar hot-theme" />

        {/* 主内容区 */}
        <main className="hot-content">
          <div className="hot-page-header">
            <h1 className="hot-page-title">
              <span role="img" aria-label="fire">
                🔥
              </span>
              热门文章
            </h1>
            <p className="hot-page-subtitle">发现最受欢迎的优质内容</p>
          </div>

          {/* 热门文章列表 */}
          {loading && hotPosts.length === 0 ? (
            <div className="loading-container">
              <div className="loading-spinner">加载中...</div>
            </div>
          ) : hotPosts.length === 0 ? (
            <div className="empty-container">
              <div className="empty-text">暂无热门文章</div>
            </div>
          ) : (
            <>
              {hotPosts.map((post, index) => (
                <div className="hot-post" key={post.id}>
                  <div className="hot-post-rank">
                    <span className={`rank-number rank-${index + 1 <= 3 ? 'top' : 'normal'}`}>
                      #{index + 1}
                    </span>
                  </div>
                  <div className="hot-post-content">
                    <div className="hot-post-header">
                      <span className="hot-post-author">
                        {post.author?.nickname ||
                          post.author?.username ||
                          '匿名用户'}
                      </span>
                      <span className="hot-post-time">
                        · {formatTime(post.publishedAt)}
                      </span>
                      <div className="hot-score">
                        <span className="hot-score-icon">🔥</span>
                        <span className="hot-score-value">
                          {formatHotScore(post.hotScore)}
                        </span>
                      </div>
                    </div>
                    <h2
                      className="hot-post-title"
                      onClick={() => navigate(`/post/${post.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {post.title}
                    </h2>
                    {post.summary && (
                      <div className="hot-post-summary">{post.summary}</div>
                    )}
                    <div className="hot-post-meta">
                      <span>
                        by{' '}
                        <a href={`/user/${post.author?.id}`}>
                          {post.author?.nickname || post.author?.username}
                        </a>
                      </span>
                    </div>
                    <div className="hot-post-actions">
                      <button 
                        className={`hot-post-action ${post.liked ? 'hot-post-action-active' : ''}`} 
                        title={post.liked ? "取消点赞" : "点赞"}
                        onClick={() => handleLike(post.id, index, post.liked)}
                      >
                        <span role="img" aria-label="up">
                          👍
                        </span>{' '}
                        {post.likeCount || 0}
                      </button>
                      <button className="hot-post-action" title="评论">
                        <span role="img" aria-label="comment">
                          💬
                        </span>{' '}
                        {post.commentCount || 0}
                      </button>
                      <button className="hot-post-action" title="浏览">
                        <span role="img" aria-label="view">
                          👁️
                        </span>{' '}
                        {post.viewCount || 0}
                      </button>
                      <button className="hot-post-action" title="分享">
                        <span role="img" aria-label="share">
                          🔗
                        </span>
                      </button>
                      <button 
                        className={`hot-post-action ${post.bookmarked ? 'hot-post-action-active' : ''}`} 
                        title={post.bookmarked ? "取消收藏" : "收藏"}
                        onClick={() => handleBookmark(post.id, index, post.bookmarked)}
                      >
                        <span role="img" aria-label="fav">
                          {post.bookmarked ? '⭐' : '☆'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 加载更多按钮 */}
              {hasMore && (
                <div className="load-more-container">
                  <button 
                    className="load-more-btn" 
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? '加载中...' : '加载更多'}
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        {/* 右侧栏 */}
        <aside className="hot-rightbar">
          <div className="hot-info-card">
            <h3>🔥 热度算法说明</h3>
            <div className="hot-algorithm-info">
              <p>热度值综合考虑：</p>
              <ul>
                <li>💬 评论数 (权重: 8)</li>
                <li>👍 点赞数 (权重: 5)</li>
                <li>👁️ 浏览数 (权重: 1)</li>
                <li>⏰ 时间衰减因子</li>
              </ul>
              <p className="algorithm-note">
                算法会根据发布时间进行衰减，确保新内容有机会上榜
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HotPage;
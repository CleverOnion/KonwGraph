import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHotPosts } from '../../api/recommendation';
import Message from '../../components/Message';
import './HotPage.css';
import '../../styles/sidebar.css';
import logo from '../../assets/logo.png';

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
        if (append) {
          setHotPosts(prev => [...prev, ...newPosts]);
        } else {
          setHotPosts(newPosts);
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
      <header className="hot-header">
        <div className="hot-header-left">
          <img src={logo} alt="logo" className="hot-header-logo" />
          <span className="hot-header-title">KnowGraph</span>
        </div>
        <div className="hot-header-center">
          <input
            className="hot-header-search"
            placeholder="Search KnowGraph"
          />
        </div>
        <div className="hot-header-right">
          <button className="hot-header-btn">+</button>
          <button className="hot-header-btn">
            <span role="img" aria-label="msg">
              💬
            </span>
          </button>
          <button className="hot-header-avatar">
            <span role="img" aria-label="user">
              🧑
            </span>
          </button>
        </div>
      </header>

      <div className="hot-main-layout">
        {/* 左侧栏 */}
        <aside className="app-sidebar hot-theme">
          <nav>
            <ul className="app-menu">
              <li onClick={() => navigate('/')}>
                <span role="img" aria-label="home">
                  🏠
                </span>{' '}
                首页
              </li>
              <li className="active">
                <span role="img" aria-label="hot">
                  🔥
                </span>{' '}
                热门
              </li>
              <li>
                <span role="img" aria-label="explore">
                  🧭
                </span>{' '}
                探索
              </li>
              <li>
                <span role="img" aria-label="profile">
                  👤
                </span>{' '}
                个人空间
              </li>
            </ul>
            <div className="app-menu-group">操作</div>
            <ul className="app-menu">
              <li className="create-post" onClick={() => navigate('/editor')}>
                <span role="img" aria-label="write">
                  ✍️
                </span>{' '}
                发布文章
              </li>
            </ul>
          </nav>
        </aside>

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
                      <button className="hot-post-action" title="点赞">
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
                      <button className="hot-post-action" title="收藏">
                        <span role="img" aria-label="fav">
                          ⭐
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
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryById } from '../../api/category';
import { getPostsByCategory, getPostStatus, toggleLike, bookmarkPost, unbookmarkPost } from '../../api/post';
import { getMyProfile } from '../../api/personal';
import Message from '../../components/Message';
import './CategoryDetailPage.css';
import '../../styles/sidebar.css';
import logo from '../../assets/logo.png';

const CategoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [queryParams] = useState({
    page: 1,
    size: 10,
    sort: 'newest',
  });

  // 获取分类详情
  const fetchCategory = async () => {
    try {
      const response = await getCategoryById(id);
      if (response.code === 200) {
        setCategory(response.data);
      } else {
        Message.error(response.msg || '获取分类信息失败');
      }
    } catch (error) {
      console.error('获取分类信息失败:', error);
      Message.error('获取分类信息失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 获取分类下的文章列表
  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      const response = await getPostsByCategory(id, queryParams);
      if (response.code === 200) {
        const postsData = response.data || [];
        
        // 检查用户是否登录
        const tokenName = localStorage.getItem('tokenName');
        const tokenValue = localStorage.getItem('tokenValue');
        
        if (tokenName && tokenValue) {
          // 如果用户已登录，获取每篇文章的点赞收藏状态
          const postsWithStatus = await Promise.all(
            postsData.map(async (post) => {
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
          setPosts(postsWithStatus);
        } else {
          // 如果用户未登录，设置默认状态
          const postsWithDefaultStatus = postsData.map(post => ({
            ...post,
            liked: false,
            bookmarked: false
          }));
          setPosts(postsWithDefaultStatus);
        }
      } else {
        Message.error(response.msg || '获取文章列表失败');
      }
    } catch (error) {
      console.error('获取文章列表失败:', error);
      Message.error('获取文章列表失败，请重试');
    } finally {
      setPostsLoading(false);
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

  // 处理点赞
  const handleLike = async (postId, index, isLiked) => {
    try {
      const response = await toggleLike(postId);
      if (response.code === 200) {
        const newPosts = [...posts];
        newPosts[index] = {
          ...newPosts[index],
          liked: !isLiked,
          likeCount: isLiked 
            ? (newPosts[index].likeCount || 0) - 1 
            : (newPosts[index].likeCount || 0) + 1
        };
        setPosts(newPosts);
        Message.success(isLiked ? '取消点赞成功' : '点赞成功');
      } else {
        Message.error(response.msg || '操作失败');
      }
    } catch (error) {
      console.error('点赞操作失败:', error);
      if (error.response?.status === 401) {
        Message.error('请先登录');
        navigate('/login');
      } else if (error.request) {
        Message.error('网络连接失败，请检查网络');
      } else {
        Message.error('操作失败，请重试');
      }
    }
  };

  // 处理收藏
  const handleBookmark = async (postId, index, isBookmarked) => {
    try {
      const response = isBookmarked 
        ? await unbookmarkPost(postId)
        : await bookmarkPost(postId);
      
      if (response.code === 200) {
        const newPosts = [...posts];
        newPosts[index] = {
          ...newPosts[index],
          bookmarked: !isBookmarked
        };
        setPosts(newPosts);
        Message.success(isBookmarked ? '取消收藏成功' : '收藏成功');
      } else {
        Message.error(response.msg || '操作失败');
      }
    } catch (error) {
      console.error('收藏操作失败:', error);
      if (error.response?.status === 401) {
        Message.error('请先登录');
        navigate('/login');
      } else if (error.request) {
        Message.error('网络连接失败，请检查网络');
      } else {
        Message.error('操作失败，请重试');
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategory();
      fetchPosts();
    }
  }, [id, queryParams]);

  return (
    <div className="reddit-home-bg">
      {/* 顶部导航栏 */}
      <header className="reddit-header">
        <div className="reddit-header-left">
          <img src={logo} alt="logo" className="reddit-header-logo" />
          <span className="reddit-header-title">KnowGraph</span>
        </div>
        <div className="reddit-header-center">
          <input
            className="reddit-header-search"
            placeholder="Search KnowGraph"
          />
        </div>
        <div className="reddit-header-right">
          <button className="reddit-header-btn">+</button>
          <button className="reddit-header-btn">
            <span role="img" aria-label="msg">
              💬
            </span>
          </button>
          <button className="reddit-header-avatar">
            <span role="img" aria-label="user">
              🧑
            </span>
          </button>
        </div>
      </header>
      
      <div className="reddit-main-layout">
        {/* 左侧栏 */}
        <aside className="app-sidebar">
          <nav>
            <ul className="app-menu">
              <li onClick={() => navigate('/')}>
                <span role="img" aria-label="home">
                  🏠
                </span>{' '}
                首页
              </li>
              <li onClick={() => navigate('/hot')}>
                <span role="img" aria-label="pop">
                  🔥
                </span>{' '}
                热门
              </li>
              <li onClick={() => navigate('/explore')}>
                <span role="img" aria-label="explore">
                  🧭
                </span>{' '}
                探索
              </li>
              <li onClick={handleProfileClick}>
                <span role="img" aria-label="profile">
                  👤
                </span>{' '}
                个人空间
              </li>
            </ul>
            <div className="app-menu-group">操作</div>
            <ul className="app-menu">
              <li
                className="create-post"
                onClick={() => navigate('/editor')}
              >
                <span role="img" aria-label="write">
                  ✍️
                </span>{' '}
                发布文章
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* 主内容区 */}
        <main className="reddit-content">
          {/* 分类信息头部 */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner">加载分类信息中...</div>
            </div>
          ) : category ? (
            <div className="category-header">
              <div className="category-info">
                <h1 className="category-title">{category.name}</h1>
                {category.description && (
                  <p className="category-description">{category.description}</p>
                )}
              </div>
              <button 
                className="back-button"
                onClick={() => navigate('/explore')}
              >
                ← 返回探索
              </button>
            </div>
          ) : (
            <div className="error-container">
              <div className="error-text">分类不存在</div>
            </div>
          )}
          
          {/* 文章列表 */}
          {postsLoading ? (
            <div className="loading-container">
              <div className="loading-spinner">加载文章中...</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-container">
              <div className="empty-text">该分类下暂无文章</div>
            </div>
          ) : (
            posts.map((post, index) => (
              <div className="reddit-post" key={post.id}>
                <div className="reddit-post-header">
                  <span className="reddit-post-author">
                    {post.author?.nickname ||
                      post.author?.username ||
                      '匿名用户'}
                  </span>
                  <span className="reddit-post-time">
                    · {formatTime(post.publishedAt)}
                  </span>
                </div>
                <h2
                  className="reddit-post-title"
                  onClick={() => navigate(`/post/${post.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {post.title}
                </h2>
                {post.summary && (
                  <div className="reddit-post-summary">{post.summary}</div>
                )}
                <div className="reddit-post-meta">
                  <span>
                    by{' '}
                    <a href={`/user/${post.author?.id}`}>
                      {post.author?.nickname || post.author?.username}
                    </a>
                  </span>
                </div>
                <div className="reddit-post-actions">
                  <button 
                    className={`reddit-post-action ${post.liked ? 'reddit-post-action-active' : ''}`} 
                    title={post.liked ? '取消点赞' : '点赞'}
                    onClick={() => handleLike(post.id, index, post.liked)}
                  >
                    <span role="img" aria-label="up">
                      👍
                    </span>{' '}
                    {post.likeCount || 0}
                  </button>
                  <button className="reddit-post-action" title="评论">
                    <span role="img" aria-label="comment">
                      💬
                    </span>{' '}
                    {post.commentCount || 0}
                  </button>
                  <button className="reddit-post-action" title="浏览">
                    <span role="img" aria-label="view">
                      👁️
                    </span>{' '}
                    {post.viewCount || 0}
                  </button>
                  <button className="reddit-post-action" title="分享">
                    <span role="img" aria-label="share">
                      🔗
                    </span>
                  </button>
                  <button 
                    className={`reddit-post-action ${post.bookmarked ? 'reddit-post-action-active' : ''}`} 
                    title={post.bookmarked ? '取消收藏' : '收藏'}
                    onClick={() => handleBookmark(post.id, index, post.bookmarked)}
                  >
                    <span role="img" aria-label="fav">
                      {post.bookmarked ? '⭐' : '☆'}
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
        
        {/* 右侧栏（空白/预留） */}
        <aside className="reddit-rightbar"></aside>
      </div>
    </div>
  );
};

export default CategoryDetailPage;

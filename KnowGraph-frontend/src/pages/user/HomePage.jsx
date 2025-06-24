import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { getPosts } from "../../api/post";
import Message from "../../components/Message";
import "./HomePage.css";
import "../../styles/sidebar.css";
import logo from "../../assets/logo.png";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditor = location.pathname === "/editor";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryParams] = useState({
    page: 1,
    size: 10,
    sort: "newest",
  });

  // 获取文章列表
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts(queryParams);
      if (response.code === 200) {
        setPosts(response.data || []);
      } else {
        Message.error(response.msg || "获取文章列表失败");
      }
    } catch (error) {
      console.error("获取文章列表失败:", error);
      Message.error("获取文章列表失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  // 格式化时间
  const formatTime = (dateTime) => {
    if (!dateTime) return "";

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

  useEffect(() => {
    fetchPosts();
  }, [queryParams]);

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
      <div className={`reddit-main-layout ${isEditor ? "editor-mode" : ""}`}>
        {/* 左侧栏 */}
        <aside className="app-sidebar">
          <nav>
            <ul className="app-menu">
              <li
                className={!isEditor ? "active" : ""}
                onClick={() => navigate("/")}
              >
                <span role="img" aria-label="home">
                  🏠
                </span>{" "}
                首页
              </li>
              <li onClick={() => navigate("/hot")}>
                <span role="img" aria-label="pop">
                  🔥
                </span>{" "}
                热门
              </li>
              <li>
                <span role="img" aria-label="explore">
                  🧭
                </span>{" "}
                探索
              </li>
              <li>
                <span role="img" aria-label="profile">
                  👤
                </span>{" "}
                个人空间
              </li>
            </ul>
            <div className="app-menu-group">操作</div>
            <ul className="app-menu">
              <li
                className={`create-post ${isEditor ? "active" : ""}`}
                onClick={() => navigate("/editor")}
              >
                <span role="img" aria-label="write">
                  ✍️
                </span>{" "}
                发布文章
              </li>
            </ul>
          </nav>
        </aside>
        {/* 主内容区 */}
        <main className="reddit-content">
          {isEditor ? (
            <Outlet />
          ) : (
            <>
              {/* 文章列表 */}
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner">加载中...</div>
                </div>
              ) : posts.length === 0 ? (
                <div className="empty-container">
                  <div className="empty-text">暂无文章</div>
                </div>
              ) : (
                posts.map((post) => (
                  <div className="reddit-post" key={post.id}>
                    <div className="reddit-post-header">
                      <span className="reddit-post-author">
                        {post.author?.nickname ||
                          post.author?.username ||
                          "匿名用户"}
                      </span>
                      <span className="reddit-post-time">
                        · {formatTime(post.publishedAt)}
                      </span>
                    </div>
                    <h2
                      className="reddit-post-title"
                      onClick={() => navigate(`/post/${post.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {post.title}
                    </h2>
                    {post.summary && (
                      <div className="reddit-post-summary">{post.summary}</div>
                    )}
                    <div className="reddit-post-meta">
                      <span>
                        by{" "}
                        <a href={`/user/${post.author?.id}`}>
                          {post.author?.nickname || post.author?.username}
                        </a>
                      </span>
                    </div>
                    <div className="reddit-post-actions">
                      <button className="reddit-post-action" title="点赞">
                        <span role="img" aria-label="up">
                          👍
                        </span>{" "}
                        {post.likeCount || 0}
                      </button>
                      <button className="reddit-post-action" title="评论">
                        <span role="img" aria-label="comment">
                          💬
                        </span>{" "}
                        {post.commentCount || 0}
                      </button>
                      <button className="reddit-post-action" title="浏览">
                        <span role="img" aria-label="view">
                          👁️
                        </span>{" "}
                        {post.viewCount || 0}
                      </button>
                      <button className="reddit-post-action" title="分享">
                        <span role="img" aria-label="share">
                          🔗
                        </span>
                      </button>
                      <button className="reddit-post-action" title="收藏">
                        <span role="img" aria-label="fav">
                          ⭐
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </main>
        {/* 右侧栏（空白/预留） */}
        <aside className="reddit-rightbar"></aside>
      </div>
    </div>
  );
};

export default HomePage;

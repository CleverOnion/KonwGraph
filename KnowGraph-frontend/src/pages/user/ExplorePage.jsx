import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../api/category';
import { getMyProfile } from '../../api/personal';
import Message from '../../components/Message';
import TopNavbar from '../../components/TopNavbar';
import Sidebar from '../../components/Sidebar';
import './ExplorePage.css';
import '../../styles/sidebar.css';

const ExplorePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取所有分类
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      if (response.code === 200) {
        setCategories(response.data || []);
      } else {
        Message.error(response.msg || '获取分类列表失败');
      }
    } catch (error) {
      console.error('获取分类列表失败:', error);
      Message.error('获取分类列表失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理分类点击
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="reddit-home-bg">
      {/* 顶部导航栏 */}
      <TopNavbar />
      
      <div className="reddit-main-layout">
        {/* 左侧栏 */}
        <Sidebar activeItem="explore" />
        
        {/* 主内容区 */}
        <main className="reddit-content">
          <div className="explore-header">
            <h1>探索分类</h1>
            <p>发现感兴趣的内容分类，点击查看该分类下的所有文章</p>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner">加载中...</div>
            </div>
          ) : categories.length === 0 ? (
            <div className="empty-container">
              <div className="empty-text">暂无分类</div>
            </div>
          ) : (
            <div className="categories-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="category-card"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="category-icon">
                    <span role="img" aria-label="category">
                      📁
                    </span>
                  </div>
                  <div className="category-info">
                    <h3 className="category-name">{category.name}</h3>
                    {category.description && (
                      <p className="category-description">{category.description}</p>
                    )}
                  </div>
                  <div className="category-arrow">
                    <span role="img" aria-label="arrow">
                      ➡️
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        
        {/* 右侧栏（空白/预留） */}
        <aside className="reddit-rightbar"></aside>
      </div>
    </div>
  );
};

export default ExplorePage;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../api/personal';
import logo from '../assets/logo.png';

const TopNavbar = ({ className = 'reddit-header' }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // 检查登录状态并获取用户信息
  useEffect(() => {
    const checkLoginStatus = async () => {
      const tokenName = localStorage.getItem('tokenName');
      const tokenValue = localStorage.getItem('tokenValue');
      
      if (tokenName && tokenValue) {
        try {
          const response = await getMyProfile();
          if (response.code === 200) {
            setUser(response.data);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error('获取用户信息失败:', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
  }, []);

  // 清除隐藏定时器
  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  // 延迟隐藏下拉菜单
  const delayHideDropdown = () => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 300); // 300ms 延迟
  };

  // 处理鼠标进入头像区域
  const handleMouseEnter = () => {
    if (isLoggedIn) {
      clearHideTimeout();
      setShowDropdown(true);
    }
  };

  // 处理鼠标离开头像区域
  const handleMouseLeave = () => {
    delayHideDropdown();
  };

  // 处理下拉菜单鼠标进入
  const handleDropdownMouseEnter = () => {
    clearHideTimeout();
  };

  // 处理下拉菜单鼠标离开
  const handleDropdownMouseLeave = () => {
    delayHideDropdown();
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      clearHideTimeout();
    };
  }, []);

  // 进入用户空间
  const handleProfileClick = () => {
    if (user) {
      navigate(`/users/${user.id}`);
      setShowDropdown(false);
    }
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('tokenName');
    localStorage.removeItem('tokenValue');
    setUser(null);
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/login');
  };

  // 处理登录按钮点击
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className={className}>
      <div className={`${className}-left`}>
        <img src={logo} alt="logo" className={`${className}-logo`} />
        <span className={`${className}-title`}>KnowGraph</span>
      </div>
      <div className={`${className}-center`}>
        <input
          className={`${className}-search`}
          placeholder="Search KnowGraph"
        />
      </div>
      <div className={`${className}-right`}>
        <button className={`${className}-btn`}>+</button>
        <button className={`${className}-btn`}>
          <span role="img" aria-label="msg">
            💬
          </span>
        </button>
        
        {/* 用户头像和下拉菜单 */}
        <div className="user-avatar-container" style={{ position: 'relative', display: 'inline-block' }}>
          {isLoggedIn ? (
            <>
              <button 
                ref={avatarRef}
                className={`${className === 'reddit-header' ? 'reddit-header-avatar' : 'hot-header-avatar'}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="用户头像" 
                    style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                  />
                ) : (
                  <span role="img" aria-label="user">
                    🧑
                  </span>
                )}
              </button>
              
              {/* 下拉菜单 */}
              {showDropdown && (
                <div 
                   ref={dropdownRef}
                   className="user-dropdown"
                   onMouseEnter={handleDropdownMouseEnter}
                   onMouseLeave={handleDropdownMouseLeave}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '160px',
                    zIndex: 1000,
                    marginTop: '4px'
                  }}
                >
                  <div style={{ padding: '8px 0' }}>
                    <div 
                      onClick={handleProfileClick}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#333'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <span>👤</span>
                      <span>个人空间</span>
                    </div>
                    <div style={{ height: '1px', backgroundColor: '#eee', margin: '4px 0' }}></div>
                    <div 
                      onClick={handleLogout}
                      style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#333'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <span>🚪</span>
                      <span>退出登录</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button 
              className={`${className}-btn`}
              onClick={handleLoginClick}
              style={{ cursor: 'pointer' }}
            >
              登录
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
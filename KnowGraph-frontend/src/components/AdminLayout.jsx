import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const menuItems = [
    { key: '/admin', label: '仪表盘', icon: '📊' },
    { key: '/admin/users', label: '用户管理', icon: '👥' },
    { key: '/admin/content', label: '内容管理', icon: '📝' },
    { key: '/admin/reports', label: '举报管理', icon: '🚨' },
    { key: '/admin/settings', label: '系统设置', icon: '⚙️' }
  ];

  const handleMenuClick = (path) => {
    setActiveMenu(path);
    navigate(path);
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* 侧边栏 */}
      <div style={{
        width: '250px',
        backgroundColor: '#001529',
        color: 'white',
        padding: '20px 0'
      }}>
        {/* 头部 */}
        <div style={{
          padding: '0 20px',
          marginBottom: '30px',
          borderBottom: '1px solid #303030',
          paddingBottom: '20px'
        }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>KnowGraph 管理端</h2>
          <button 
            onClick={handleBackToMain}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            返回用户端
          </button>
        </div>
        
        {/* 菜单项 */}
        <div>
          {menuItems.map(item => (
            <div
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                backgroundColor: activeMenu === item.key ? '#1890ff' : 'transparent',
                borderRight: activeMenu === item.key ? '3px solid #40a9ff' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== item.key) {
                  e.target.style.backgroundColor = '#303030';
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item.key) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span style={{ fontSize: '14px' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* 主内容区 */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          minHeight: 'calc(100vh - 40px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

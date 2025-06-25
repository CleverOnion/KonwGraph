import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { key: '/admin', label: '工作台', icon: '🏠' },
    { key: '/admin/content', label: '文章管理', icon: '📝' },
    { key: '/admin/users', label: '用户管理', icon: '👥' },
    { key: '/admin/reports', label: '举报管理', icon: '🚨' },
    { key: '/admin/settings', label: '系统管理', icon: '⚙️' },
    { key: '/admin/analytics', label: '数据中心', icon: '📊' },
    { key: '/admin/help', label: '帮助中心', icon: '❓' }
  ];

  const handleMenuClick = (path) => {
    setActiveMenu(path);
    navigate(path);
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* 侧边栏 */}
      <div style={{
        width: collapsed ? '80px' : '240px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e8e8e8',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
      }}>
        {/* Logo区域 */}
        <div style={{
          padding: collapsed ? '16px 12px' : '16px 24px',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          height: '64px'
        }}>
          <img 
            src={logo} 
            alt="KnowGraph" 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px'
            }}
          />
          {!collapsed && (
            <div style={{ marginLeft: '12px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937',
                lineHeight: '20px'
              }}>KnowGraph</div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: '16px'
              }}>管理控制台</div>
            </div>
          )}
        </div>

        {/* 折叠按钮 */}
        <div style={{
          padding: '12px',
          borderBottom: '1px solid #e8e8e8'
        }}>
          <button
            onClick={toggleCollapse}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#6b7280',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f9fafb';
            }}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
        
        {/* 菜单项 */}
        <div style={{ flex: 1, padding: '8px 0' }}>
          {menuItems.map(item => (
            <div
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              style={{
                margin: '2px 12px',
                padding: collapsed ? '12px 8px' : '12px 16px',
                cursor: 'pointer',
                backgroundColor: activeMenu === item.key ? '#e6f7ff' : 'transparent',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: collapsed ? '0' : '12px',
                transition: 'all 0.2s',
                border: activeMenu === item.key ? '1px solid #91d5ff' : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== item.key) {
                  e.target.style.backgroundColor = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item.key) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ 
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px'
              }}>{item.icon}</span>
              {!collapsed && (
                <span style={{ 
                  fontSize: '14px',
                  color: activeMenu === item.key ? '#1890ff' : '#4b5563',
                  fontWeight: activeMenu === item.key ? '500' : '400'
                }}>{item.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* 底部返回按钮 */}
        <div style={{
          padding: '12px',
          borderTop: '1px solid #e8e8e8'
        }}>
          <button 
            onClick={handleBackToMain}
            style={{
              width: '100%',
              padding: collapsed ? '12px 8px' : '12px 16px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#40a9ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#1890ff';
            }}
          >
            <span>🏠</span>
            {!collapsed && <span>返回前台</span>}
          </button>
        </div>
      </div>
      
      {/* 主内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 顶部导航栏 */}
        <div style={{
          height: '64px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#1f2937'
          }}>
            {menuItems.find(item => item.key === activeMenu)?.label || '管理控制台'}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <span style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>管理员</span>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}>👤</div>
          </div>
        </div>

        {/* 内容区域 */}
        <div style={{ 
          flex: 1, 
          padding: '24px',
          backgroundColor: '#f0f2f5',
          overflow: 'auto'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            minHeight: 'calc(100vh - 112px)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e8e8e8'
          }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

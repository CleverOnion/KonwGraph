import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProfile } from '../api/personal';

const Sidebar = ({ activeItem = '', className = 'app-sidebar' }) => {
  const navigate = useNavigate();

  const handleProfileClick = async () => {
    try {
      const response = await getMyProfile();
      if (response.code === 200 && response.data) {
        navigate(`/users/${response.data.id}`);
      } else {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  const menuItems = [
    {
      key: 'home',
      icon: '🏠',
      label: '首页',
      path: '/',
      onClick: () => navigate('/')
    },
    {
      key: 'hot',
      icon: '🔥',
      label: '热门',
      path: '/hot',
      onClick: () => navigate('/hot')
    },
    {
      key: 'explore',
      icon: '🧭',
      label: '探索',
      path: '/explore',
      onClick: () => navigate('/explore')
    },
    {
      key: 'profile',
      icon: '👤',
      label: '个人空间',
      onClick: handleProfileClick
    }
  ];

  const actionItems = [
    {
      key: 'editor',
      icon: '✍️',
      label: '发布文章',
      path: '/editor',
      onClick: () => navigate('/editor')
    }
  ];

  return (
    <aside className={className}>
      <nav>
        <ul className="app-menu">
          {menuItems.map(item => (
            <li
              key={item.key}
              className={activeItem === item.key ? 'active' : ''}
              onClick={item.onClick}
            >
              <span role="img" aria-label={item.key}>
                {item.icon}
              </span>{' '}
              {item.label}
            </li>
          ))}
        </ul>
        <div className="app-menu-group">操作</div>
        <ul className="app-menu">
          {actionItems.map(item => (
            <li
              key={item.key}
              className={`create-post ${activeItem === item.key ? 'active' : ''}`}
              onClick={item.onClick}
            >
              <span role="img" aria-label={item.key}>
                {item.icon}
              </span>{' '}
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
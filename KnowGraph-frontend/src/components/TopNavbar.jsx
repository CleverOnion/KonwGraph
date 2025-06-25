import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const TopNavbar = ({ className = 'reddit-header' }) => {
  const navigate = useNavigate();

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
        <button className={`${className === 'reddit-header' ? 'reddit-header-avatar' : 'hot-header-avatar'}`}>
          <span role="img" aria-label="user">
            🧑
          </span>
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
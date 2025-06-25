import React from "react";

const DashboardPage = () => {
  const statsData = [
    { title: '总用户数', value: '1,234', icon: '👥', color: '#1890ff' },
    { title: '总文章数', value: '5,678', icon: '📝', color: '#52c41a' },
    { title: '今日访问', value: '890', icon: '👁️', color: '#fa8c16' },
    { title: '待审核', value: '12', icon: '⏳', color: '#f5222d' }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#262626' }}>仪表盘</h1>
      
      {/* 统计卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {statsData.map((stat, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #f0f0f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: stat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              {stat.icon}
            </div>
            <div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#262626',
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#8c8c8c'
              }}>
                {stat.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 快速操作 */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#262626' }}>快速操作</h3>
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            审核文章
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            用户管理
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#fa8c16',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            系统设置
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

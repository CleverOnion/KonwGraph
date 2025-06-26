import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewStats from '../../components/ReviewStats';
import { getDashboardStats } from '../../api/analytics';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState([
    { title: '总用户数', value: '0', icon: '👥', color: '#1890ff' },
    { title: '总文章数', value: '0', icon: '📝', color: '#52c41a' },
    { title: '待审核', value: '0', icon: '⏳', color: '#f5222d' }
  ]);
  const [loading, setLoading] = useState(true);

  // 获取仪表盘统计数据
  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();
      const data = response.data;
      
      setStatsData([
        { title: '总用户数', value: data.totalUsers?.toLocaleString() || '0', icon: '👥', color: '#1890ff' },
        { title: '总文章数', value: data.totalPosts?.toLocaleString() || '0', icon: '📝', color: '#52c41a' },
        { title: '待审核', value: data.pendingPosts?.toLocaleString() || '0', icon: '⏳', color: '#f5222d' }
      ]);
    } catch (error) {
      console.error('获取仪表盘统计数据失败:', error);
      // 显示错误信息并使用默认数据
      alert('获取统计数据失败，请检查后端服务是否正常运行。错误信息: ' + (error.message || error));
      setStatsData([
        { title: '总用户数', value: '接口异常', icon: '👥', color: '#1890ff' },
        { title: '总文章数', value: '接口异常', icon: '📝', color: '#52c41a' },
        { title: '待审核', value: '接口异常', icon: '⏳', color: '#f5222d' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#262626' }}>仪表盘</h1>
      
      {/* 审核统计 */}
      <ReviewStats />
      
      {/* 统计卡片 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
        opacity: loading ? 0.6 : 1,
        transition: 'opacity 0.3s'
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
          <button 
            onClick={() => navigate('/admin/review')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            内容审核
          </button>
          <button 
            onClick={() => navigate('/admin/categories')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#52c41a',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            分类管理
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

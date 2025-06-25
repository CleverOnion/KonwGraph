import React, { useState } from "react";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "KnowGraph 知识图谱",
    siteDescription: "专业的知识分享平台",
    allowRegistration: true,
    requireEmailVerification: true,
    maxFileSize: "10",
    pointsForPost: "10",
    pointsForComment: "2",
    pointsForLike: "1"
  });

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('保存设置:', settings);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#262626' }}>系统设置</h1>
      
      {/* 网站基本信息 */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#262626' }}>网站基本信息</h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#262626'
            }}>网站名称</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#262626'
            }}>网站描述</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      </div>

      {/* 用户注册设置 */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#262626' }}>用户注册设置</h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              id="allowRegistration"
              checked={settings.allowRegistration}
              onChange={(e) => handleInputChange('allowRegistration', e.target.checked)}
              style={{ width: '16px', height: '16px' }}
            />
            <label htmlFor="allowRegistration" style={{
              fontWeight: '500',
              color: '#262626',
              cursor: 'pointer'
            }}>允许用户注册</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              id="requireEmailVerification"
              checked={settings.requireEmailVerification}
              onChange={(e) => handleInputChange('requireEmailVerification', e.target.checked)}
              style={{ width: '16px', height: '16px' }}
            />
            <label htmlFor="requireEmailVerification" style={{
              fontWeight: '500',
              color: '#262626',
              cursor: 'pointer'
            }}>需要邮箱验证</label>
          </div>
        </div>
      </div>

      {/* 文件上传设置 */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#262626' }}>文件上传设置</h3>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#262626'
          }}>最大文件大小 (MB)</label>
          <input
            type="number"
            value={settings.maxFileSize}
            onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
            style={{
              width: '200px',
              padding: '8px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* 积分规则设置 */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#262626' }}>积分规则设置</h3>
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#262626'
            }}>发布文章积分</label>
            <input
              type="number"
              value={settings.pointsForPost}
              onChange={(e) => handleInputChange('pointsForPost', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#262626'
            }}>发布评论积分</label>
            <input
              type="number"
              value={settings.pointsForComment}
              onChange={(e) => handleInputChange('pointsForComment', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#262626'
            }}>点赞获得积分</label>
            <input
              type="number"
              value={settings.pointsForLike}
              onChange={(e) => handleInputChange('pointsForLike', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div style={{ textAlign: 'right' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          保存设置
        </button>
      </div>
    </div>
  );
};

export default AdminSettingsPage;

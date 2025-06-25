import React, { useState } from 'react';
import { Card, Upload, Button, Avatar, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { uploadAvatar } from '../../api/upload';
import TopNavbar from '../../components/TopNavbar';
import Sidebar from '../../components/Sidebar';
import './HomePage.css';

const TestUploadPage = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // 头像上传前的验证
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
      return false;
    }
    return true;
  };

  // 自定义上传逻辑
  const customUpload = async ({ file, onSuccess, onError }) => {
    try {
      setUploading(true);
      const response = await uploadAvatar(file);
      if (response.code === 200) {
        setAvatarUrl(response.data.url);
        onSuccess(response.data);
        message.success('头像上传成功');
      } else {
        onError(new Error(response.message || '上传失败'));
        message.error(response.message || '头像上传失败');
      }
    } catch (error) {
      console.error('头像上传失败:', error);
      onError(error);
      message.error('头像上传失败');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="reddit-home-bg">
      <TopNavbar />
      
      <div className="reddit-main-layout">
        <Sidebar activeItem="test" />
        
        <main className="reddit-content">
          <Card title="头像上传测试" style={{ maxWidth: 600 }}>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Avatar 
                size={120} 
                src={avatarUrl} 
                icon={<UserOutlined />}
                style={{ marginBottom: 20 }}
              />
              
              <div>
                <Upload
                  name="avatar"
                  listType="text"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  customRequest={customUpload}
                >
                  <Button 
                    icon={<UploadOutlined />} 
                    loading={uploading}
                    type="primary"
                  >
                    {uploading ? '上传中...' : '选择头像'}
                  </Button>
                </Upload>
              </div>
              
              <div style={{ marginTop: 16, color: '#666', fontSize: 12 }}>
                支持 JPG、PNG 格式，文件大小不超过 2MB
              </div>
              
              {avatarUrl && (
                <div style={{ marginTop: 20, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
                  <p><strong>上传成功！</strong></p>
                  <p>图片URL: {avatarUrl}</p>
                </div>
              )}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TestUploadPage;
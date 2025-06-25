import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  message,
  Space,
  Divider,
  Typography
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { getMyProfile, updateMyProfile } from '../../api/personal';
import './HomePage.css';
import '../../styles/sidebar.css';
import logo from '../../assets/logo.png';

const { Title } = Typography;
const { TextArea } = Input;

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  // 获取当前用户信息
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const response = await getMyProfile();
        const userData = response.data;
        setCurrentUser(userData);
        setAvatarUrl(userData.avatarUrl || '');
        
        // 设置表单初始值
        form.setFieldsValue({
          nickname: userData.nickname || '',
          email: userData.email || '',
          bio: userData.bio || '',
        });
      } catch (error) {
        console.error('获取用户信息失败:', error);
        message.error('获取用户信息失败');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [form]);

  // 处理头像上传
  const handleAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // 这里应该从服务器响应中获取图片URL
      // 暂时使用本地预览
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setAvatarUrl(reader.result);
      });
      reader.readAsDataURL(info.file.originFileObj);
      message.success('头像上传成功');
    } else if (info.file.status === 'error') {
      message.error('头像上传失败');
    }
  };

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

  // 提交表单
  const handleSubmit = async (values) => {
    if (!currentUser) {
      message.error('用户信息未加载，请刷新页面重试');
      return;
    }
    
    try {
      setSubmitLoading(true);
      
      const updateData = {
        nickname: values.nickname,
        email: values.email,
        bio: values.bio,
        avatarUrl: avatarUrl
      };

      await updateMyProfile(updateData);
      message.success('个人资料更新成功');
      
      // 返回个人空间页面
      navigate(`/users/${currentUser.id}`);
    } catch (error) {
      console.error('更新个人资料失败:', error);
      message.error(error.response?.data?.message || '更新个人资料失败');
    } finally {
      setSubmitLoading(false);
    }
  };

  // 返回个人空间
  const handleBack = () => {
    if (currentUser) {
      navigate(`/users/${currentUser.id}`);
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>;
  }

  if (!currentUser) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>用户信息加载失败，请刷新页面重试</div>;
  }

  return (
    <div className="reddit-home-bg">
      {/* 顶部导航栏 */}
      <header className="reddit-header">
        <div className="reddit-header-left">
          <img src={logo} alt="logo" className="reddit-header-logo" />
          <span className="reddit-header-title">KnowGraph</span>
        </div>
        <div className="reddit-header-center">
          <input
            className="reddit-header-search"
            placeholder="Search KnowGraph"
          />
        </div>
        <div className="reddit-header-right">
          <button className="reddit-header-btn">+</button>
          <button className="reddit-header-btn">
            <span role="img" aria-label="msg">
              💬
            </span>
          </button>
          <button className="reddit-header-avatar">
            <span role="img" aria-label="user">
              🧑
            </span>
          </button>
        </div>
      </header>

      <div className="reddit-main-layout">
        {/* 左侧栏 */}
        <aside className="app-sidebar">
          <nav>
            <ul className="app-menu">
              <li onClick={() => navigate("/")}>
                <span role="img" aria-label="home">
                  🏠
                </span>{" "}
                首页
              </li>
              <li onClick={() => navigate("/hot")}>
                <span role="img" aria-label="pop">
                  🔥
                </span>{" "}
                热门
              </li>
              <li onClick={() => navigate("/explore")}>
                <span role="img" aria-label="explore">
                  🧭
                </span>{" "}
                探索
              </li>
              <li onClick={handleBack}>
                <span role="img" aria-label="profile">
                  👤
                </span>{" "}
                个人空间
              </li>
            </ul>
            <div className="app-menu-group">发布文章</div>
            <ul className="app-menu">
              <li onClick={() => navigate("/editor")}>
                <span role="img" aria-label="write">
                  ✍️
                </span>{" "}
                发布文章
              </li>
            </ul>
          </nav>
        </aside>

        {/* 主内容区域 */}
        <main className="reddit-content">
          <Card>
            <div style={{ marginBottom: 24 }}>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={handleBack}
                style={{ marginRight: 16 }}
              >
                返回
              </Button>
              <Title level={2} style={{ display: 'inline-block', margin: 0 }}>
                编辑个人资料
              </Title>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ maxWidth: 600 }}
            >
              {/* 头像上传 */}
              <Form.Item label="头像">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Avatar 
                    size={80} 
                    src={avatarUrl} 
                    icon={<UserOutlined />} 
                  />
                  <Upload
                    name="avatar"
                    listType="text"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleAvatarChange}
                    // 这里需要配置实际的上传接口
                    // action="/api/upload/avatar"
                  >
                    <Button icon={<UploadOutlined />}>
                      更换头像
                    </Button>
                  </Upload>
                </div>
                <div style={{ marginTop: 8, color: '#666', fontSize: 12 }}>
                  支持 JPG、PNG 格式，文件大小不超过 2MB
                </div>
              </Form.Item>

              <Divider />

              {/* 基本信息 */}
              <Form.Item
                name="nickname"
                label="昵称"
                rules={[
                  { required: true, message: '请输入昵称' },
                  { max: 20, message: '昵称不能超过20个字符' }
                ]}
              >
                <Input placeholder="请输入昵称" />
              </Form.Item>

              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>

              <Form.Item
                name="bio"
                label="个人简介"
                rules={[
                  { max: 200, message: '个人简介不能超过200个字符' }
                ]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="介绍一下自己吧..." 
                  showCount
                  maxLength={200}
                />
              </Form.Item>

              {/* 提交按钮 */}
              <Form.Item>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={submitLoading}
                    icon={<SaveOutlined />}
                  >
                    保存修改
                  </Button>
                  <Button onClick={handleBack}>
                    取消
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default EditProfilePage;
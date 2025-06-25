import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Space,
  Divider,
  Typography
} from 'antd';
import Message from '../../components/Message';
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { getMyProfile, updateMyProfile } from '../../api/personal';
import { uploadAvatar } from '../../api/upload';
import TopNavbar from '../../components/TopNavbar';
import Sidebar from '../../components/Sidebar';
import './HomePage.css';
import '../../styles/sidebar.css';

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
        Message.error('获取用户信息失败');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [form]);

  // 处理头像上传
  const handleAvatarChange = async (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      try {
        // 调用上传接口
        const response = await uploadAvatar(info.file.originFileObj);
        if (response.code === 200) {
          setAvatarUrl(response.data.url);
          Message.success('头像上传成功');
        } else {
          Message.error(response.message || '头像上传失败');
        }
      } catch (error) {
        console.error('头像上传失败:', error);
        Message.error('头像上传失败');
      }
    } else if (info.file.status === 'error') {
      Message.error('头像上传失败');
    }
  };

  // 自定义上传逻辑
  const customUpload = async ({ file, onSuccess, onError }) => {
    try {
      const response = await uploadAvatar(file);
      if (response.code === 200) {
        setAvatarUrl(response.data.url);
        onSuccess(response.data);
        Message.success('头像上传成功');
      } else {
        onError(new Error(response.message || '上传失败'));
        Message.error(response.message || '头像上传失败');
      }
    } catch (error) {
      console.error('头像上传失败:', error);
      onError(error);
      Message.error('头像上传失败');
    }
  };

  // 头像上传前的验证
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Message.error('只能上传 JPG/PNG 格式的图片!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Message.error('图片大小不能超过 2MB!');
      return false;
    }
    return true;
  };

  // 提交表单
  const handleSubmit = async (values) => {
    if (!currentUser) {
      Message.error('用户信息未加载，请刷新页面重试');
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
      Message.success('个人资料更新成功');
      
      // 返回个人空间页面
      navigate(`/users/${currentUser.id}`);
    } catch (error) {
      console.error('更新个人资料失败:', error);
      Message.error(error.response?.data?.message || '更新个人资料失败');
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
      <TopNavbar />

      <div className="reddit-main-layout">
        {/* 左侧栏 */}
        <Sidebar activeItem="profile" />

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
                    customRequest={customUpload}
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
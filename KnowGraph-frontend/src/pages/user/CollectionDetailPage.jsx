import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  List,
  Button,
  Space,
  Tag,
  Empty,
  Modal,
  Typography,
  Breadcrumb,
  Avatar,
  Tooltip,
  Input,
  Spin
} from 'antd';
import Message from '../../components/Message';
import TopNavbar from '../../components/TopNavbar';
import Sidebar from '../../components/Sidebar';
import {
  ArrowLeftOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  DeleteOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  HomeOutlined,
  FireOutlined,
  CompassOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { getPostsInCollection, removePostFromCollection, canAccessCollection } from '../../api/collection';
import { getMyProfile } from '../../api/personal';
import './HomePage.css';
import '../../styles/sidebar.css';
import logo from '../../assets/logo.png';

const { Title, Text, Paragraph } = Typography;

const CollectionDetailPage = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [collection, setCollection] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [postToRemove, setPostToRemove] = useState(null);

  // 处理个人空间导航
  const handleProfileClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Message.error('请先登录');
      navigate('/login');
      return;
    }

    try {
      const response = await getMyProfile();
      const userId = response.data.id;
      navigate(`/users/${userId}`);
    } catch (error) {
      console.error('获取用户信息失败:', error);
      Message.error('获取用户信息失败');
    }
  };

  // 获取当前用户信息
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getMyProfile();
        setCurrentUser(response.data);
      } catch (error) {
        console.error('获取当前用户信息失败:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  // 获取收藏夹中的文章
  useEffect(() => {
    const fetchCollectionPosts = async () => {
      try {
        setLoading(true);
        
        // 先检查是否有权限访问收藏夹
        const accessResponse = await canAccessCollection(collectionId);
        console.log('权限检查结果:', accessResponse);
        if (!accessResponse.data) {
          Message.error('收藏夹不存在或无权访问');
          setCollection(null);
          setPosts([]);
          return;
        }
        
        // 有权限则获取收藏夹内容
        const response = await getPostsInCollection(collectionId);
        console.log('收藏夹数据:', response.data);
        
        // 设置收藏夹信息和文章列表
        setCollection(response.data.collection);
        setPosts(response.data.posts || []);
        
        // 检查是否为收藏夹所有者
        if (currentUser && response.data.collection) {
          setIsOwner(currentUser.id === response.data.collection.userId);
        }
      } catch (error) {
        console.error('获取收藏夹文章失败:', error);
        if (error.response && error.response.status === 403) {
          Message.error('收藏夹不存在或无权访问');
        } else {
          Message.error('获取收藏夹文章失败');
        }
        setCollection(null); // 确保在错误时设置collection为null
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (collectionId) {
      fetchCollectionPosts();
    }
  }, [collectionId]);

  // 当用户信息加载完成后，重新检查所有者权限
  useEffect(() => {
    if (currentUser && collection) {
      setIsOwner(currentUser.id === collection.userId);
    }
  }, [currentUser, collection]);

  // 从收藏夹移除文章
  const handleRemovePost = (postId) => {
    console.log('handleRemovePost called with postId:', postId);
    console.log('isOwner:', isOwner);
    
    if (!isOwner) {
      Message.error('您没有权限移除文章');
      return;
    }
    
    setPostToRemove(postId);
    setRemoveModalVisible(true);
  };
  
  // 确认移除文章
  const confirmRemovePost = async () => {
    if (!postToRemove) return;
    
    try {
      console.log('开始移除文章:', collectionId, postToRemove);
      await removePostFromCollection(collectionId, postToRemove);
      setPosts(posts.filter(post => post.id !== postToRemove));
      Message.success('移除成功');
    } catch (error) {
      console.error('移除文章失败:', error);
      Message.error('移除失败: ' + (error.response?.data?.message || error.message));
    } finally {
      setRemoveModalVisible(false);
      setPostToRemove(null);
    }
  };
  
  // 取消移除文章
  const cancelRemovePost = () => {
    setRemoveModalVisible(false);
    setPostToRemove(null);
  };



  if (loading) {
    return (
      <div className="app">
        <TopNavbar />
        <Sidebar activeItem="profile" />
        <main className="reddit-content">
          <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>
        </main>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="app">
        <header className="reddit-header">
          <div className="reddit-header-left">
            <img src={logo} alt="KnowGraph" className="reddit-header-logo" />
            <span className="reddit-header-title">KnowGraph</span>
          </div>
          <div className="reddit-header-center">
            <Input
              placeholder="搜索 KnowGraph"
              prefix={<SearchOutlined />}
              className="reddit-header-search"
            />
          </div>
          <div className="reddit-header-right">
            <Button
              type="text"
              icon={<BellOutlined />}
              className="reddit-header-btn"
            />
            <Button
              type="text"
              icon={<UserOutlined />}
              className="reddit-header-btn"
              onClick={handleProfileClick}
            />
          </div>
        </header>
        <aside className="app-sidebar">
          <ul className="app-menu">
            <li onClick={() => navigate('/')}>
              <HomeOutlined />
              首页
            </li>
            <li onClick={() => navigate('/hot')}>
              <FireOutlined />
              热门
            </li>
            <li onClick={() => navigate('/explore')}>
              <CompassOutlined />
              探索
            </li>
            <li onClick={handleProfileClick}>
              <UserOutlined />
              个人空间
            </li>
            <li onClick={() => navigate('/editor')}>
              <PlusOutlined />
              发布文章
            </li>
          </ul>
        </aside>
        <main className="reddit-content">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Empty 
              description="收藏夹不存在或无权访问" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Button 
              type="primary" 
              onClick={() => navigate(-1)}
              style={{ marginTop: '16px' }}
            >
              返回上一页
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      {/* 顶部导航栏 */}
      <TopNavbar />

      {/* 左侧导航栏 */}
      <Sidebar activeItem="profile" />

      {/* 主内容区域 */}
      <main className="reddit-content">
        {/* 面包屑导航 */}
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate(-1)}
              style={{ padding: 0 }}
            >
              返回
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>收藏夹</Breadcrumb.Item>
          {collection && <Breadcrumb.Item>{collection.name}</Breadcrumb.Item>}
        </Breadcrumb>

        {/* 如果收藏夹不存在或无权访问，显示错误信息 */}
        {!collection && !loading ? (
          <Card>
            <Empty 
              description="收藏夹不存在或无权访问" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={() => navigate('/')}>返回首页</Button>
            </Empty>
          </Card>
        ) : collection ? (
          <>
            {/* 收藏夹信息 */}
            <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Space align="start" size="large">
              <div>
                <Title level={2} style={{ margin: 0 }}>
                  {collection.name}
                  {collection.isPrivate && <Tag color="orange" style={{ marginLeft: 8 }}>私密</Tag>}
                </Title>
                <Paragraph type="secondary" style={{ marginTop: 8 }}>
                  {collection.description || '暂无描述'}
                </Paragraph>
                <Space>
                  <Avatar size="small" src={collection.user?.avatar} />
                  <Text type="secondary">{collection.user?.nickname || collection.user?.username}</Text>
                  <Text type="secondary">•</Text>
                  <Text type="secondary">{posts.length} 篇文章</Text>
                  <Text type="secondary">•</Text>
                  <Text type="secondary">
                    创建于 {new Date(collection.createdAt).toLocaleDateString()}
                  </Text>
                </Space>
              </div>
            </Space>
          </div>

        </div>
      </Card>

      {/* 文章列表 */}
      <Card>
        {posts.length > 0 ? (
          <div className="posts-container">
            {posts.map((post) => (
              <div className="reddit-post" key={post.id} style={{ 
                marginBottom: '16px', 
                border: '1px solid #e8e8e8', 
                borderRadius: '8px', 
                padding: '16px', 
                backgroundColor: '#fff',
                position: 'relative'
              }}>
                {/* 移除按钮 */}
                {isOwner && (
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemovePost(post.id)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      zIndex: 1
                    }}
                  >
                    移除
                  </Button>
                )}
                
                <div className="reddit-post-header" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '8px', 
                  fontSize: '12px', 
                  color: '#666' 
                }}>
                  <span className="reddit-post-time">
                    发布于 {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  {post.category && (
                    <Tag color={post.category.color} style={{ marginLeft: '8px' }}>
                      {post.category.name}
                    </Tag>
                  )}
                  <span style={{ marginLeft: '8px' }}>
                    by {post.author?.nickname || post.author?.username}
                  </span>
                </div>
                
                <h3
                  className="reddit-post-title"
                  onClick={() => navigate(`/post/${post.id}`)}
                  style={{ 
                    cursor: 'pointer', 
                    margin: '0 0 8px 0', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: '#1a1a1a',
                    lineHeight: '1.4',
                    paddingRight: isOwner ? '60px' : '0'
                  }}
                >
                  {post.title}
                </h3>
                
                {post.summary && (
                  <div className="reddit-post-summary" style={{ 
                    color: '#666', 
                    fontSize: '14px', 
                    lineHeight: '1.5', 
                    marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.summary}
                  </div>
                )}
                
                <div className="reddit-post-actions" style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  fontSize: '13px', 
                  color: '#666' 
                }}>
                  <span className="reddit-post-action" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px' 
                  }}>
                    <EyeOutlined />
                    {post.viewCount || 0}
                  </span>
                  <span className="reddit-post-action" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px' 
                  }}>
                    <HeartOutlined />
                    {post.likeCount || 0}
                  </span>
                  <span className="reddit-post-action" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px' 
                  }}>
                    <MessageOutlined />
                    {post.commentCount || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty 
            description="收藏夹中暂无文章" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
            </>
        ) : null}
      </main>
      
      {/* 自定义确认移除对话框 */}
      <Modal
        title="确认移除"
        open={removeModalVisible}
        onOk={confirmRemovePost}
        onCancel={cancelRemovePost}
        okText="确定"
        cancelText="取消"
        okType="danger"
      >
        <p>确定要从收藏夹中移除这篇文章吗？</p>
      </Modal>
    </div>
  );
};

export default CollectionDetailPage;
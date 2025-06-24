import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  List,
  Button,
  Space,
  Tag,
  Empty,
  message,
  Modal,
  Typography,
  Breadcrumb,
  Avatar,
  Tooltip
} from 'antd';
import {
  ArrowLeftOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EditOutlined
} from '@ant-design/icons';
import { getPostsInCollection, removePostFromCollection } from '../../api/collection';
import { getMyProfile } from '../../api/personal';

const { Title, Text, Paragraph } = Typography;

const CollectionDetailPage = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [collection, setCollection] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

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
        const response = await getPostsInCollection(collectionId);
        setPosts(response.data.posts || []);
        setCollection(response.data.collection);
        
        // 检查是否为收藏夹所有者
        if (currentUser && response.data.collection) {
          setIsOwner(currentUser.id === response.data.collection.userId);
        }
      } catch (error) {
        console.error('获取收藏夹文章失败:', error);
        message.error('获取收藏夹文章失败');
      } finally {
        setLoading(false);
      }
    };

    if (collectionId && currentUser) {
      fetchCollectionPosts();
    }
  }, [collectionId, currentUser]);

  // 从收藏夹移除文章
  const handleRemovePost = (postId) => {
    Modal.confirm({
      title: '确认移除',
      content: '确定要从收藏夹中移除这篇文章吗？',
      onOk: async () => {
        try {
          await removePostFromCollection(collectionId, postId);
          setPosts(posts.filter(post => post.id !== postId));
          message.success('移除成功');
        } catch (error) {
          console.error('移除文章失败:', error);
          message.error('移除失败');
        }
      }
    });
  };

  // 分享收藏夹
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      message.success('链接已复制到剪贴板');
    }).catch(() => {
      message.error('复制失败');
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>;
  }

  if (!collection) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>收藏夹不存在或无权访问</div>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
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
        <Breadcrumb.Item>{collection.name}</Breadcrumb.Item>
      </Breadcrumb>

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
                    创建于 {new Date(collection.createTime).toLocaleDateString()}
                  </Text>
                </Space>
              </div>
            </Space>
          </div>
          <Space>
            <Tooltip title="分享收藏夹">
              <Button icon={<ShareAltOutlined />} onClick={handleShare} />
            </Tooltip>
            {isOwner && (
              <Tooltip title="编辑收藏夹">
                <Button icon={<EditOutlined />} onClick={() => navigate(`/collections/${collectionId}/edit`)} />
              </Tooltip>
            )}
          </Space>
        </div>
      </Card>

      {/* 文章列表 */}
      <Card>
        {posts.length > 0 ? (
          <List
            itemLayout="vertical"
            dataSource={posts}
            renderItem={(post) => (
              <List.Item
                key={post.id}
                actions={[
                  <Space key="stats">
                    <span><EyeOutlined /> {post.viewCount}</span>
                    <span><HeartOutlined /> {post.likeCount}</span>
                    <span><MessageOutlined /> {post.commentCount}</span>
                  </Space>,
                  isOwner && (
                    <Button
                      key="remove"
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemovePost(post.id)}
                    >
                      移除
                    </Button>
                  )
                ].filter(Boolean)}
                extra={
                  post.coverImage && (
                    <img
                      width={200}
                      alt={post.title}
                      src={post.coverImage}
                      style={{ borderRadius: 8 }}
                    />
                  )
                }
              >
                <List.Item.Meta
                  title={
                    <a 
                      onClick={() => navigate(`/posts/${post.id}`)}
                      style={{ fontSize: 18, fontWeight: 500 }}
                    >
                      {post.title}
                    </a>
                  }
                  description={
                    <Space>
                      <Tag color={post.category?.color}>{post.category?.name}</Tag>
                      <span>{new Date(post.publishTime).toLocaleDateString()}</span>
                      <span>by {post.author?.nickname || post.author?.username}</span>
                    </Space>
                  }
                />
                <div style={{ marginTop: 8, color: '#666' }}>
                  {post.summary}
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Empty 
            description="收藏夹中暂无文章" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
    </div>
  );
};

export default CollectionDetailPage;
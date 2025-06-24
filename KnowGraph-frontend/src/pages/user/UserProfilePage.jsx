import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Avatar,
  Tabs,
  List,
  Button,
  Space,
  Statistic,
  Row,
  Col,
  Tag,
  Empty,
  message,
  Modal,
  Form,
  Input,
  Switch,
  Divider,
  Typography
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  HeartOutlined,
  EyeOutlined,
  MessageOutlined,
  StarOutlined,
  PlusOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserDeleteOutlined
} from '@ant-design/icons';
import { getPersonalProfile, getMyProfile, toggleFollow, isFollowing, getFollowingList, getFollowerList } from '../../api/personal';
import { getUserCollections, createCollection, deleteCollection, getPostsInCollection } from '../../api/collection';
import { getPostsByUserId } from '../../api/post';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  
  // 数据状态
  const [posts, setPosts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  
  // 模态框状态
  const [createCollectionVisible, setCreateCollectionVisible] = useState(false);
  const [form] = Form.useForm();

  // 获取当前用户信息
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getMyProfile();
        setCurrentUser(response.data);
        setIsOwnProfile(response.data.id.toString() === userId);
      } catch (error) {
        console.error('获取当前用户信息失败:', error);
      }
    };
    fetchCurrentUser();
  }, [userId]);

  // 获取用户资料
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getPersonalProfile(userId);
        
        // 处理后端返回的数据结构
        const profileData = {
          ...response.data.userProfile,
          postCount: response.data.posts ? response.data.posts.length : 0,
          followingCount: response.data.followingCount || 0,
          followerCount: response.data.followersCount || 0
        };
        
        setProfile(profileData);
        
        // 设置文章列表
        if (response.data.posts) {
          setPosts(response.data.posts);
        }
        
        // 如果不是自己的主页，检查是否关注
        if (!isOwnProfile && currentUser) {
          const followResponse = await isFollowing(userId);
          setIsFollowingUser(followResponse.data);
        }
      } catch (error) {
        console.error('获取用户资料失败:', error);
        message.error('获取用户资料失败');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId, isOwnProfile, currentUser]);

  // 获取用户文章
  const fetchPosts = async () => {
    try {
      const response = await getPostsByUserId(userId);
      setPosts(response.data);
    } catch (error) {
      console.error('获取用户文章失败:', error);
    }
  };

  // 获取收藏夹
  const fetchCollections = async () => {
    try {
      const response = await getUserCollections(userId);
      setCollections(response.data);
    } catch (error) {
      console.error('获取收藏夹失败:', error);
    }
  };

  // 获取关注列表
  const fetchFollowingList = async () => {
    try {
      const response = await getFollowingList(userId);
      setFollowingList(response.data);
    } catch (error) {
      console.error('获取关注列表失败:', error);
    }
  };

  // 获取粉丝列表
  const fetchFollowerList = async () => {
    try {
      const response = await getFollowerList(userId);
      setFollowerList(response.data);
    } catch (error) {
      console.error('获取粉丝列表失败:', error);
    }
  };

  // 处理关注/取消关注
  const handleFollow = async () => {
    try {
      setFollowLoading(true);
      await toggleFollow(userId);
      setIsFollowingUser(!isFollowingUser);
      // 更新粉丝数
      setProfile(prev => ({
        ...prev,
        followerCount: isFollowingUser ? prev.followerCount - 1 : prev.followerCount + 1
      }));
      message.success(isFollowingUser ? '取消关注成功' : '关注成功');
    } catch (error) {
      console.error('关注操作失败:', error);
      message.error('操作失败');
    } finally {
      setFollowLoading(false);
    }
  };

  // 创建收藏夹
  const handleCreateCollection = async (values) => {
    try {
      await createCollection(values);
      message.success('创建收藏夹成功');
      setCreateCollectionVisible(false);
      form.resetFields();
      fetchCollections();
    } catch (error) {
      console.error('创建收藏夹失败:', error);
      message.error('创建收藏夹失败');
    }
  };

  // 删除收藏夹
  const handleDeleteCollection = (collectionId) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个收藏夹吗？此操作不可恢复。',
      onOk: async () => {
        try {
          await deleteCollection(collectionId);
          message.success('删除成功');
          fetchCollections();
        } catch (error) {
          console.error('删除收藏夹失败:', error);
          message.error('删除失败');
        }
      }
    });
  };

  // 标签页切换处理
  const handleTabChange = (key) => {
    setActiveTab(key);
    switch (key) {
      case 'posts':
        fetchPosts();
        break;
      case 'collections':
        fetchCollections();
        break;
      case 'following':
        fetchFollowingList();
        break;
      case 'followers':
        fetchFollowerList();
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>;
  }

  if (!profile) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>用户不存在</div>;
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      {/* 用户信息卡片 */}
      <Card style={{ marginBottom: 20 }}>
        <Row gutter={24}>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={120} src={profile.avatarUrl} icon={<UserOutlined />} />
              <div style={{ marginTop: 16 }}>
                {!isOwnProfile && currentUser && (
                  <Button
                    type={isFollowingUser ? 'default' : 'primary'}
                    icon={isFollowingUser ? <UserDeleteOutlined /> : <UserAddOutlined />}
                    loading={followLoading}
                    onClick={handleFollow}
                  >
                    {isFollowingUser ? '取消关注' : '关注'}
                  </Button>
                )}
                {isOwnProfile && (
                  <Button icon={<EditOutlined />} onClick={() => navigate('/settings/profile')}>
                    编辑资料
                  </Button>
                )}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Title level={2}>{profile.nickname || profile.username}</Title>
            <Paragraph type="secondary">{profile.bio || '这个人很懒，什么都没有留下...'}</Paragraph>
            <Space size="large">
              {profile.createTime && <Text type="secondary">注册时间: {new Date(profile.createTime).toLocaleDateString()}</Text>}
              {profile.lastLoginTime && <Text type="secondary">最后活跃: {new Date(profile.lastLoginTime).toLocaleDateString()}</Text>}
            </Space>
          </Col>
          <Col span={6}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="文章" value={posts?.length || 0} />
              </Col>
              <Col span={8}>
                <Statistic title="关注" value={profile.followingCount || 0} />
              </Col>
              <Col span={8}>
                <Statistic title="粉丝" value={profile.followersCount || 0} />
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="积分" value={profile.points || 0} />
              </Col>
              <Col span={12}>
                <Statistic title="等级" value={profile.level || 1} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* 内容标签页 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="发布的文章" key="posts">
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
                      </Space>
                    ]}
                    extra={
                      post.coverImage && (
                        <img
                          width={200}
                          alt={post.title}
                          src={post.coverImage}
                        />
                      )
                    }
                  >
                    <List.Item.Meta
                      title={
                        <a onClick={() => navigate(`/posts/${post.id}`)}>
                          {post.title}
                        </a>
                      }
                      description={
                        <Space>
                          <Tag color={post.category?.color}>{post.category?.name}</Tag>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </Space>
                      }
                    />
                    <div>{post.summary}</div>
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无发布的文章" />
            )}
          </TabPane>

          <TabPane 
            tab={
              <span>
                收藏夹
                {isOwnProfile && (
                  <Button
                    type="text"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => setCreateCollectionVisible(true)}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </span>
            } 
            key="collections"
          >
            {collections.length > 0 ? (
              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={collections}
                renderItem={(collection) => (
                  <List.Item>
                    <Card
                      size="small"
                      title={collection.name}
                      extra={
                        isOwnProfile && (
                          <Button
                            type="text"
                            size="small"
                            icon={<SettingOutlined />}
                            onClick={() => handleDeleteCollection(collection.id)}
                          />
                        )
                      }
                      onClick={() => navigate(`/collections/${collection.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <p>{collection.description || '暂无描述'}</p>
                      <Space>
                        <StarOutlined />
                        <span>{collection.postCount || 0} 篇文章</span>
                        {collection.isPrivate && <Tag color="orange">私密</Tag>}
                      </Space>
                    </Card>
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无收藏夹" />
            )}
          </TabPane>

          <TabPane tab="关注" key="following">
            {followingList.length > 0 ? (
              <List
                dataSource={followingList}
                renderItem={(user) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={user.avatar} icon={<UserOutlined />} />}
                      title={
                        <a onClick={() => navigate(`/users/${user.id}`)}>
                          {user.nickname || user.username}
                        </a>
                      }
                      description={user.bio}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无关注的用户" />
            )}
          </TabPane>

          <TabPane tab="粉丝" key="followers">
            {followerList.length > 0 ? (
              <List
                dataSource={followerList}
                renderItem={(user) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={user.avatar} icon={<UserOutlined />} />}
                      title={
                        <a onClick={() => navigate(`/users/${user.id}`)}>
                          {user.nickname || user.username}
                        </a>
                      }
                      description={user.bio}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无粉丝" />
            )}
          </TabPane>
        </Tabs>
      </Card>

      {/* 创建收藏夹模态框 */}
      <Modal
        title="创建收藏夹"
        open={createCollectionVisible}
        onCancel={() => {
          setCreateCollectionVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateCollection}
        >
          <Form.Item
            name="name"
            label="收藏夹名称"
            rules={[{ required: true, message: '请输入收藏夹名称' }]}
          >
            <Input placeholder="请输入收藏夹名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={3} placeholder="请输入收藏夹描述" />
          </Form.Item>
          <Form.Item
            name="isPrivate"
            label="隐私设置"
            valuePropName="checked"
          >
            <Switch checkedChildren="私密" unCheckedChildren="公开" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
              <Button onClick={() => {
                setCreateCollectionVisible(false);
                form.resetFields();
              }}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfilePage;

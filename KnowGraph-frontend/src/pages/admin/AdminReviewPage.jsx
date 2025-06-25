import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Input, Space, Tag, Modal, message, Popconfirm } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { getAdminPosts, reviewPost, batchReviewPosts } from '../../api/review';
import PostReviewModal from '../../components/PostReviewModal';

const { Option } = Select;
const { Search } = Input;

const AdminReviewPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    status: '',
    keyword: ''
  });
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  // 获取文章列表
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current,
        size: pagination.pageSize,
        ...filters
      };
      const response = await getAdminPosts(params);
      setPosts(response.data.records || []);
      setPagination(prev => ({
        ...prev,
        total: response.data.total || 0
      }));
    } catch (error) {
      message.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [pagination.current, pagination.pageSize]);

  // 处理搜索
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchPosts();
  };

  // 处理状态筛选
  const handleStatusFilter = (value) => {
    setFilters(prev => ({ ...prev, status: value }));
    setPagination(prev => ({ ...prev, current: 1 }));
    setTimeout(fetchPosts, 0);
  };

  // 处理关键词搜索
  const handleKeywordChange = (value) => {
    setFilters(prev => ({ ...prev, keyword: value }));
  };

  // 打开审核弹窗
  const handleReview = (post) => {
    setCurrentPost(post);
    setReviewModalVisible(true);
  };

  // 快速审核
  const handleQuickReview = async (postId, action) => {
    try {
      await reviewPost({
        postId,
        action,
        remark: action === 'APPROVE' ? '内容符合规范，审核通过' : '内容不符合规范，审核驳回'
      });
      message.success(`${action === 'APPROVE' ? '通过' : '驳回'}成功`);
      fetchPosts();
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 批量审核
  const handleBatchReview = async (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要操作的文章');
      return;
    }

    try {
      await batchReviewPosts({
        postIds: selectedRowKeys,
        action,
        remark: action === 'APPROVE' ? '批量审核通过' : '批量审核驳回'
      });
      message.success(`批量${action === 'APPROVE' ? '通过' : '驳回'}成功`);
      setSelectedRowKeys([]);
      fetchPosts();
    } catch (error) {
      message.error('批量操作失败');
    }
  };

  // 表格列配置
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      ellipsis: true,
    },
    {
      title: '作者',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 120,
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const statusConfig = {
          'PENDING_REVIEW': { color: 'orange', text: '待审核' },
          'PUBLISHED': { color: 'green', text: '已发布' },
          'REJECTED': { color: 'red', text: '已驳回' },
          'DRAFT': { color: 'gray', text: '草稿' }
        };
        const config = statusConfig[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (time) => new Date(time).toLocaleString()
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleReview(record)}
          >
            预览
          </Button>
          {record.status === 'PENDING_REVIEW' && (
            <>
              <Popconfirm
                title="确定通过这篇文章吗？"
                onConfirm={() => handleQuickReview(record.id, 'APPROVE')}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  type="link"
                  icon={<CheckOutlined />}
                  style={{ color: '#52c41a' }}
                >
                  通过
                </Button>
              </Popconfirm>
              <Popconfirm
                title="确定驳回这篇文章吗？"
                onConfirm={() => handleQuickReview(record.id, 'REJECT')}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  type="link"
                  icon={<CloseOutlined />}
                  danger
                >
                  驳回
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      )
    }
  ];

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: (record) => ({
      disabled: record.status !== 'PENDING_REVIEW'
    })
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px', color: '#262626' }}>内容审核</h1>
      
      {/* 筛选栏 */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        marginBottom: '20px'
      }}>
        <Space size="middle" wrap>
          <Search
            placeholder="搜索文章标题或作者"
            value={filters.keyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 250 }}
            enterButton={<SearchOutlined />}
          />
          
          <Select
            placeholder="选择状态"
            value={filters.status}
            onChange={handleStatusFilter}
            style={{ width: 150 }}
            allowClear
          >
            <Option value="PENDING_REVIEW">待审核</Option>
            <Option value="PUBLISHED">已发布</Option>
            <Option value="REJECTED">已驳回</Option>
            <Option value="DRAFT">草稿</Option>
          </Select>
        </Space>
      </div>

      {/* 批量操作栏 */}
      {selectedRowKeys.length > 0 && (
        <div style={{
          backgroundColor: '#e6f7ff',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '16px',
          border: '1px solid #91d5ff'
        }}>
          <Space>
            <span>已选择 {selectedRowKeys.length} 项</span>
            <Popconfirm
              title={`确定批量通过选中的 ${selectedRowKeys.length} 篇文章吗？`}
              onConfirm={() => handleBatchReview('APPROVE')}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" icon={<CheckOutlined />}>
                批量通过
              </Button>
            </Popconfirm>
            <Popconfirm
              title={`确定批量驳回选中的 ${selectedRowKeys.length} 篇文章吗？`}
              onConfirm={() => handleBatchReview('REJECT')}
              okText="确定"
              cancelText="取消"
            >
              <Button danger icon={<CloseOutlined />}>
                批量驳回
              </Button>
            </Popconfirm>
            <Button onClick={() => setSelectedRowKeys([])}>
              取消选择
            </Button>
          </Space>
        </div>
      )}

      {/* 文章列表表格 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #f0f0f0'
      }}>
        <Table
          columns={columns}
          dataSource={posts}
          rowKey="id"
          loading={loading}
          rowSelection={rowSelection}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            onChange: (page, pageSize) => {
              setPagination(prev => ({ ...prev, current: page, pageSize }));
            }
          }}
          scroll={{ x: 1200 }}
        />
      </div>

      {/* 审核弹窗 */}
      <PostReviewModal
        visible={reviewModalVisible}
        post={currentPost}
        onCancel={() => {
          setReviewModalVisible(false);
          setCurrentPost(null);
        }}
        onSuccess={() => {
          setReviewModalVisible(false);
          setCurrentPost(null);
          fetchPosts();
        }}
      />
    </div>
  );
};

export default AdminReviewPage;
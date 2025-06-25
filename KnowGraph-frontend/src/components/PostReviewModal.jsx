import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Radio, Space, Divider, Tag, message, Spin } from 'antd';
import { CheckOutlined, CloseOutlined, UserOutlined, CalendarOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getPostForReview, reviewPost } from '../api/review';

const { TextArea } = Input;

const PostReviewModal = ({ visible, post, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postDetail, setPostDetail] = useState(null);
  const [activeTab, setActiveTab] = useState('preview');

  // 获取文章详情
  const fetchPostDetail = async () => {
    if (!post?.id) return;
    
    setLoading(true);
    try {
      const response = await getPostForReview(post.id);
      setPostDetail(response.data);
    } catch (error) {
      message.error('获取文章详情失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && post) {
      fetchPostDetail();
      form.resetFields();
      setActiveTab('preview');
    }
  }, [visible, post]);

  // 提交审核
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      
      await reviewPost({
        postId: post.id,
        action: values.action,
        remark: values.remark || ''
      });
      
      message.success(`${values.action === 'APPROVE' ? '通过' : '驳回'}成功`);
      onSuccess();
    } catch (error) {
      if (error.errorFields) {
        message.error('请填写完整的审核信息');
      } else {
        message.error('审核操作失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 快速审核模板
  const quickRemarks = {
    APPROVE: [
      '内容质量良好，符合发布标准',
      '文章结构清晰，内容有价值',
      '符合社区规范，审核通过'
    ],
    REJECT: [
      '内容质量不符合要求',
      '存在不当言论或违规内容',
      '文章结构混乱，可读性差',
      '涉嫌抄袭或版权问题',
      '内容与分类不符'
    ]
  };

  const currentRemarks = form.getFieldValue('action') ? quickRemarks[form.getFieldValue('action')] || [] : [];

  if (!post) return null;

  return (
    <Modal
      title={`审核文章 - ${post.title}`}
      open={visible}
      onCancel={onCancel}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleSubmit}
          disabled={post.status !== 'PENDING_REVIEW'}
          icon={form.getFieldValue('action') === 'APPROVE' ? <CheckOutlined /> : <CloseOutlined />}
        >
          确认{form.getFieldValue('action') === 'APPROVE' ? '通过' : '驳回'}
        </Button>
      ]}
    >
      <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* 文章信息 */}
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '16px',
              borderRadius: '6px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                    {postDetail?.title || post.title}
                  </h3>
                  <Space size="large">
                    <span>
                      <UserOutlined style={{ marginRight: '4px' }} />
                      {postDetail?.nickname || post.nickname}
                    </span>
                    <span>
                      <CalendarOutlined style={{ marginRight: '4px' }} />
                      {new Date(postDetail?.createdAt || post.createdAt).toLocaleString()}
                    </span>
                    <span>
                      <EyeOutlined style={{ marginRight: '4px' }} />
                      {postDetail?.viewCount || post.viewCount || 0} 次浏览
                    </span>
                  </Space>
                </div>
                <div>
                  <Tag color={post.status === 'PENDING_REVIEW' ? 'orange' : 'default'}>
                    {post.status === 'PENDING_REVIEW' ? '待审核' : post.status}
                  </Tag>
                </div>
              </div>
              
              {postDetail?.categoryName && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ color: '#666' }}>分类：</span>
                  <Tag>{postDetail.categoryName}</Tag>
                </div>
              )}
              
              {postDetail?.tags && postDetail.tags.length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  <span style={{ color: '#666' }}>标签：</span>
                  {postDetail.tags.map(tag => (
                    <Tag key={tag} color="blue">{tag}</Tag>
                  ))}
                </div>
              )}
            </div>

            {/* 标签页切换 */}
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button
                  type={activeTab === 'preview' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('preview')}
                >
                  文章预览
                </Button>
                <Button
                  type={activeTab === 'review' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('review')}
                >
                  审核操作
                </Button>
              </Space>
            </div>

            {/* 文章预览 */}
            {activeTab === 'preview' && (
              <div style={{
                border: '1px solid #f0f0f0',
                borderRadius: '6px',
                padding: '20px',
                backgroundColor: 'white',
                minHeight: '300px'
              }}>
                {postDetail?.contentMd ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({ children }) => <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '8px' }}>{children}</h1>,
                      h2: ({ children }) => <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '6px' }}>{children}</h2>,
                      code: ({ inline, children }) => 
                        inline ? 
                          <code style={{ backgroundColor: '#f6f8fa', padding: '2px 4px', borderRadius: '3px' }}>{children}</code> :
                          <pre style={{ backgroundColor: '#f6f8fa', padding: '12px', borderRadius: '6px', overflow: 'auto' }}>
                            <code>{children}</code>
                          </pre>,
                      blockquote: ({ children }) => (
                        <blockquote style={{
                          borderLeft: '4px solid #dfe2e5',
                          paddingLeft: '16px',
                          margin: '16px 0',
                          color: '#6a737d'
                        }}>
                          {children}
                        </blockquote>
                      )
                    }}
                  >
                    {postDetail.contentMd}
                  </ReactMarkdown>
                ) : (
                  <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
                    暂无内容
                  </div>
                )}
              </div>
            )}

            {/* 审核操作 */}
            {activeTab === 'review' && (
              <div>
                {post.status !== 'PENDING_REVIEW' && (
                  <div style={{
                    backgroundColor: '#fff2e8',
                    border: '1px solid #ffbb96',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '16px',
                    textAlign: 'center',
                    color: '#d46b08'
                  }}>
                    <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
                    该文章状态为「{post.status === 'PUBLISHED' ? '已发布' : post.status}」，无法进行审核操作
                  </div>
                )}
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{ action: 'APPROVE' }}
                  disabled={post.status !== 'PENDING_REVIEW'}
                >
                <Form.Item
                  name="action"
                  label="审核决定"
                  rules={[{ required: true, message: '请选择审核决定' }]}
                >
                  <Radio.Group>
                    <Radio.Button value="APPROVE" style={{ color: '#52c41a' }}>
                      <CheckOutlined /> 通过
                    </Radio.Button>
                    <Radio.Button value="REJECT" style={{ color: '#ff4d4f' }}>
                      <CloseOutlined /> 驳回
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>

                {/* 快速备注模板 */}
                {currentRemarks.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>快速备注模板：</div>
                    <Space wrap>
                      {currentRemarks.map((remark, index) => (
                        <Button
                          key={index}
                          size="small"
                          onClick={() => form.setFieldsValue({ remark })}
                        >
                          {remark}
                        </Button>
                      ))}
                    </Space>
                  </div>
                )}

                <Form.Item
                  name="remark"
                  label="审核备注"
                  rules={[
                    {
                      validator: (_, value) => {
                        const action = form.getFieldValue('action');
                        if (action === 'REJECT' && !value?.trim()) {
                          return Promise.reject(new Error('驳回时必须填写审核备注'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder={form.getFieldValue('action') === 'REJECT' ? '请说明驳回原因...' : '可选填审核备注...'}
                    maxLength={500}
                    showCount
                  />
                </Form.Item>
                </Form>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default PostReviewModal;
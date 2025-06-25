import React, { useState, useEffect } from 'react';
import { Modal, List, Button, Input, Form } from 'antd';
import Message from './Message';
import { PlusOutlined } from '@ant-design/icons';
import { getUserCollections, createCollection } from '../api/collection';

const { Option } = Select;

const CollectionSelector = ({ visible, onCancel, onConfirm, userId }) => {
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [form] = Form.useForm();

  // 获取用户收藏夹列表
  const fetchCollections = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await getUserCollections(userId);
      if (response.code === 200) {
        setCollections(response.data || []);
        // 如果没有收藏夹，自动显示创建表单
        if (!response.data || response.data.length === 0) {
          setShowCreateForm(true);
        }
      } else {
        Message.error('获取收藏夹列表失败');
      }
    } catch (error) {
      console.error('获取收藏夹失败:', error);
      Message.error('获取收藏夹失败');
    } finally {
      setLoading(false);
    }
  };

  // 创建新收藏夹
  const handleCreateCollection = async (values) => {
    setCreateLoading(true);
    try {
      const response = await createCollection({
        name: values.name,
        description: values.description || '',
        isPrivate: values.isPrivate || false
      });
      
      if (response.code === 200) {
        Message.success('收藏夹创建成功');
        form.resetFields();
        setShowCreateForm(false);
        // 重新获取收藏夹列表
        await fetchCollections();
        // 自动选择新创建的收藏夹
        setSelectedCollectionId(response.data.id);
      } else {
        Message.error(response.msg || '创建收藏夹失败');
      }
    } catch (error) {
      console.error('创建收藏夹失败:', error);
      Message.error('创建收藏夹失败');
    } finally {
      setCreateLoading(false);
    }
  };

  // 确认收藏
  const handleConfirm = () => {
    if (!selectedCollectionId) {
      Message.warning('请选择一个收藏夹');
      return;
    }
    onConfirm(selectedCollectionId);
  };

  // 取消操作
  const handleCancel = () => {
    setSelectedCollectionId(null);
    setShowCreateForm(false);
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (visible && userId) {
      fetchCollections();
    }
  }, [visible, userId]);

  return (
    <Modal
      title="选择收藏夹"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={handleConfirm}
          disabled={!selectedCollectionId}
        >
          确认收藏
        </Button>,
      ]}
      width={500}
    >
      {!showCreateForm ? (
        <div>
          <div style={{ marginBottom: 16 }}>
            <Select
              placeholder="请选择收藏夹"
              style={{ width: '100%' }}
              value={selectedCollectionId}
              onChange={setSelectedCollectionId}
              loading={loading}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div style={{ padding: '8px 0', borderTop: '1px solid #f0f0f0' }}>
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={() => setShowCreateForm(true)}
                      style={{ width: '100%', textAlign: 'left' }}
                    >
                      创建新收藏夹
                    </Button>
                  </div>
                </>
              )}
            >
              {collections.map((collection) => (
                <Option key={collection.id} value={collection.id}>
                  {collection.name}
                  {collection.isPrivate && <span style={{ color: '#999' }}> (私密)</span>}
                </Option>
              ))}
            </Select>
          </div>
          
          {collections.length === 0 && !loading && (
            <div style={{ textAlign: 'center', color: '#999', padding: '20px 0' }}>
              <p>您还没有收藏夹</p>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowCreateForm(true)}
              >
                创建第一个收藏夹
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h4 style={{ marginBottom: 16 }}>创建新收藏夹</h4>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateCollection}
          >
            <Form.Item
              name="name"
              label="收藏夹名称"
              rules={[
                { required: true, message: '请输入收藏夹名称' },
                { max: 50, message: '收藏夹名称不能超过50个字符' }
              ]}
            >
              <Input placeholder="请输入收藏夹名称" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="描述（可选）"
              rules={[
                { max: 200, message: '描述不能超过200个字符' }
              ]}
            >
              <Input.TextArea
                placeholder="请输入收藏夹描述"
                rows={3}
              />
            </Form.Item>
            
            <Form.Item name="isPrivate" valuePropName="checked">
              <input type="checkbox" id="isPrivate" />
              <label htmlFor="isPrivate" style={{ marginLeft: 8 }}>
                设为私密收藏夹
              </label>
            </Form.Item>
            
            <div style={{ textAlign: 'right', marginTop: 16 }}>
              <Button
                style={{ marginRight: 8 }}
                onClick={() => {
                  setShowCreateForm(false);
                  form.resetFields();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={createLoading}
              >
                创建
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default CollectionSelector;
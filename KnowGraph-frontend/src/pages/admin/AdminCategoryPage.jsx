import React, { useState, useEffect } from 'react';
import { getAdminCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from '../../api/admin';
import Message from '../../components/Message';

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  // 获取分类列表
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAdminCategories();
      if (response.code === 200) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error('获取分类列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 打开新增模态框
  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '' });
    setShowModal(true);
  };

  // 打开编辑模态框
  const handleEdit = async (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || ''
    });
    setShowModal(true);
  };

  // 删除分类
  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这个分类吗？')) {
      return;
    }
    
    try {
      const response = await deleteCategory(id);
      if (response.code === 200) {
        Message.success('删除成功');
        fetchCategories();
      }
    } catch (error) {
      console.error('删除分类失败:', error);
      Message.error('删除失败');
    }
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      Message.warning('请输入分类名称');
      return;
    }
    
    if (!formData.slug.trim()) {
      Message.warning('请输入分类标识');
      return;
    }

    try {
      let response;
      if (editingCategory) {
        response = await updateCategory(editingCategory.id, formData);
      } else {
        response = await createCategory(formData);
      }
      
      if (response.code === 200) {
        Message.success(editingCategory ? '更新成功' : '创建成功');
        setShowModal(false);
        fetchCategories();
      }
    } catch (error) {
      console.error('保存分类失败:', error);
      Message.error('保存失败');
    }
  };

  // 关闭模态框
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '' });
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <h1 style={{ margin: 0, color: '#262626' }}>分类管理</h1>
        <button
          onClick={handleAdd}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          新增分类
        </button>
      </div>

      {/* 分类列表 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa' }}>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>ID</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>分类名称</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>标识</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#999'
                }}>加载中...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="4" style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#999'
                }}>暂无数据</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#595959'
                  }}>{category.id}</td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#262626',
                    fontWeight: '500'
                  }}>{category.name}</td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#595959'
                  }}>{category.slug}</td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(category)}
                        style={{
                          padding: '4px 8px',
                          fontSize: '12px',
                          border: '1px solid #d9d9d9',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          color: '#595959'
                        }}
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        style={{
                          padding: '4px 8px',
                          fontSize: '12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          backgroundColor: '#ff4d4f',
                          color: 'white'
                        }}
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 模态框 */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            width: '500px',
            maxWidth: '90vw'
          }}>
            <h2 style={{ margin: '0 0 20px 0', color: '#262626' }}>
              {editingCategory ? '编辑分类' : '新增分类'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '4px',
                  color: '#262626',
                  fontSize: '14px'
                }}>分类名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="请输入分类名称"
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '4px',
                  color: '#262626',
                  fontSize: '14px'
                }}>分类标识 *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="请输入分类标识（英文）"
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '4px',
                  color: '#262626',
                  fontSize: '14px'
                }}>分类描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="请输入分类描述"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    color: '#595959',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  取消
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {editingCategory ? '更新' : '创建'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryPage;
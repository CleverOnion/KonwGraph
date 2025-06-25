import React, { useState, useEffect } from 'react';
import { getAdminUsers, updateUserStatus, updateUserRole } from '../../api/admin';
import Message from '../../components/Message';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  // 获取用户列表
  const fetchUsers = async (page = 1, size = 10) => {
    try {
      setLoading(true);
      const response = await getAdminUsers({ page, size });
      if (response.code === 200) {
        setUsers(response.data.records || []);
        setPagination({
          page,
          size,
          total: response.data.total || 0
        });
      }
    } catch (error) {
      console.error('获取用户列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 用户状态变更
  const handleStatusChange = async (userId, newStatus) => {
    try {
      setLoading(true);
      await updateUserStatus(userId, newStatus);
      Message.success('用户状态更新成功');
      // 重新加载用户列表
      await fetchUsers(pagination.page, pagination.size);
    } catch (error) {
      console.error('更新用户状态失败:', error);
      Message.error('更新用户状态失败');
    } finally {
      setLoading(false);
    }
  };

  // 用户角色变更
  const handleRoleChange = async (userId, newRole) => {
    try {
      setLoading(true);
      await updateUserRole(userId, newRole);
      Message.success('用户角色更新成功');
      // 重新加载用户列表
      await fetchUsers(pagination.page, pagination.size);
    } catch (error) {
      console.error('更新用户角色失败:', error);
      Message.error('更新用户角色失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchUsers(1, pagination.size);
  };

  const handlePageChange = (newPage) => {
    fetchUsers(newPage, pagination.size);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const getStatusText = (status) => {
    const statusMap = {
      'ACTIVE': '正常',
      'BANNED': '封禁',
      'PENDING_VERIFICATION': '待验证'
    };
    return statusMap[status] || status;
  };

  const getRoleText = (role) => {
    const roleMap = {
      'USER': '用户',
      'ADMIN': '管理员',
      'MODERATOR': '版主'
    };
    return roleMap[role] || role;
  };

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#262626' }}>用户管理</h1>
      
      {/* 搜索栏 */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        marginBottom: '20px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="搜索用户名或邮箱"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            padding: '8px 12px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '14px',
            width: '300px'
          }}
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#d9d9d9' : '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}>
          {loading ? '搜索中...' : '搜索'}
        </button>
      </div>

      {/* 用户列表 */}
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
              }}>用户名</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>邮箱</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>角色</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>状态</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>注册时间</th>
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
                <td colSpan="7" style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#999'
                }}>加载中...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="7" style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#999'
                }}>暂无数据</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#595959'
                  }}>{user.id}</td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#262626',
                    fontWeight: '500'
                  }}>{user.username || user.nickname || '-'}</td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#595959'
                  }}>{user.email || '-'}</td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      backgroundColor: user.role === 'ADMIN' ? '#f6ffed' : '#e6f7ff',
                      color: user.role === 'ADMIN' ? '#52c41a' : '#1890ff',
                      border: `1px solid ${user.role === 'ADMIN' ? '#b7eb8f' : '#91d5ff'}`
                    }}>
                      {getRoleText(user.role)}
                    </span>
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      backgroundColor: user.status === 'ACTIVE' ? '#f6ffed' : '#fff2e8',
                      color: user.status === 'ACTIVE' ? '#52c41a' : '#fa8c16',
                      border: `1px solid ${user.status === 'ACTIVE' ? '#b7eb8f' : '#ffd591'}`
                    }}>
                      {getStatusText(user.status)}
                    </span>
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    color: '#595959'
                  }}>{formatDate(user.createdAt)}</td>
                  <td style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleStatusChange(user.id, user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE')}
                        style={{
                          padding: '4px 8px',
                          fontSize: '12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          backgroundColor: user.status === 'ACTIVE' ? '#ff4d4f' : '#52c41a',
                          color: 'white'
                        }}
                      >
                        {user.status === 'ACTIVE' ? '禁用' : '启用'}
                      </button>
                      <button
                        onClick={() => handleRoleChange(user.id, user.role === 'USER' ? 'ADMIN' : 'USER')}
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
                        {user.role === 'USER' ? '设为管理员' : '设为用户'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* 分页组件 */}
        {pagination.total > 0 && (
          <div style={{
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #f0f0f0'
          }}>
            <div style={{ color: '#595959', fontSize: '14px' }}>
              共 {pagination.total} 条记录，第 {pagination.page} 页，共 {Math.ceil(pagination.total / pagination.size)} 页
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1 || loading}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  backgroundColor: pagination.page <= 1 || loading ? '#f5f5f5' : 'white',
                  color: pagination.page <= 1 || loading ? '#bfbfbf' : '#595959',
                  cursor: pagination.page <= 1 || loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                上一页
              </button>
              
              {/* 页码按钮 */}
              {Array.from({ length: Math.min(5, Math.ceil(pagination.total / pagination.size)) }, (_, i) => {
                const pageNum = Math.max(1, pagination.page - 2) + i;
                if (pageNum > Math.ceil(pagination.total / pagination.size)) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    disabled={loading}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      backgroundColor: pageNum === pagination.page ? '#1890ff' : 'white',
                      color: pageNum === pagination.page ? 'white' : '#595959',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= Math.ceil(pagination.total / pagination.size) || loading}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  backgroundColor: pagination.page >= Math.ceil(pagination.total / pagination.size) || loading ? '#f5f5f5' : 'white',
                  color: pagination.page >= Math.ceil(pagination.total / pagination.size) || loading ? '#bfbfbf' : '#595959',
                  cursor: pagination.page >= Math.ceil(pagination.total / pagination.size) || loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserPage;

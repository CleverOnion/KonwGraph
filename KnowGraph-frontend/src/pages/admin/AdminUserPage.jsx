import React, { useState } from "react";

const AdminUserPage = () => {
  const [users] = useState([
    { id: 1, username: "张三", email: "zhangsan@example.com", role: "USER", status: "正常", createTime: "2024-01-15" },
    { id: 2, username: "李四", email: "lisi@example.com", role: "ADMIN", status: "正常", createTime: "2024-01-10" },
    { id: 3, username: "王五", email: "wangwu@example.com", role: "USER", status: "禁用", createTime: "2024-01-20" },
  ]);

  const handleStatusChange = (userId, newStatus) => {
    console.log(`用户 ${userId} 状态变更为: ${newStatus}`);
  };

  const handleRoleChange = (userId, newRole) => {
    console.log(`用户 ${userId} 角色变更为: ${newRole}`);
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
          style={{
            padding: '8px 12px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '14px',
            width: '300px'
          }}
        />
        <button style={{
          padding: '8px 16px',
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          搜索
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
            {users.map((user) => (
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
                }}>{user.username}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{user.email}</td>
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
                    {user.role}
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
                    backgroundColor: user.status === '正常' ? '#f6ffed' : '#fff2e8',
                    color: user.status === '正常' ? '#52c41a' : '#fa8c16',
                    border: `1px solid ${user.status === '正常' ? '#b7eb8f' : '#ffd591'}`
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{user.createTime}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleStatusChange(user.id, user.status === '正常' ? '禁用' : '正常')}
                      style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: user.status === '正常' ? '#ff4d4f' : '#52c41a',
                        color: 'white'
                      }}
                    >
                      {user.status === '正常' ? '禁用' : '启用'}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserPage;

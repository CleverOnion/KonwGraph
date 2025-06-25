import React, { useState } from "react";

const AdminContentPage = () => {
  const [posts] = useState([
    { id: 1, title: "React 开发最佳实践", author: "张三", category: "技术分享", status: "已发布", createTime: "2024-01-15", views: 1234 },
    { id: 2, title: "JavaScript 异步编程详解", author: "李四", category: "编程教程", status: "待审核", createTime: "2024-01-16", views: 567 },
    { id: 3, title: "Vue3 组合式API使用指南", author: "王五", category: "技术分享", status: "已发布", createTime: "2024-01-17", views: 890 },
  ]);

  const handleStatusChange = (postId, newStatus) => {
    console.log(`文章 ${postId} 状态变更为: ${newStatus}`);
  };

  const handleDelete = (postId) => {
    console.log(`删除文章: ${postId}`);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#262626' }}>内容管理</h1>
      
      {/* 筛选栏 */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #f0f0f0',
        marginBottom: '20px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="搜索文章标题或作者"
          style={{
            padding: '8px 12px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '14px',
            width: '250px'
          }}
        />
        <select style={{
          padding: '8px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <option value="">全部状态</option>
          <option value="published">已发布</option>
          <option value="pending">待审核</option>
          <option value="rejected">已拒绝</option>
        </select>
        <select style={{
          padding: '8px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <option value="">全部分类</option>
          <option value="tech">技术分享</option>
          <option value="tutorial">编程教程</option>
          <option value="experience">经验分享</option>
        </select>
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

      {/* 文章列表 */}
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
              }}>标题</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>作者</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>分类</th>
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
              }}>浏览量</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>发布时间</th>
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
            {posts.map((post) => (
              <tr key={post.id}>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{post.id}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#262626',
                  fontWeight: '500',
                  maxWidth: '300px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{post.title}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{post.author}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{post.category}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: post.status === '已发布' ? '#f6ffed' : '#fff2e8',
                    color: post.status === '已发布' ? '#52c41a' : '#fa8c16',
                    border: `1px solid ${post.status === '已发布' ? '#b7eb8f' : '#ffd591'}`
                  }}>
                    {post.status}
                  </span>
                </td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{post.views}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{post.createTime}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {post.status === '待审核' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(post.id, '已发布')}
                          style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            backgroundColor: '#52c41a',
                            color: 'white'
                          }}
                        >
                          通过
                        </button>
                        <button
                          onClick={() => handleStatusChange(post.id, '已拒绝')}
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
                          拒绝
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        color: '#ff4d4f'
                      }}
                    >
                      删除
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

export default AdminContentPage;

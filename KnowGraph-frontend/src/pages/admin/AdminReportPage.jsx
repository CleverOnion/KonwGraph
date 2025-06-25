import React, { useState } from "react";

const AdminReportPage = () => {
  const [reports] = useState([
    { id: 1, type: "文章举报", targetTitle: "不当内容文章", reporter: "用户A", reason: "内容不当", status: "待处理", createTime: "2024-01-15" },
    { id: 2, type: "用户举报", targetTitle: "恶意用户", reporter: "用户B", reason: "恶意骚扰", status: "已处理", createTime: "2024-01-14" },
    { id: 3, type: "评论举报", targetTitle: "垃圾评论", reporter: "用户C", reason: "垃圾信息", status: "待处理", createTime: "2024-01-16" },
  ]);

  const handleProcess = (reportId, action) => {
    console.log(`处理举报 ${reportId}: ${action}`);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#262626' }}>举报处理</h1>
      
      {/* 筛选栏 */}
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
        <select style={{
          padding: '8px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <option value="">全部类型</option>
          <option value="post">文章举报</option>
          <option value="user">用户举报</option>
          <option value="comment">评论举报</option>
        </select>
        <select style={{
          padding: '8px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <option value="">全部状态</option>
          <option value="pending">待处理</option>
          <option value="processed">已处理</option>
          <option value="rejected">已驳回</option>
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
          筛选
        </button>
      </div>

      {/* 举报列表 */}
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
              }}>举报类型</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>被举报内容</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>举报人</th>
              <th style={{
                padding: '12px 16px',
                textAlign: 'left',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: '500',
                color: '#262626'
              }}>举报原因</th>
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
              }}>举报时间</th>
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
            {reports.map((report) => (
              <tr key={report.id}>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{report.id}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: '#e6f7ff',
                    color: '#1890ff',
                    border: '1px solid #91d5ff'
                  }}>
                    {report.type}
                  </span>
                </td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#262626',
                  fontWeight: '500',
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{report.targetTitle}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{report.reporter}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{report.reason}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    backgroundColor: report.status === '已处理' ? '#f6ffed' : '#fff2e8',
                    color: report.status === '已处理' ? '#52c41a' : '#fa8c16',
                    border: `1px solid ${report.status === '已处理' ? '#b7eb8f' : '#ffd591'}`
                  }}>
                    {report.status}
                  </span>
                </td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#595959'
                }}>{report.createTime}</td>
                <td style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {report.status === '待处理' && (
                      <>
                        <button
                          onClick={() => handleProcess(report.id, '处理')}
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
                          处理
                        </button>
                        <button
                          onClick={() => handleProcess(report.id, '驳回')}
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
                          驳回
                        </button>
                      </>
                    )}
                    <button
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
                      查看详情
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

export default AdminReportPage;

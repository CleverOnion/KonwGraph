# KnowGraph - 大学生知识分享平台

<div align="center">
  <img src="KnowGraph-frontend/7051c2ca-7dbc-4d99-b460-69e36d9e88da.png" alt="KnowGraph Logo" width="200"/>
  
  **面向大学生的知识分享和学习交流数字化平台**
  
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
  [![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
  [![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

## 📖 项目简介

KnowGraph 是一个专为大学生打造的知识分享和学习交流平台，旨在促进学习资源的高效共享和学术交流的深度互动。平台提供了完整的内容创作、社交互动、个人成长等功能体系。

### 🎯 核心价值

- **📝 知识内容发布**: 支持Markdown编辑器，发布学习笔记、技术文章、经验分享
- **💬 互动交流机制**: 点赞、评论、收藏、关注等完整社交功能
- **🏷️ 分类标签系统**: 通过分类和标签快速定位相关知识内容
- **🔍 搜索推荐服务**: 智能搜索和个性化内容推荐
- **👥 社区管理**: 完善的内容审核和用户管理系统

## 🏗️ 技术架构

### 后端技术栈

- **核心框架**: Spring Boot 3.2.5
- **Java版本**: JDK 17
- **持久层框架**: MyBatis
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **认证授权**: Sa-Token
- **构建工具**: Maven
- **其他依赖**: Lombok、MapStruct

### 前端技术栈

- **框架**: React 19.1.0
- **构建工具**: Vite 6.3.5
- **UI组件库**: Arco Design、Antd
- **状态管理**: Redux Toolkit
- **路由**: React Router DOM
- **Markdown编辑**: @uiw/react-md-editor
- **HTTP客户端**: Axios

### 架构设计

项目采用**前后端分离**架构，后端使用**多模块（Multi-module）**设计：

```
┌─────────────────┐    ┌─────────────────┐
│   React前端     │    │  Spring Boot    │
│                 │    │     后端        │
│  ┌───────────┐  │    │  ┌───────────┐  │
│  │   页面    │  │    │  │  控制器   │  │
│  │   组件    │  │◄──►│  │  服务层   │  │
│  │   路由    │  │    │  │  数据层   │  │
│  └───────────┘  │    │  └───────────┘  │
└─────────────────┘    └─────────────────┘
                              │
                       ┌─────────────────┐
                       │   MySQL数据库   │
                       │   Redis缓存     │
                       └─────────────────┘
```

## 📦 模块结构

### 后端模块

| 模块名称 | 功能描述 |
|---------|----------|
| `knowgraph-main` | 主启动模块，整合所有模块 |
| `knowgraph-framework` | 框架配置模块 |
| `knowgraph-common` | 公共工具模块 |
| `knowgraph-user` | 用户中心模块 |
| `knowgraph-content` | 内容管理模块 |
| `knowgraph-social` | 社交互动模块 |
| `knowgraph-personal` | 个人空间模块 |
| `knowgraph-admin` | 系统管理模块 |
| `knowgraph-analytics` | 统计分析模块 |
| `knowgraph-recommendation` | 推荐算法模块 |

### 前端结构

```
src/
├── api/           # API接口封装
├── components/    # 公共组件
├── pages/         # 页面组件
│   ├── user/      # 用户端页面
│   └── admin/     # 管理端页面
├── router/        # 路由配置
├── store/         # 状态管理
├── styles/        # 样式文件
└── utils/         # 工具函数
```

## ✨ 功能特性

### 🔐 用户系统

#### 用户认证
- ✅ 用户注册/登录
- ✅ 邮箱验证
- ✅ Sa-Token认证
- ✅ 多角色权限管理（用户/管理员）

#### 用户资料
- ✅ 个人信息管理
- ✅ 头像上传
- ✅ 个人简介编辑
- ✅ 账户状态管理

### 📝 内容管理

#### 内容创作
- ✅ Markdown编辑器
- ✅ 实时预览
- ✅ 草稿保存
- ✅ 文章发布
- ✅ 内容分类
- ✅ 标签系统

#### 内容展示
- ✅ 文章列表
- ✅ 文章详情
- ✅ 分类浏览
- ✅ 标签筛选
- ✅ 搜索功能
- ✅ 热门推荐

#### 内容状态
- ✅ 发布状态
- ✅ 审核状态
- ✅ 驳回状态
- ✅ 软删除机制

### 💬 社交互动

#### 互动功能
- ✅ 文章点赞
- ✅ 评论系统
- ✅ 楼中楼回复
- ✅ 收藏功能

#### 关注系统
- ✅ 用户关注
- ✅ 关注列表
- ✅ 粉丝列表

#### 收藏系统
- ✅ 创建收藏夹
- ✅ 收藏文章
- ✅ 收藏夹管理
- ✅ 私密收藏夹

### 🔍 搜索发现

#### 推荐算法
- ✅ 热门推荐

### 👤 个人空间

#### 个人主页
- ✅ 个人信息展示
- ✅ 发布文章列表
- ✅ 收藏文章列表
- ✅ 关注/粉丝统计

#### 个人设置
- ✅ 基本信息设置

### 🛠️ 管理后台

#### 内容管理
- ✅ 文章审核
- ✅ 评论管理
- ✅ 分类管理
- ✅ 标签管理
- ✅ 批量操作

#### 用户管理
- ✅ 用户列表
- ✅ 用户状态管理
- ✅ 权限分配
- ✅ 封禁解封

#### 系统管理
- ✅ 系统设置
- ✅ 数据统计

## 🗄️ 数据库设计

### 核心数据表

| 表名 | 功能描述 |
|------|----------|
| `users` | 用户基本信息 |
| `posts` | 文章内容主表 |
| `categories` | 内容分类 |
| `tags` | 标签系统 |
| `post_tags` | 文章标签关联 |
| `comments` | 评论系统 |
| `likes` | 点赞记录 |
| `follows` | 关注关系 |
| `user_collection` | 用户收藏夹 |
| `collection_items` | 收藏内容 |

### 数据库特性

- ✅ 支持层级分类
- ✅ 多态点赞系统
- ✅ 软删除机制
- ✅ 全文搜索索引
- ✅ 外键约束
- ✅ 数据统计字段

## 🚀 快速开始

### 环境要求

- **Java**: JDK 17+
- **Node.js**: 16+
- **MySQL**: 8.0+
- **Redis**: 6.0+
- **Maven**: 3.6+

### 后端启动

1. **克隆项目**
```bash
git clone <repository-url>
cd KnowGraph
```

2. **配置数据库**
```bash
# 创建数据库
mysql -u root -p
CREATE DATABASE konwgraph_db;

# 导入数据库结构
mysql -u root -p konwgraph_db < konwgraph_db.sql
```

3. **配置Redis**
```bash
# 启动Redis服务
redis-server
```

4. **配置应用**
```yaml
# application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/konwgraph_db
    username: your_username
    password: your_password
  redis:
    host: localhost
    port: 6379
```

5. **启动后端**
```bash
cd KnowGraph-backend
mvn clean install
mvn spring-boot:run -pl knowgraph-main
```

### 前端启动

1. **安装依赖**
```bash
cd KnowGraph-frontend
npm install
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **访问应用**
- 前端地址: http://localhost:5173
- 后端API: http://localhost:8080

## 📱 页面展示

### 用户端页面

- **首页**: 文章列表、热门推荐
- **文章详情**: 内容展示、评论互动
- **编辑器**: Markdown编辑、实时预览
- **个人主页**: 用户信息、文章列表
- **搜索页面**: 搜索结果、筛选功能
- **分类页面**: 分类浏览、标签筛选
- **设置页面**: 个人设置、隐私配置

### 管理端页面

- **仪表板**: 数据概览、统计图表
- **内容管理**: 文章审核、批量操作
- **用户管理**: 用户列表、权限管理
- **分类管理**: 分类编辑、层级管理
- **系统设置**: 平台配置、参数设置

## 🔧 开发指南

### 后端开发

#### 添加新模块
1. 在父pom.xml中添加模块
2. 创建模块目录和pom.xml
3. 实现业务逻辑
4. 在main模块中引入依赖

#### 数据库操作
```java
// 使用MyBatis进行数据操作
@Mapper
public interface PostMapper {
    List<Post> selectPosts(PostQueryDTO queryDTO);
    int insertPost(Post post);
    int updatePost(Post post);
    int deletePost(Long id);
}
```

#### API开发
```java
@RestController
@RequestMapping("/api/posts")
public class PostController {
    
    @PostMapping
    public R<Long> createPost(@RequestBody PostCreateDTO dto) {
        // 业务逻辑
        return R.ok(postId);
    }
}
```

### 前端开发

#### 组件开发
```jsx
// 功能组件示例
const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
    </div>
  );
};
```

#### API调用
```javascript
// API封装
export const getPosts = (params) => {
  return request.get('/posts', { params });
};

export const createPost = (data) => {
  return request.post('/posts', data);
};
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 代码规范

- **Java**: 遵循阿里巴巴Java开发手册
- **JavaScript**: 使用ESLint配置
- **提交信息**: 使用约定式提交格式

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 团队

- **项目负责人**: [Your Name]
- **后端开发**: [Backend Team]
- **前端开发**: [Frontend Team]
- **UI设计**: [Design Team]

## 📞 联系我们

- **项目地址**: [GitHub Repository]
- **问题反馈**: [Issues]
- **邮箱**: your-email@example.com

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

<div align="center">
  <p>Made with ❤️ by KnowGraph Team</p>
  <p>© 2025 KnowGraph. All rights reserved.</p>
</div>
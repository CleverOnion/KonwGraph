# KnowGraph 知识分享平台 - 后端项目

## 项目简介

KnowGraph 是一个面向大学生的知识分享和学习交流数字化平台，促进学习资源共享和学术交流互动。

## 技术栈

- **框架**: Spring Boot 3.2.3
- **数据库**: MySQL 8.0 + Redis 7.0
- **搜索引擎**: Elasticsearch 8.11.3
- **消息队列**: RabbitMQ
- **ORM**: MyBatis-Plus 3.5.5
- **安全**: Sa-Token 1.37.0
- **文档**: Knife4j 4.3.0
- **构建工具**: Maven 3.8+

## 项目结构

```
KnowGraph-backend/
├── pom.xml                           # 父项目POM (依赖管理和模块管理)
├── README.md                         # 项目说明文档
├── .gitignore                        # Git忽略文件
├── .gitattributes                    # Git属性文件
├── knowgraph-common/                 # 公共模块
├── knowgraph-framework/              # 框架模块
├── knowgraph-system/                 # 系统管理模块
├── knowgraph-user/                   # 用户模块
├── knowgraph-content/                # 内容模块
├── knowgraph-social/                 # 社交模块
├── knowgraph-search/                 # 搜索模块
├── knowgraph-analytics/              # 统计分析模块
└── knowgraph-admin/                  # 管理后台模块
```

## 模块说明

### 1. knowgraph-common (公共模块)
**功能**: 提供公共工具类、常量定义、异常处理等
**依赖**: Spring Boot Web, Validation, Hutool
**包含**:
- 统一响应格式
- 全局异常处理
- 工具类
- 常量定义

### 2. knowgraph-framework (框架模块)
**功能**: 提供基础设施和框架支持
**依赖**: knowgraph-common
**包含**:
- 安全配置 (Sa-Token + Redis + JWT)
- 数据库配置 (MyBatis-Plus + Druid)
- 缓存配置 (Redis + Redisson)
- 消息队列配置 (RabbitMQ)
- 搜索引擎配置 (Elasticsearch)
- 文件存储配置 (MinIO)
- 任务调度配置 (XXL-Job)

### 3. knowgraph-system (系统管理模块)
**功能**: 系统级功能管理
**依赖**: knowgraph-framework
**包含**:
- 系统配置管理
- 权限管理
- 角色管理
- 菜单管理
- 字典管理
- 系统监控

### 4. knowgraph-user (用户模块)
**功能**: 用户相关功能
**依赖**: knowgraph-framework, knowgraph-system
**包含**:
- 用户注册登录
- 个人资料管理
- 头像上传
- 积分管理
- 用户等级体系

### 5. knowgraph-content (内容模块)
**功能**: 内容管理相关功能
**依赖**: knowgraph-framework, knowgraph-user
**包含**:
- 文章发布管理
- 富文本编辑
- 分类标签管理
- 内容审核
- 版本控制

### 6. knowgraph-social (社交模块)
**功能**: 社交互动功能
**依赖**: knowgraph-framework, knowgraph-user, knowgraph-content
**包含**:
- 点赞收藏
- 评论回复
- 关注粉丝
- 私信功能
- 实时通知

### 7. knowgraph-search (搜索模块)
**功能**: 搜索和推荐功能
**依赖**: knowgraph-framework, knowgraph-content, knowgraph-user
**包含**:
- 全文搜索
- 标签搜索
- 内容推荐
- 热门推荐
- 搜索历史

### 8. knowgraph-analytics (统计分析模块)
**功能**: 数据统计和分析
**依赖**: knowgraph-framework, knowgraph-content, knowgraph-user, knowgraph-social
**包含**:
- 用户行为统计
- 内容统计
- 热门排行
- 数据报表
- 可视化接口

### 9. knowgraph-admin (管理后台模块)
**功能**: 管理后台应用
**依赖**: 所有业务模块
**包含**:
- 系统管理
- 用户管理
- 内容审核
- 数据统计
- 系统监控

## 依赖关系图

```
knowgraph-admin
├── knowgraph-analytics
│   ├── knowgraph-social
│   │   ├── knowgraph-content
│   │   │   ├── knowgraph-user
│   │   │   │   ├── knowgraph-system
│   │   │   │   │   └── knowgraph-framework
│   │   │   │   │       └── knowgraph-common
│   │   │   │   └── knowgraph-framework
│   │   │   └── knowgraph-framework
│   │   └── knowgraph-framework
│   └── knowgraph-framework
├── knowgraph-search
│   └── knowgraph-framework
└── knowgraph-system
    └── knowgraph-framework
```
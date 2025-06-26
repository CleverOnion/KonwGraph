/*
 Navicat Premium Data Transfer

 Source Server         : 本机MySQL
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : 127.0.0.1:3306
 Source Schema         : knowgraph_db

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 25/06/2025 20:25:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '分类主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',
  `slug` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'URL友好型别名',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '分类描述',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_name`(`name` ASC) USING BTREE,
  UNIQUE INDEX `uk_slug`(`slug` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '内容分类表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, 'Java', 'Java', 'Java');
INSERT INTO `categories` VALUES (2, 'Rust', 'rust', 'Rust\n');
INSERT INTO `categories` VALUES (3, 'php', 'php', 'php');
INSERT INTO `categories` VALUES (4, 'Nest', 'Nest', 'Nest\n');
INSERT INTO `categories` VALUES (5, 'python', 'python', 'python');
INSERT INTO `categories` VALUES (6, 'C', 'C', 'C');
INSERT INTO `categories` VALUES (7, 'C++', 'C++', 'C++');
INSERT INTO `categories` VALUES (8, 'C#', 'C#', 'C#');
INSERT INTO `categories` VALUES (9, 'Javascript', 'Javascript', 'Javascript');

-- ----------------------------
-- Table structure for collection_items
-- ----------------------------
DROP TABLE IF EXISTS `collection_items`;
CREATE TABLE `collection_items`  (
  `collection_id` bigint NOT NULL COMMENT '收藏夹ID',
  `post_id` bigint NOT NULL COMMENT '收藏的文章ID',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
  PRIMARY KEY (`collection_id`, `post_id`) USING BTREE,
  INDEX `fk_collection_items_post`(`post_id` ASC) USING BTREE,
  CONSTRAINT `fk_collection_items_collection` FOREIGN KEY (`collection_id`) REFERENCES `user_collection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_collection_items_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '收藏夹与文章的关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of collection_items
-- ----------------------------
INSERT INTO `collection_items` VALUES (2, 1, '2025-06-25 11:50:06');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '评论主键ID',
  `post_id` bigint NOT NULL COMMENT '关联的文章ID',
  `user_id` bigint NOT NULL COMMENT '评论者ID',
  `parent_id` bigint NULL DEFAULT NULL COMMENT '父评论ID，用于实现楼中楼回复',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论内容',
  `status` enum('VISIBLE','HIDDEN','DELETED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'VISIBLE' COMMENT '评论状态: VISIBLE-可见, HIDDEN-隐藏, DELETED-已删除',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_post_id`(`post_id` ASC) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_parent_id`(`parent_id` ASC) USING BTREE,
  CONSTRAINT `fk_comments_parent` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '评论表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, 1, 1, NULL, '测试', 'VISIBLE', '2025-06-24 15:54:38', '2025-06-24 15:54:38');
INSERT INTO `comments` VALUES (2, 1, 1, 1, '@yh1 倪浩', 'VISIBLE', '2025-06-24 16:16:10', '2025-06-24 16:16:10');
INSERT INTO `comments` VALUES (3, 1, 1, 2, '@yh1 123213', 'VISIBLE', '2025-06-24 16:16:16', '2025-06-24 16:16:16');
INSERT INTO `comments` VALUES (4, 1, 2, NULL, '123', 'VISIBLE', '2025-06-25 15:59:26', '2025-06-25 15:59:26');
INSERT INTO `comments` VALUES (5, 1, 2, 2, '@yh11 123123', 'VISIBLE', '2025-06-25 15:59:32', '2025-06-25 15:59:32');
INSERT INTO `comments` VALUES (6, 13, 1, NULL, '很好！', 'VISIBLE', '2025-06-25 20:18:03', '2025-06-25 20:18:03');
INSERT INTO `comments` VALUES (7, 13, 1, 6, '@yh11 我很喜欢！', 'VISIBLE', '2025-06-25 20:18:07', '2025-06-25 20:18:07');

-- ----------------------------
-- Table structure for follows
-- ----------------------------
DROP TABLE IF EXISTS `follows`;
CREATE TABLE `follows`  (
  `follower_id` bigint NOT NULL COMMENT '关注者ID',
  `following_id` bigint NOT NULL COMMENT '被关注者ID',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  PRIMARY KEY (`follower_id`, `following_id`) USING BTREE,
  INDEX `idx_following_id`(`following_id` ASC) USING BTREE,
  CONSTRAINT `fk_follows_follower` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_follows_following` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户关注关系表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of follows
-- ----------------------------
INSERT INTO `follows` VALUES (1, 2, '2025-06-25 19:25:34');

-- ----------------------------
-- Table structure for likes
-- ----------------------------
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '点赞主键ID',
  `user_id` bigint NOT NULL COMMENT '点赞的用户ID',
  `likable_id` bigint NOT NULL COMMENT '被点赞对象的ID (如 post_id, comment_id)',
  `likable_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '被点赞对象的类型 (如 \'POST\', \'COMMENT\')',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_likable`(`user_id` ASC, `likable_id` ASC, `likable_type` ASC) USING BTREE,
  INDEX `idx_likable`(`likable_id` ASC, `likable_type` ASC) USING BTREE,
  CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '点赞表 (多态)' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of likes
-- ----------------------------
INSERT INTO `likes` VALUES (30, 1, 1, 'POST', '2025-06-24 18:53:17');
INSERT INTO `likes` VALUES (31, 2, 1, 'POST', '2025-06-25 13:22:23');

-- ----------------------------
-- Table structure for post_tags
-- ----------------------------
DROP TABLE IF EXISTS `post_tags`;
CREATE TABLE `post_tags`  (
  `post_id` bigint NOT NULL COMMENT '文章ID',
  `tag_id` int NOT NULL COMMENT '标签ID',
  PRIMARY KEY (`post_id`, `tag_id`) USING BTREE,
  INDEX `idx_tag_id_post_id`(`tag_id` ASC, `post_id` ASC) USING BTREE,
  CONSTRAINT `fk_post_tags_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_post_tags_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章与标签的关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of post_tags
-- ----------------------------
INSERT INTO `post_tags` VALUES (1, 1);
INSERT INTO `post_tags` VALUES (1, 2);
INSERT INTO `post_tags` VALUES (2, 3);
INSERT INTO `post_tags` VALUES (2, 4);

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '内容主键ID',
  `user_id` bigint NOT NULL COMMENT '作者的用户ID',
  `category_id` int NOT NULL COMMENT '分类ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文章摘要，用于列表页展示',
  `content_md` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Markdown原文',
  `content_html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '由Markdown渲染后的HTML内容',
  `status` enum('DRAFT','PUBLISHED','PENDING_REVIEW','REJECTED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT' COMMENT '内容状态: DRAFT-草稿, PUBLISHED-已发布, PENDING_REVIEW-待审核, REJECTED-已驳回',
  `is_featured` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否精选推荐 (0-否, 1-是)',
  `published_at` timestamp NULL DEFAULT NULL COMMENT '内容发布时间',
  `view_count` int NOT NULL DEFAULT 0 COMMENT '阅读量',
  `like_count` int NOT NULL DEFAULT 0 COMMENT '点赞数',
  `comment_count` int NOT NULL DEFAULT 0 COMMENT '评论数',
  `collect_count` int NOT NULL DEFAULT 0 COMMENT '收藏数',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT '软删除标记',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_category_id`(`category_id` ASC) USING BTREE,
  INDEX `idx_status_published_at`(`status` ASC, `published_at` DESC) USING BTREE,
  INDEX `idx_deleted_at`(`deleted_at` ASC) USING BTREE,
  FULLTEXT INDEX `ft_title_summary`(`title`, `summary`),
  CONSTRAINT `fk_posts_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_posts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '内容主表 (文章、笔记等)' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (1, 1, 1, '123', '开始写作吧！\n\n这里支持完整的 Markdown 语法。', '## 开始写作吧！\n\n这里支持完整的 Markdown 语法。', '<h2>开始写作吧！</h2>\n<p>这里支持完整的 Markdown 语法。</p>\n', 'PUBLISHED', 0, '2025-06-24 12:33:18', 45, 2, 5, 0, '2025-06-24 12:33:17', '2025-06-25 16:00:59', NULL);
INSERT INTO `posts` VALUES (2, 2, 1, '123123', '开始写作吧！\n\n这里支持完整的 Markdown 语法。\n\n\n 123\n- 123\n- 456', '## 开始写作吧！\n\n这里支持完整的 Markdown 语法。\n\n\n### 123\n- 123\n- 456 ', '<h2>开始写作吧！</h2>\n<p>这里支持完整的 Markdown 语法。</p>\n<h3>123</h3>\n<ul>\n<li>123</li>\n<li>456</li>\n</ul>\n', 'PUBLISHED', 0, '2025-06-25 15:59:59', 4, 0, 0, 0, '2025-06-25 15:59:59', '2025-06-25 19:13:23', NULL);
INSERT INTO `posts` VALUES (3, 1, 2, '测试', '开始写作吧！\n\n这里支持完整的 Markdown 语法。', '## 开始写作吧！\n\n这里支持完整的 Markdown 语法。', '<h2>开始写作吧！</h2>\n<p>这里支持完整的 Markdown 语法。</p>\n', 'PUBLISHED', 0, '2025-06-25 19:12:35', 6, 0, 0, 0, '2025-06-25 19:12:34', '2025-06-25 19:45:02', NULL);
INSERT INTO `posts` VALUES (4, 1, 1, 'Java基础：面向对象编程的核心概念', 'Java基础：面向对象编程的核心概念\n\n 摘要\nJava作为一门面向对象的编程语言，其核心概念包括类、对象、继承、多态和封装。本文将深入探讨这些概念及其在Java中的实现方式。\n\n 主要内容\n- 类和对象：类的定义与实例化\n- 继承：extends关键字的使用\n- 多态：方法重载与重写\n- 封装：访问修饰符的作用\n\n 示例代码\njava\npublic class Animal {\n    pub', '# Java基础：面向对象编程的核心概念\n\n## 摘要\nJava作为一门面向对象的编程语言，其核心概念包括类、对象、继承、多态和封装。本文将深入探讨这些概念及其在Java中的实现方式。\n\n## 主要内容\n- **类和对象**：类的定义与实例化\n- **继承**：`extends`关键字的使用\n- **多态**：方法重载与重写\n- **封装**：访问修饰符的作用\n\n## 示例代码\n```java\npublic class Animal {\n    public void makeSound() {\n        System.out.println(\"Some sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    public void makeSound() {\n        System.out.println(\"Bark\");\n    }\n}', '<h1>Java基础：面向对象编程的核心概念</h1>\n<h2>摘要</h2>\n<p>Java作为一门面向对象的编程语言，其核心概念包括类、对象、继承、多态和封装。本文将深入探讨这些概念及其在Java中的实现方式。</p>\n<h2>主要内容</h2>\n<ul>\n<li><strong>类和对象</strong>：类的定义与实例化</li>\n<li><strong>继承</strong>：<code>extends</code>关键字的使用</li>\n<li><strong>多态</strong>：方法重载与重写</li>\n<li><strong>封装</strong>：访问修饰符的作用</li>\n</ul>\n<h2>示例代码</h2>\n<pre><code class=\"language-java\">public class Animal {\n    public void makeSound() {\n        System.out.println(&quot;Some sound&quot;);\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    public void makeSound() {\n        System.out.println(&quot;Bark&quot;);\n    }\n}\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 19:53:04', 0, 0, 0, 0, '2025-06-25 19:53:03', '2025-06-25 19:53:30', NULL);
INSERT INTO `posts` VALUES (5, 1, 1, 'Java多线程编程指南', 'Java多线程编程指南\n\n 摘要\nJava提供了丰富的多线程支持，从基础的Thread类到高级的并发工具。本文涵盖线程创建、同步和线程池等内容。\n\n 主要内容\n- 创建线程的三种方式：\n  1. 继承Thread类\n  2. 实现Runnable接口\n  3. 使用Callable和Future\n- 同步机制：synchronized关键字\n- 线程池：Executor框架\n\n 代码示例\njav', '# Java多线程编程指南\n\n## 摘要\nJava提供了丰富的多线程支持，从基础的Thread类到高级的并发工具。本文涵盖线程创建、同步和线程池等内容。\n\n## 主要内容\n- 创建线程的三种方式：\n  1. 继承Thread类\n  2. 实现Runnable接口\n  3. 使用Callable和Future\n- 同步机制：synchronized关键字\n- 线程池：Executor框架\n\n## 代码示例\n```java\nExecutorService executor = Executors.newFixedThreadPool(5);\nexecutor.submit(() -> {\n    System.out.println(\"Task running in thread pool\");\n});\nexecutor.shutdown();', '<h1>Java多线程编程指南</h1>\n<h2>摘要</h2>\n<p>Java提供了丰富的多线程支持，从基础的Thread类到高级的并发工具。本文涵盖线程创建、同步和线程池等内容。</p>\n<h2>主要内容</h2>\n<ul>\n<li>创建线程的三种方式：\n<ol>\n<li>继承Thread类</li>\n<li>实现Runnable接口</li>\n<li>使用Callable和Future</li>\n</ol>\n</li>\n<li>同步机制：synchronized关键字</li>\n<li>线程池：Executor框架</li>\n</ul>\n<h2>代码示例</h2>\n<pre><code class=\"language-java\">ExecutorService executor = Executors.newFixedThreadPool(5);\nexecutor.submit(() -&gt; {\n    System.out.println(&quot;Task running in thread pool&quot;);\n});\nexecutor.shutdown();\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 19:54:10', 0, 0, 0, 0, '2025-06-25 19:54:09', '2025-06-25 20:05:35', NULL);
INSERT INTO `posts` VALUES (6, 1, 1, 'Java设计模式：单例模式实现', 'Java设计模式：单例模式实现\n\n 摘要\n单例模式确保一个类只有一个实例，并提供一个全局访问点。本文介绍多种实现方式。\n\n 实现方式\n1. 饿汉式\n2. 懒汉式（线程安全）\n3. 双重检查锁定\n4. 静态内部类\n5. 枚举实现（推荐）\n\n 示例代码\njava\npublic enum Singleton {\n    INSTANCE;\n    \n    public void doSomethin', '# Java设计模式：单例模式实现\n\n## 摘要\n单例模式确保一个类只有一个实例，并提供一个全局访问点。本文介绍多种实现方式。\n\n## 实现方式\n1. 饿汉式\n2. 懒汉式（线程安全）\n3. 双重检查锁定\n4. 静态内部类\n5. 枚举实现（推荐）\n\n## 示例代码\n```java\npublic enum Singleton {\n    INSTANCE;\n    \n    public void doSomething() {\n        // ...\n    }\n}', '<h1>Java设计模式：单例模式实现</h1>\n<h2>摘要</h2>\n<p>单例模式确保一个类只有一个实例，并提供一个全局访问点。本文介绍多种实现方式。</p>\n<h2>实现方式</h2>\n<ol>\n<li>饿汉式</li>\n<li>懒汉式（线程安全）</li>\n<li>双重检查锁定</li>\n<li>静态内部类</li>\n<li>枚举实现（推荐）</li>\n</ol>\n<h2>示例代码</h2>\n<pre><code class=\"language-java\">public enum Singleton {\n    INSTANCE;\n    \n    public void doSomething() {\n        // ...\n    }\n}\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 19:54:29', 0, 0, 0, 0, '2025-06-25 19:54:29', '2025-06-25 20:05:34', NULL);
INSERT INTO `posts` VALUES (7, 1, 1, 'Java网络编程：Socket通信', 'Java网络编程：Socket通信\n\n 摘要\nJava提供了强大的网络编程能力。本文介绍基于TCP/IP的Socket通信实现。\n\n 主要内容\n- ServerSocket类\n- Socket类\n- 多客户端处理\n- NIO非阻塞IO\n\n 示例代码\njava\n// 服务器端\nServerSocket serverSocket = new ServerSocket8080;\nSocket clie', '# Java网络编程：Socket通信\n\n## 摘要\nJava提供了强大的网络编程能力。本文介绍基于TCP/IP的Socket通信实现。\n\n## 主要内容\n- ServerSocket类\n- Socket类\n- 多客户端处理\n- NIO非阻塞IO\n\n## 示例代码\n```java\n// 服务器端\nServerSocket serverSocket = new ServerSocket(8080);\nSocket clientSocket = serverSocket.accept();\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(clientSocket.getInputStream()));\nString request = in.readLine();', '<h1>Java网络编程：Socket通信</h1>\n<h2>摘要</h2>\n<p>Java提供了强大的网络编程能力。本文介绍基于TCP/IP的Socket通信实现。</p>\n<h2>主要内容</h2>\n<ul>\n<li>ServerSocket类</li>\n<li>Socket类</li>\n<li>多客户端处理</li>\n<li>NIO非阻塞IO</li>\n</ul>\n<h2>示例代码</h2>\n<pre><code class=\"language-java\">// 服务器端\nServerSocket serverSocket = new ServerSocket(8080);\nSocket clientSocket = serverSocket.accept();\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(clientSocket.getInputStream()));\nString request = in.readLine();\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 19:54:45', 0, 0, 0, 0, '2025-06-25 19:54:45', '2025-06-25 20:05:32', NULL);
INSERT INTO `posts` VALUES (8, 1, 3, 'PHP基础语法入门', 'PHP基础语法入门\n\n 摘要\nPHP是最流行的服务器端脚本语言之一。本文将介绍PHP的基本语法和常用功能。\n\n 主要内容\n- PHP标记 <?php ?>\n- 变量和数据类型\n- 运算符\n- 流程控制（if/else, switch）\n\n 示例代码\nphp\n<?php\n$name = \"World\";\necho \"Hello, $name!\";  // 输出：Hello, World!\n\n$ag', '# PHP基础语法入门\n\n## 摘要\nPHP是最流行的服务器端脚本语言之一。本文将介绍PHP的基本语法和常用功能。\n\n## 主要内容\n- PHP标记 `<?php ?>`\n- 变量和数据类型\n- 运算符\n- 流程控制（if/else, switch）\n\n## 示例代码\n```php\n<?php\n$name = \"World\";\necho \"Hello, $name!\";  // 输出：Hello, World!\n\n$age = 25;\nif ($age >= 18) {\n    echo \"成年人\";\n} else {\n    echo \"未成年人\";\n}\n?>', '<h1>PHP基础语法入门</h1>\n<h2>摘要</h2>\n<p>PHP是最流行的服务器端脚本语言之一。本文将介绍PHP的基本语法和常用功能。</p>\n<h2>主要内容</h2>\n<ul>\n<li>PHP标记 <code>&lt;?php ?&gt;</code></li>\n<li>变量和数据类型</li>\n<li>运算符</li>\n<li>流程控制（if/else, switch）</li>\n</ul>\n<h2>示例代码</h2>\n<pre><code class=\"language-php\">&lt;?php\n$name = &quot;World&quot;;\necho &quot;Hello, $name!&quot;;  // 输出：Hello, World!\n\n$age = 25;\nif ($age &gt;= 18) {\n    echo &quot;成年人&quot;;\n} else {\n    echo &quot;未成年人&quot;;\n}\n?&gt;\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 19:57:46', 0, 0, 0, 0, '2025-06-25 19:57:46', '2025-06-25 20:05:30', NULL);
INSERT INTO `posts` VALUES (9, 1, 3, 'PHP安全编程实践', 'PHP安全编程实践\n\n 摘要\n安全性是Web开发的重中之重。本文将介绍PHP开发中的常见安全问题和解决方案。\n\n 主要内容\n- SQL注入防护\n- XSS防护\n- CSRF防护\n- 文件上传安全\n\n 防护措施\nphp\n<?php\n// SQL注入防护\n$stmt = $pdo->prepare\'SELECT  FROM users WHERE email = :email\';\n$stmt->ex', '# PHP安全编程实践\n\n## 摘要\n安全性是Web开发的重中之重。本文将介绍PHP开发中的常见安全问题和解决方案。\n\n## 主要内容\n- SQL注入防护\n- XSS防护\n- CSRF防护\n- 文件上传安全\n\n## 防护措施\n```php\n<?php\n// SQL注入防护\n$stmt = $pdo->prepare(\'SELECT * FROM users WHERE email = :email\');\n$stmt->execute([\'email\' => $email]);\n\n// XSS防护\necho htmlspecialchars($userInput, ENT_QUOTES, \'UTF-8\');\n?>', '<h1>PHP安全编程实践</h1>\n<h2>摘要</h2>\n<p>安全性是Web开发的重中之重。本文将介绍PHP开发中的常见安全问题和解决方案。</p>\n<h2>主要内容</h2>\n<ul>\n<li>SQL注入防护</li>\n<li>XSS防护</li>\n<li>CSRF防护</li>\n<li>文件上传安全</li>\n</ul>\n<h2>防护措施</h2>\n<pre><code class=\"language-php\">&lt;?php\n// SQL注入防护\n$stmt = $pdo-&gt;prepare(\'SELECT * FROM users WHERE email = :email\');\n$stmt-&gt;execute([\'email\' =&gt; $email]);\n\n// XSS防护\necho htmlspecialchars($userInput, ENT_QUOTES, \'UTF-8\');\n?&gt;\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 19:58:05', 0, 0, 0, 0, '2025-06-25 19:58:05', '2025-06-25 20:05:29', NULL);
INSERT INTO `posts` VALUES (10, 1, 2, 'Rust入门：所有权系统详解', 'Rust入门：所有权系统详解\n\n 摘要\nRust的所有权系统是其最核心的特性之一，它保证了内存安全而无需垃圾回收。本文将深入讲解所有权、借用和生命周期。\n\n 主要内容\n- 所有权三原则\n- 移动（Move）语义\n- 借用规则：\n  - 不可变借用（&T）\n  - 可变借用（&mut T）\n- 生命周期注解\n\n 示例代码\nrust\nfn main {\n    let s1 = String::fr', '# Rust入门：所有权系统详解\n\n## 摘要\nRust的所有权系统是其最核心的特性之一，它保证了内存安全而无需垃圾回收。本文将深入讲解所有权、借用和生命周期。\n\n## 主要内容\n- 所有权三原则\n- 移动（Move）语义\n- 借用规则：\n  - 不可变借用（&T）\n  - 可变借用（&mut T）\n- 生命周期注解\n\n## 示例代码\n```rust\nfn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;  // s1的所有权移动到s2\n    // println!(\"{}\", s1);  // 编译错误！s1不再有效\n    \n    let len = calculate_length(&s2);  // 不可变借用\n    println!(\"\'{}\'的长度是{}\", s2, len);\n}\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}', '<h1>Rust入门：所有权系统详解</h1>\n<h2>摘要</h2>\n<p>Rust的所有权系统是其最核心的特性之一，它保证了内存安全而无需垃圾回收。本文将深入讲解所有权、借用和生命周期。</p>\n<h2>主要内容</h2>\n<ul>\n<li>所有权三原则</li>\n<li>移动（Move）语义</li>\n<li>借用规则：\n<ul>\n<li>不可变借用（&amp;T）</li>\n<li>可变借用（&amp;mut T）</li>\n</ul>\n</li>\n<li>生命周期注解</li>\n</ul>\n<h2>示例代码</h2>\n<pre><code class=\"language-rust\">fn main() {\n    let s1 = String::from(&quot;hello&quot;);\n    let s2 = s1;  // s1的所有权移动到s2\n    // println!(&quot;{}&quot;, s1);  // 编译错误！s1不再有效\n    \n    let len = calculate_length(&amp;s2);  // 不可变借用\n    println!(&quot;\'{}\'的长度是{}&quot;, s2, len);\n}\n\nfn calculate_length(s: &amp;String) -&gt; usize {\n    s.len()\n}\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 20:01:55', 0, 0, 0, 0, '2025-06-25 20:01:54', '2025-06-25 20:05:28', NULL);
INSERT INTO `posts` VALUES (11, 1, 2, 'Rust嵌入式开发入门', 'Rust嵌入式开发入门\n\n 摘要\nRust非常适合嵌入式开发。本文将介绍如何使用Rust开发嵌入式系统。\n\n 主要内容\n- 裸机编程（no_std）\n- 硬件抽象层（HAL）\n- 嵌入式框架：\n  - RTIC\n  - Embassy\n- 交叉编译\n- 常见MCU支持\n\n 示例代码\nrust\n!no_std\n!no_main\n\nuse panic_halt as _;\nuse arduino_h', '# Rust嵌入式开发入门\n\n## 摘要\nRust非常适合嵌入式开发。本文将介绍如何使用Rust开发嵌入式系统。\n\n## 主要内容\n- 裸机编程（no_std）\n- 硬件抽象层（HAL）\n- 嵌入式框架：\n  - RTIC\n  - Embassy\n- 交叉编译\n- 常见MCU支持\n\n## 示例代码\n```rust\n#![no_std]\n#![no_main]\n\nuse panic_halt as _;\nuse arduino_hal::prelude::*;\n\n#[arduino_hal::entry]\nfn main() -> ! {\n    let dp = arduino_hal::Peripherals::take().unwrap();\n    let pins = arduino_hal::pins!(dp);\n    \n    let mut led = pins.d13.into_output();\n    \n    loop {\n        led.toggle();\n        arduino_hal::delay_ms(1000);\n    }\n}', '<h1>Rust嵌入式开发入门</h1>\n<h2>摘要</h2>\n<p>Rust非常适合嵌入式开发。本文将介绍如何使用Rust开发嵌入式系统。</p>\n<h2>主要内容</h2>\n<ul>\n<li>裸机编程（no_std）</li>\n<li>硬件抽象层（HAL）</li>\n<li>嵌入式框架：\n<ul>\n<li>RTIC</li>\n<li>Embassy</li>\n</ul>\n</li>\n<li>交叉编译</li>\n<li>常见MCU支持</li>\n</ul>\n<h2>示例代码</h2>\n<pre><code class=\"language-rust\">#![no_std]\n#![no_main]\n\nuse panic_halt as _;\nuse arduino_hal::prelude::*;\n\n#[arduino_hal::entry]\nfn main() -&gt; ! {\n    let dp = arduino_hal::Peripherals::take().unwrap();\n    let pins = arduino_hal::pins!(dp);\n    \n    let mut led = pins.d13.into_output();\n    \n    loop {\n        led.toggle();\n        arduino_hal::delay_ms(1000);\n    }\n}\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 20:02:16', 0, 0, 0, 0, '2025-06-25 20:02:16', '2025-06-25 20:05:26', NULL);
INSERT INTO `posts` VALUES (12, 1, 5, 'Python基础：从零开始学Python', 'Python基础：从零开始学Python\n\n 摘要\nPython因其简洁易读的语法而广受欢迎。本文将介绍Python的基础语法和核心概念。\n\n 主要内容\n- 变量和数据类型\n- 基本运算符\n- 控制流程（if/else, for/while）\n- 函数定义\n\n 示例代码\npython\n 变量和数据类型\nname = \"Alice\"\nage = 25\nis_student = True\n\n 控制流', '# Python基础：从零开始学Python\n\n## 摘要\nPython因其简洁易读的语法而广受欢迎。本文将介绍Python的基础语法和核心概念。\n\n## 主要内容\n- 变量和数据类型\n- 基本运算符\n- 控制流程（if/else, for/while）\n- 函数定义\n\n## 示例代码\n```python\n# 变量和数据类型\nname = \"Alice\"\nage = 25\nis_student = True\n\n# 控制流程\nif age >= 18:\n    print(f\"{name}是成年人\")\nelse:\n    print(f\"{name}是未成年人\")\n\n# 函数定义\ndef greet(person):\n    return f\"Hello, {person}!\"\n\nprint(greet(name))', '<h1>Python基础：从零开始学Python</h1>\n<h2>摘要</h2>\n<p>Python因其简洁易读的语法而广受欢迎。本文将介绍Python的基础语法和核心概念。</p>\n<h2>主要内容</h2>\n<ul>\n<li>变量和数据类型</li>\n<li>基本运算符</li>\n<li>控制流程（if/else, for/while）</li>\n<li>函数定义</li>\n</ul>\n<h2>示例代码</h2>\n<pre><code class=\"language-python\"># 变量和数据类型\nname = &quot;Alice&quot;\nage = 25\nis_student = True\n\n# 控制流程\nif age &gt;= 18:\n    print(f&quot;{name}是成年人&quot;)\nelse:\n    print(f&quot;{name}是未成年人&quot;)\n\n# 函数定义\ndef greet(person):\n    return f&quot;Hello, {person}!&quot;\n\nprint(greet(name))\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 20:04:49', 0, 0, 0, 0, '2025-06-25 20:04:49', '2025-06-25 20:05:24', NULL);
INSERT INTO `posts` VALUES (13, 1, 5, '2. Python面向对象编程详解', '2. Python面向对象编程详解\nmarkdown\n Python面向对象编程详解\n\n 摘要\nPython完全支持面向对象编程。本文将深入讲解类、对象、继承和多态等OOP概念。\n\n 主要内容\n- 类和对象\n- 继承和方法重写\n- 魔术方法（__init__, __str__）\n- 类变量和实例变量\n- 属性装饰器\n\n 示例代码\npython\nclass Animal:\n    def __in', '### 2. Python面向对象编程详解\n```markdown\n# Python面向对象编程详解\n\n## 摘要\nPython完全支持面向对象编程。本文将深入讲解类、对象、继承和多态等OOP概念。\n\n## 主要内容\n- 类和对象\n- 继承和方法重写\n- 魔术方法（`__init__`, `__str__`）\n- 类变量和实例变量\n- 属性装饰器\n\n## 示例代码\n```python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        raise NotImplementedError(\"子类必须实现此方法\")\n\nclass Dog(Animal):\n    def speak(self):\n        return \"汪汪！\"\n\ndog = Dog(\"阿黄\")\nprint(f\"{dog.name}说：{dog.speak()}\")', '<h3>2. Python面向对象编程详解</h3>\n<pre><code class=\"language-markdown\"># Python面向对象编程详解\n\n## 摘要\nPython完全支持面向对象编程。本文将深入讲解类、对象、继承和多态等OOP概念。\n\n## 主要内容\n- 类和对象\n- 继承和方法重写\n- 魔术方法（`__init__`, `__str__`）\n- 类变量和实例变量\n- 属性装饰器\n\n## 示例代码\n```python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        raise NotImplementedError(&quot;子类必须实现此方法&quot;)\n\nclass Dog(Animal):\n    def speak(self):\n        return &quot;汪汪！&quot;\n\ndog = Dog(&quot;阿黄&quot;)\nprint(f&quot;{dog.name}说：{dog.speak()}&quot;)\n</code></pre>\n', 'PUBLISHED', 0, '2025-06-25 20:05:13', 2, 0, 2, 0, '2025-06-25 20:05:13', '2025-06-25 20:18:07', NULL);

-- ----------------------------
-- Table structure for reports
-- ----------------------------
DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '举报ID',
  `reporter_id` bigint NOT NULL COMMENT '举报人ID',
  `target_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '举报目标类型：POST-文章，COMMENT-评论，USER-用户',
  `target_id` bigint NOT NULL COMMENT '举报目标ID',
  `reason_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '举报原因类型：SPAM-垃圾信息，INAPPROPRIATE-不当内容，HARASSMENT-骚扰，COPYRIGHT-版权侵犯，OTHER-其他',
  `reason_detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '详细举报原因',
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING' COMMENT '处理状态：PENDING-待处理，RESOLVED-已处理，REJECTED-已驳回',
  `admin_id` bigint NULL DEFAULT NULL COMMENT '处理管理员ID',
  `admin_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '管理员处理备注',
  `auto_action_taken` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '自动执行的操作记录',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_reporter_target`(`reporter_id` ASC, `target_type` ASC, `target_id` ASC) USING BTREE,
  INDEX `idx_reporter_id`(`reporter_id` ASC) USING BTREE,
  INDEX `idx_target`(`target_type` ASC, `target_id` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE,
  INDEX `idx_admin_id`(`admin_id` ASC) USING BTREE,
  INDEX `idx_created_at`(`created_at` ASC) USING BTREE,
  CONSTRAINT `fk_reports_admin` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_reports_reporter` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '举报表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reports
-- ----------------------------

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '标签主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标签名称',
  `slug` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'URL友好型别名',
  `post_count` int NOT NULL DEFAULT 0 COMMENT '引用该标签的文章数',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_name`(`name` ASC) USING BTREE,
  UNIQUE INDEX `uk_slug`(`slug` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '标签表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES (1, '3', '3', 0);
INSERT INTO `tags` VALUES (2, '2', '2', 0);
INSERT INTO `tags` VALUES (3, '王景然', '王景然', 0);
INSERT INTO `tags` VALUES (4, '123', '123', 0);

-- ----------------------------
-- Table structure for user_collection
-- ----------------------------
DROP TABLE IF EXISTS `user_collection`;
CREATE TABLE `user_collection`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '收藏夹主键ID',
  `user_id` bigint NOT NULL COMMENT '所属用户ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '收藏夹名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '收藏夹描述',
  `is_private` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否私密 (0-否, 1-是)',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `fk_collections_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户收藏夹' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_collection
-- ----------------------------
INSERT INTO `user_collection` VALUES (1, 1, '我的收藏', '默认收藏夹', 0, '2025-06-24 19:02:37', '2025-06-24 19:02:37');
INSERT INTO `user_collection` VALUES (2, 1, '测试', '测试', 0, '2025-06-24 22:46:40', '2025-06-24 22:46:40');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户主键ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名，用于登录',
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '加密后的密码',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '电子邮箱，用于找回密码和通知',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户昵称',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户头像图片的URL',
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '个人简介',
  `points` int NOT NULL DEFAULT 0 COMMENT '用户积分',
  `role` enum('USER','ADMIN','MODERATOR') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER' COMMENT '用户角色: USER-普通用户, ADMIN-管理员, MODERATOR-版主',
  `status` enum('ACTIVE','BANNED','PENDING_VERIFICATION') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ACTIVE' COMMENT '账户状态: ACTIVE-活跃, BANNED-封禁, PENDING_VERIFICATION-待验证',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT '软删除标记',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `uk_email`(`email` ASC) USING BTREE,
  INDEX `idx_deleted_at`(`deleted_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'yh1', 'e10adc3949ba59abbe56e057f20f883e', 'cleveroniona1@qq.com', 'yh11', 'http://localhost:8080/uploads/avatars/2025/06/25/9907f1a8-9a45-42fc-a374-2cb99e4ad11e.jpg', '123', 0, 'USER', 'ACTIVE', '2025-06-23 16:03:38', '2025-06-25 19:44:55', NULL);
INSERT INTO `users` VALUES (2, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1234567@qq.com', 'admin', NULL, NULL, 0, 'ADMIN', 'ACTIVE', '2025-06-25 13:22:13', '2025-06-25 16:01:55', NULL);

SET FOREIGN_KEY_CHECKS = 1;

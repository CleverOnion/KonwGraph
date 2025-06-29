# 内容审核模块使用说明

## 功能概述

内容审核模块是KnowGraph管理后台的核心功能之一，用于管理和审核用户发布的文章内容，确保平台内容质量和合规性。

## 主要功能

### 1. 审核列表页面 (`/admin/review`)

- **文章列表展示**：显示所有文章的基本信息
- **状态筛选**：支持按文章状态筛选（待审核、已发布、已驳回、草稿）
- **搜索功能**：支持按文章标题或作者名称搜索
- **批量操作**：支持批量通过或驳回文章
- **快速审核**：直接在列表页进行快速通过/驳回操作

### 2. 文章预览和详细审核

- **文章预览**：支持Markdown格式的文章内容预览
- **作者信息**：显示文章作者、创建时间、浏览量等信息
- **分类标签**：显示文章所属分类和标签
- **审核操作**：提供通过/驳回选项和备注功能
- **快速备注模板**：预设常用的审核备注模板

### 3. 审核统计

- **实时统计**：显示待审核、已通过、已驳回文章数量
- **数据可视化**：在仪表盘中展示审核相关统计信息

## 使用流程

### 审核单篇文章

1. 进入 `管理后台 > 内容审核`
2. 在文章列表中找到需要审核的文章
3. 点击「预览」按钮查看文章详情
4. 在弹窗中切换到「审核操作」标签页
5. 选择「通过」或「驳回」
6. 填写审核备注（驳回时必填）
7. 点击「确认通过」或「确认驳回」

### 快速审核

1. 在文章列表中直接点击「通过」或「驳回」按钮
2. 确认操作即可完成审核

### 批量审核

1. 在文章列表中勾选需要批量操作的文章
2. 点击「批量通过」或「批量驳回」按钮
3. 确认操作即可完成批量审核

## 审核标准建议

### 通过标准

- 内容原创且有价值
- 文章结构清晰，可读性好
- 符合平台内容规范
- 分类和标签设置合理
- 无违法违规内容

### 驳回标准

- 内容质量低下或无意义
- 存在抄袭或版权问题
- 包含违法违规内容
- 恶意灌水或广告内容
- 分类错误或标签滥用

## 快速备注模板

### 通过模板

- "内容质量良好，符合发布标准"
- "文章结构清晰，内容有价值"
- "符合社区规范，审核通过"

### 驳回模板

- "内容质量不符合要求"
- "存在不当言论或违规内容"
- "文章结构混乱，可读性差"
- "涉嫌抄袭或版权问题"
- "内容与分类不符"

## 技术特性

- **响应式设计**：支持不同屏幕尺寸的设备
- **实时更新**：审核操作后立即更新列表状态
- **Markdown支持**：完整支持Markdown格式预览
- **批量操作**：提高审核效率
- **搜索筛选**：快速定位目标文章
- **操作确认**：防止误操作的确认机制

## 注意事项

1. **驳回必须填写备注**：驳回文章时必须填写具体的驳回原因
2. **批量操作谨慎使用**：批量操作前请仔细确认选中的文章
3. **审核记录**：所有审核操作都会记录在系统中
4. **权限控制**：只有管理员角色才能进行审核操作

## API接口说明

审核模块使用的主要API接口：

- `GET /admin/posts` - 获取文章列表
- `GET /admin/posts/{id}/review` - 获取文章审核详情
- `POST /admin/posts/review` - 审核文章
- `POST /admin/posts/batch-review` - 批量审核
- `GET /admin/review/stats` - 获取审核统计

## 后续优化方向

1. **审核历史记录**：查看文章的历史审核记录
2. **审核员分配**：支持将文章分配给特定审核员
3. **自动审核**：基于关键词和规则的自动审核
4. **审核报表**：更详细的审核数据分析和报表
5. **移动端适配**：优化移动设备上的审核体验
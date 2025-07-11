# Aladdin 分布式任务处理系统

## 项目介绍

Aladdin是一个基于NestJS和Prisma构建的分布式任务处理系统后端。该系统允许创建、分发、执行和监控分布式任务，主要用于处理大规模计算或处理任务。

## 技术栈

- **后端框架**: NestJS
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **消息队列**: Amazon SQS (计划中)
- **API文档**: Swagger

## 核心功能

- Agent（代理）管理：注册、更新、查询和删除代理节点
- Job（任务）管理：创建、分发、执行和监控任务
- 任务调度：将任务分配给合适的代理节点
- 状态监控：实时监控代理和任务状态

## 数据模型

### Agent（代理）
- id: 唯一标识符
- name: 代理名称
- status: 代理状态 (ONLINE, OFFLINE, BUSY)
- lastHeartbeat: 最后心跳时间
- capabilities: 代理能力/特性
- jobsProcessed: 已处理任务数
- currentLoad: 当前负载

### Job（任务）
- id: 唯一标识符
- title: 任务标题
- description: 任务描述
- status: 任务状态 (PENDING, RUNNING, COMPLETED, FAILED)
- priority: 任务优先级
- createdAt: 创建时间
- startedAt: 开始时间
- completedAt: 完成时间
- agentId: 执行代理ID
- parameters: 任务参数
- result: 任务结果
- anomalies: 异常情况

## 快速开始

### 环境要求

- Node.js >= 16.x
- PostgreSQL >= 14.x
- pnpm >= 7.x

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/s154621323/aladdin-distributed-system.git
cd aladdin-distributed-system
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
创建`.env`文件并添加以下内容：
```
DATABASE_URL="postgresql://username:password@localhost:5432/aladdin?schema=public"
PORT=3000
```

4. 运行数据库迁移
```bash
npx prisma migrate dev
```

5. 启动开发服务器
```bash
pnpm run start:dev
```

6. 访问Swagger文档
打开浏览器访问: http://localhost:3000/docs

## API文档

系统提供Swagger文档，包含所有API端点的详细说明和测试界面。

主要API端点:
- `/api/agents` - 代理管理
- `/api/jobs` - 任务管理

## 开发计划

- [ ] 完善任务调度算法
- [ ] 添加用户认证和授权
- [ ] 实现代理自动发现
- [ ] 添加任务结果持久化
- [ ] 实现任务依赖关系
- [ ] 添加监控和日志仪表板

## 许可证

[MIT](LICENSE)
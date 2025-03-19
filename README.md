# 文采项目

## 项目简介

文采项目是一款专注于文字美与力量的产品，结合音乐，为用户提供一个摘抄和分享美文的平台。用户可以通过不同的句子类型，如文学美句摘抄、诗词摘抄、歇后语、冷笑话、段子、热评、故事等，来整理和组合文字内容。平台还支持通过标签和文辑进行内容的分类和管理，用户可以在社区中分享自己的动态和摘抄，交流和发现更多美文。

## 功能特点

- **多种句子类型**: 支持文学美句摘抄、诗词摘抄、歇后语、冷笑话、段子、热评、故事等多种类型的句子。
- **标签管理**: 通过标签对句子进行分类，方便用户查找和管理。
- **文辑整理**: 用户可以将句子整理成文辑，进行系统化的管理和展示。
- **社区分享**: 用户可以在社区中分享自己的动态和摘抄，与其他用户互动交流。
- **音乐结合**: 为每个句子或文辑添加背景音乐，增强文字的表现力和感染力。

## 目标用户

- 喜爱文字和文学的用户
- 需要摘抄和整理美文的用户
- 喜欢分享和交流文字内容的用户
- 追求文字美与力量的用户
- 需要通过文字和音乐放松心情的用户

## 数据表设计

### 数据表设计

以下是文采项目的数据表设计，包括字段描述及表之间的关系：

#### 1. **个人信息表 (profiles)**

- **字段**:
  - `nickName` (string): 昵称
  - `sgin` (string): 个性签名
  - `icon` (string): 图标
  - `birthday` (string): 生日
  - `wx_id` (string): 微信 ID
  - `iphone` (string): 手机号
  - `userId` (string, 必填): 用户 ID
- **关系**: 无

#### 2. **类型表 (types)**

- **字段**:
  - `name` (string, 必填): 名称
  - `description` (string): 描述
  - `icon` (string): 图标
  - `userId` (string, 必填): 用户 ID
- **关系**:
  - 与文字表 (texts) 为多对多关系
  - 与专辑表 (albums) 为一对多关系

#### 3. **标签表 (tags)**

- **字段**:
  - `name` (string, 必填): 名称
  - `hotness` (number): 热度
  - `userId` (string, 必填): 用户 ID
- **关系**:
  - 与文字表 (texts) 为多对多关系

#### 4. **文字表 (texts)**

- **字段**:
  - `title` (string): 标题
  - `content` (string, 必填, 最大长度 5000): 内容
  - `author` (string): 作者
  - `userId` (string, 必填): 用户 ID
  - `images` (string[], 可选): 图片数组
  - `isPublic` (boolean, 必填): 是否公开
- **关系**:
  - 与音乐表 (music) 为多对一关系
  - 与评论表 (comments) 为一对多关系
  - 与标签表 (tags) 为多对多关系
  - 与类型表 (types) 为多对多关系

#### 5. **专辑表 (albums)**

- **字段**:
  - `title` (string, 必填): 标题
  - `description` (string, 最大长度 1000): 描述
  - `coverImage` (string): 封面图片
  - `userId` (string, 必填): 用户 ID
  - `isPublic` (boolean, 必填): 是否公开
- **关系**:
  - 与文字表 (texts) 为一对多关系
  - 与类型表 (types) 为一对多关系
  - 与音乐表 (music) 为多对一关系

#### 6. **动态表 (posts)**

- **字段**:
  - `content` (string, 必填): 内容
  - `userId` (string, 必填): 用户 ID
  - `images` (string[], 可选): 图片数组
  - `isPublic` (boolean, 必填): 是否公开
- **关系**:
  - 与文字表 (texts) 为一对一关系

#### 7. **今日推荐表 (recommendations)**

- **字段**:
  - `userId` (string, 必填): 用户 ID
  - `date` (string, 必填): 日期
- **关系**:
  - 与文字表 (texts) 为一对多关系

#### 8. **评论表 (comments)**

- **字段**:
  - `content` (string, 必填): 内容
  - `userId` (string, 必填): 用户 ID
  - `parentId` (string, 可选): 父评论 ID
- **关系**: 无

#### 9. **点赞表 (likes)**

- **字段**:
  - `userId` (string, 必填): 用户 ID
  - `targetType` (enum, 必填): 目标类型，支持 ["文字", "专辑", "标签", "音乐", "其他"]
  - `targetId` (string, 必填): 目标 ID
- **关系**: 无

#### 10. **收藏表 (favorites)**

- **字段**:
  - `userId` (string, 必填): 用户 ID
  - `targetType` (enum, 必填): 目标类型，支持 ["文字", "专辑", "标签", "音乐", "其他"]
  - `targetId` (string, 必填): 目标 ID
- **关系**: 无

#### 11. **音乐表 (music)**

- **字段**:
  - `userId` (string, 必填): 用户 ID
  - `title` (string, 必填): 标题
  - `url` (string, 必填): URL
  - `coverImage` (string): 封面图片
  - `artist` (string): 艺术家
  - `album` (string): 专辑
  - `genre` (string): 流派
  - `releaseDate` (string): 发行日期
  - `duration` (number): 时长
- **关系**:
  - 与文字表 (texts) 为一对多关系
  - 与专辑表 (albums) 为一对多关系

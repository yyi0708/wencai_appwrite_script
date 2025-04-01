import { RelationMutate, RelationshipType } from "node-appwrite";

// Description: 表创建配置
export const Collections = [
  {
    name: "profiles",
    description: "个人信息表",
    attributes: [
      { key: "nickName", type: "string", description: "昵称" }, // 名称
      { key: "sgin", type: "string", description: "个性签名" }, // 描述
      { key: "icon", type: "string", description: "图标" }, // 图标
      { key: "birthday", type: "string", description: "生日" }, // 生日
      { key: "iphone", type: "string", description: "手机号" }, // 手机号
      { key: "userId", type: "string", required: true, description: "用户ID" }, // 用户ID
      {
        key: "platformType",
        type: "enum",
        description: "平台类型",
        elements: ["wx", "zfb", "dy", "ios", "android", "other"],
      },
      { key: "openId", type: "string", description: "唯一标识" }, // 微信id
    ],
  },
  {
    name: "types",
    description: "类型表",
    attributes: [
      { key: "name", type: "string", required: true, description: "名称" }, // 名称
      { key: "description", type: "string", description: "描述" }, // 描述
      { key: "icon", type: "string", description: "图标" }, // 图标
      { key: "userId", type: "string", description: "用户ID" }, // 用户ID
    ],
  },
  {
    name: "tags",
    description: "标签表",
    attributes: [
      { key: "name", type: "string", required: true, description: "名称" }, // 名称
      { key: "description", type: "string", description: "描述" }, // 描述
      { key: "icon", type: "string", description: "图标" }, // 图标
      { key: "hotness", type: "number", description: "热度" }, // 热度
      { key: "userId", type: "string", description: "用户ID" }, // 用户ID
    ],
  },
  {
    name: "texts",
    description: "文字表",
    attributes: [
      { key: "title", type: "string", description: "标题" }, // 标题
      {
        key: "content",
        type: "string",
        size: 5000,
        required: true,
        description: "内容",
      }, // 内容
      { key: "author", type: "string", description: "作者" }, // 作者
      { key: "userId", type: "string", required: true, description: "用户ID" }, // 用户ID
      { key: "images", type: "string", array: true, description: "图片数组" }, // 图片数组
      { key: "english", type: "string", size: 2000, description: "英文版本" }, // 英文版本
      { key: "explain", type: "string", size: 5000, description: "解读" }, // 解读
      {
        key: "isPublic",
        type: "boolean",
        required: true,
        description: "是否公开",
      }, // 是否公开
    ],
    relationships: [
      {
        type: RelationshipType.ManyToOne,
        target: "music",
        localKey: "music",
        foreignKey: "texts",
        twoWay: true,
      }, // 文字 -> 音乐
      {
        type: RelationshipType.OneToMany,
        target: "comments",
        localKey: "comments",
        foreignKey: "textId",
        twoWay: true,
      }, // 文字 -> 评论
      {
        type: RelationshipType.ManyToMany,
        target: "tags",
        localKey: "tags",
        foreignKey: "texts",
        twoWay: true,
      }, // 文字 ↔ 标签
      {
        type: RelationshipType.ManyToMany,
        target: "types",
        localKey: "types",
        foreignKey: "texts",
        twoWay: true,
      }, // 类型 ➔ 文字
    ],
  },
  {
    name: "albums",
    description: "专辑表",
    attributes: [
      { key: "title", type: "string", required: true, description: "标题" }, // 标题
      { key: "description", type: "string", size: 1000, description: "描述" }, // 描述
      { key: "coverImage", type: "string", description: "封面图片" }, // 封面图片
      { key: "userId", type: "string", description: "用户ID" }, // 用户ID
      {
        key: "isPublic",
        type: "boolean",
        required: true,
        description: "是否公开",
      }, // 是否公开
    ],
    relationships: [
      {
        type: RelationshipType.OneToMany,
        target: "texts",
        localKey: "texts",
        twoWay: false,
      }, // 专辑 -> 文字
      {
        type: RelationshipType.OneToMany,
        target: "types",
        localKey: "types",
        twoWay: false,
      }, // 专辑 -> 类型
      {
        type: RelationshipType.ManyToOne,
        target: "music",
        localKey: "music",
        twoWay: false,
      }, // 专辑 -> 音乐
    ],
  },
  {
    name: "posts",
    description: "动态表",
    attributes: [
      { key: "content", type: "string", required: true, description: "内容" }, // 内容
      { key: "userId", type: "string", required: true, description: "用户ID" }, // 用户ID
      { key: "images", type: "string", array: true, description: "图片数组" }, // 图片数组
      {
        key: "isPublic",
        type: "boolean",
        required: true,
        description: "是否公开",
      }, // 是否公开
    ],
    relationships: [
      {
        type: RelationshipType.OneToOne,
        target: "texts",
        localKey: "textId",
        twoWay: false,
      }, // 动态表 ➔ 文字
    ],
  },
  {
    name: "recommendations",
    description: "今日推荐表",
    attributes: [
      { key: "userId", type: "string", required: true, description: "用户ID" }, // 用户ID
      { key: "date", type: "string", required: true, description: "日期" }, // 日期
    ],
    relationships: [
      {
        type: RelationshipType.OneToMany,
        target: "texts",
        localKey: "texts",
        twoWay: false,
      }, // 推荐表 ➔ 文字
    ],
  },
  {
    name: "comments",
    description: "评论表",
    attributes: [
      { key: "content", type: "string", required: true, description: "内容" }, // 内容
      { key: "userId", type: "string", required: true, description: "用户ID" }, // 用户ID
      { key: "parentId", type: "string", description: "父评论ID" }, // 父评论ID
    ],
  },
  {
    name: "likes",
    description: "点赞表",
    attributes: [
      { key: "userId", type: "string", required: true, description: "用户ID" }, // 用户ID
      {
        key: "targetType",
        type: "enum",
        required: true,
        description: "目标类型",
        elements: ["文字", "专辑", "标签", "音乐", "其他"],
      }, // 目标类型
      {
        key: "targetId",
        type: "string",
        required: true,
        description: "目标ID",
      }, // 目标ID
    ],
  },
  {
    name: "favorites",
    description: "收藏表",
    attributes: [
      { key: "userId", type: "string", required: true, description: "用户ID" }, // 用户ID
      {
        key: "targetType",
        type: "enum",
        required: true,
        description: "目标类型",
        elements: ["文字", "专辑", "标签", "音乐", "其他"],
      }, // 目标类型
      {
        key: "targetId",
        type: "string",
        required: true,
        description: "目标ID",
      }, // 目标ID
    ],
  },
  {
    name: "music",
    description: "音乐表",
    attributes: [
      { key: "userId", type: "string", description: "用户ID" }, // 用户ID
      { key: "title", type: "string", required: true, description: "标题" }, // 标题
      { key: "url", type: "string", required: true, description: "URL" }, // URL
      { key: "coverImage", type: "string", description: "封面图片" }, // 封面图片
      { key: "artist", type: "string", description: "艺术家" }, // 艺术家
      { key: "album", type: "string", description: "专辑" }, // 专辑
      { key: "genre", type: "string", description: "流派" }, // 流派
      { key: "releaseDate", type: "string", description: "发行日期" }, // 发行日期
      { key: "duration", type: "number", description: "时长" }, // 时长
    ],
  },
];

// 系统类型
export const TypesEnum = [
  {
    name: "原创",
    description: "独一无二的创作，展现个性与才华",
  },
  {
    name: "搞笑",
    description: "让人捧腹大笑的幽默内容",
  },
  {
    name: "语录",
    description: "简短却深刻的经典语句",
  },
  {
    name: "名人名句",
    description: "名人智慧的精炼表达",
  },
  {
    name: "诗词",
    description: "优美的文字，传递情感与意境",
  },
  {
    name: "生活",
    description: "记录日常点滴，感悟生活真谛",
  },
  {
    name: "小说",
    description: "引人入胜的故事与情节",
  },
  {
    name: "电影",
    description: "光影世界中的精彩瞬间",
  },
  {
    name: "随笔",
    description: "自由随性的文字记录",
  },
  {
    name: "歌词",
    description: "音乐与文字的完美结合",
  },
];

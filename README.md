# Apple Catalog

一个极简风格的 Apple 产品目录网站，使用 Next.js、TypeScript 与 Tailwind CSS 构建。第一版内置 iPhone 分类与 5 个示例产品。

## 功能

- 首页大搜索框
- iPhone 产品目录卡片
- 本地 JSON 数据源
- 按年份、芯片、容量、颜色、型号编号搜索和筛选
- 产品详情页
- 点击颜色切换对应产品图片
- Apple 官网风格：大留白、浅灰背景、白色卡片、圆角、柔和阴影
- 适合部署到 Vercel

## 本地运行

```bash
npm install
npm run dev
```

打开 http://localhost:3000。

## 构建

```bash
npm run build
npm run start
```

## 数据位置

产品数据位于：

```txt
src/data/products.json
```

新增产品时，保持字段结构一致：

```ts
type Product = {
  id: string;
  slug: string;
  category: "iPhone";
  name: string;
  year: number;
  colors: { name: string; hex: string; image: string }[];
  capacities: string[];
  chip: string;
  modelNumbers: string[];
  introduction: string;
  heroImage: string;
};
```

## Vercel 部署

1. 将项目推送到 GitHub。
2. 在 Vercel 中导入仓库。
3. Framework Preset 选择 Next.js。
4. Build Command 使用 `npm run build`。
5. Output Directory 保持默认。

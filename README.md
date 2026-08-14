# HCY 个人作品集网站

基于 Vite + React 19 + Three.js + GSAP + OGL 构建的个人作品集网站。

## 技术栈

- **Vite 8** - 构建工具
- **React 19** - UI 框架
- **Three.js** - 3D 渲染
- **GSAP** - 动画引擎
- **OGL** - WebGL 画廊效果

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署到 Cloudflare Pages（通过 GitHub）

### 第一步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)，点击右上角 `+` → `New repository`
2. 仓库名称填 `portfolio`（或任意名称）
3. 选择 **Public**（公开）或 **Private**（私有均可）
4. **不要**勾选 "Add a README file" 等选项
5. 点击 `Create repository`

### 第二步：推送代码到 GitHub

在终端中执行以下命令（将 `你的用户名` 替换为你的 GitHub 用户名）：

```bash
cd /Users/zuebi/Downloads/portfolio-github

# 初始化 Git 仓库
git init
git add .
git commit -m "初始提交"

# 添加远程仓库并推送
git branch -M main
git remote add origin https://github.com/你的用户名/portfolio.git
git push -u origin main
```

> 如果还没有配置 GitHub 认证，系统会提示输入用户名和密码。
> 建议使用 [GitHub CLI](https://cli.github.com/) 或 Personal Access Token 进行认证。

### 第三步：在 Cloudflare 中连接 GitHub

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单选择 `Workers & Pages`
3. 点击 `Create` → `Pages` → `Connect to Git`
4. 授权 Cloudflare 访问你的 GitHub 账号
5. 选择刚才创建的 `portfolio` 仓库
6. 点击 `Begin setup`

### 第四步：配置构建设置

在构建配置页面填写以下信息：

| 配置项 | 值 |
|--------|-----|
| Project name | `hcy-portfolio`（或任意名称，将作为 `*.pages.dev` 子域名） |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | （留空） |

**环境变量**（点击 `Environment variables (advanced)` 展开）：

| 变量名 | 值 |
|--------|-----|
| `NODE_VERSION` | `22` |

7. 点击 `Save and Deploy`

### 第五步：等待部署完成

- Cloudflare 会自动拉取代码、安装依赖、执行构建
- 首次部署约需 2-5 分钟
- 部署成功后会获得一个 `https://hcy-portfolio.pages.dev` 的访问地址

### 后续更新

每次向 `main` 分支推送代码，Cloudflare 会自动重新构建并部署：

```bash
cd /Users/zuebi/Downloads/portfolio-github
git add .
git commit -m "更新内容"
git push
```

### 绑定自定义域名（可选）

1. 在 Cloudflare Pages 项目页面，点击 `Custom domains` → `Set up a custom domain`
2. 输入你的域名（如 `www.example.com`）
3. 按照提示添加 CNAME 记录指向你的 `*.pages.dev` 地址
4. 等待 DNS 生效后即可通过自定义域名访问

## 项目结构

```
portfolio-github/
├── public/             # 静态资源（构建时直接复制到 dist）
│   ├── works/          # 作品图片
│   ├── hero-video.mp4  # 首页背景视频
│   ├── _redirects      # Cloudflare SPA 路由重定向
│   └── _headers        # Cloudflare 缓存头配置
├── src/
│   ├── components/     # React 组件
│   ├── styles/         # 全局样式
│   ├── App.jsx         # 根组件
│   └── main.jsx        # 入口文件
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
├── package.json        # 依赖和脚本
└── .nvmrc              # Node.js 版本
```

## Cloudflare Pages 配置说明

- `public/_redirects`：确保所有路由都返回 `index.html`（SPA 支持）
- `public/_headers`：为静态资源设置长期缓存
- `.nvmrc`：指定 Node.js 22 版本

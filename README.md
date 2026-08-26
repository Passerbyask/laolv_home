# 史瑞祺 · 个人简历网页

参考 Lando Norris 官网风格的纯静态个人简历页：深色主题、超大标题、分区大写标签、滚动动效、中英文一键切换。

## 项目结构

```
personal-site/
├── index.html        # 页面结构与全部文案（双语标记 data-i18n）
├── css/
│   └── style.css     # 深色主题样式（含响应式与动效）
├── js/
│   └── main.js       # 中英文切换 / 滚动动效 / 导航高亮 / 移动端菜单
└── README.md
```

## 本地预览

直接用浏览器打开 `index.html` 即可（无需安装任何东西）。

也可以起一个本地服务器，模拟线上环境：

```bash
cd personal-site
python -m http.server 8080
# 浏览器访问 http://localhost:8080
```

## ⚠️ 发布前必改：占位内容清单

以下内容是我替你占位的，**发布前请替换成真实信息**（在 `index.html` 中搜索对应位置，都写了 `TODO` 注释）：

| 位置 | 现在的内容 | 需要替换为 |
| --- | --- | --- |
| 联系区邮箱按钮 | ✅ 已配置：`2684637450@qq.com` | 已配置 |
| 联系区 GitHub 按钮 | ✅ 已配置：`https://github.com/Passerbyask` | 已配置 |
| 实习描述（经历板块） | 一段通用描述 | 你在图灵深视的真实工作内容 |
| 毕业论文描述（重点项目） | 我根据题目写的合理概述 | 你的真实研究过程与结果（可加数据/图表链接） |
| 课程项目 8 张卡片 | 课程名 + 通用关键词 | 可补上每门课你实际做的东西 |

## 修改文案

- **双语内容**：所有文案在 `js/main.js` 顶部的 `I18N` 对象里，`zh` 和 `en` 两套对应修改。新增可翻译文本时，给元素加 `data-i18n="键名"` 并在两套词典里各加一条。
- **默认语言**：默认中文。用户切换后的选择会记住（localStorage）。如果想默认英文，把 `js/main.js` 里 `currentLang()` 的返回值 `"zh"` 改成 `"en"`。

## 修改样式

- 主色（橙色）：`css/style.css` 顶部 `:root` 里的 `--accent`。
- 背景色：`--bg` / `--bg-2` / `--panel`。
- 字体：标题用 `Anton`（英文）+ `Noto Sans SC`（中文），正文用 `Space Grotesk`；字体从 Google Fonts 加载，断网时会回退到系统字体（微软雅黑等）。

## 部署到 GitHub Pages（免费）

1. 在 GitHub 新建一个仓库（比如 `yourname.github.io`）。
2. 把 `index.html`、`css/`、`js/` 三个文件（不含 README 也可）推送到仓库。
3. 仓库 Settings → Pages → Source 选择 `main` 分支 → Save。
4. 稍等片刻，访问 `https://你的用户名.github.io` 即可看到页面。

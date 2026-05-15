# 独立学习助手

这个版本不依赖 Chrome 扩展，使用 Playwright 启动自带 Chromium。优势是可以直接控制主页面、第三方 iframe、网络和播放器状态。

## 安装

```powershell
cd E:\jixujiaoyu\standalone
npm install
npm run install-browser
```

## 运行

```powershell
npm start
```

程序会打开 Chromium 到登录页。手动登录后，回到终端按回车开始自动学习。

目标站只能 HTTP 访问，程序会强制把 `BASE_URL` 规范成 `http://`。不要填写 `https://...`。

可选环境变量：

```powershell
$env:BASE_URL="http://sddy.gxk.yxlearning.com"
$env:PROXY_SERVER="http://127.0.0.1:10808"
$env:HOST_RESOLVER_RULES="MAP sddy.gxk.yxlearning.com 192.168.2.1"
npm start
```

程序会优先使用 `PROXY_SERVER`，如果没有设置，会自动继承终端里的 `HTTP_PROXY` / `ALL_PROXY`。如果你当前浏览器能访问但程序不能访问，通常需要把当前浏览器使用的代理、DNS 或 host 映射同步给 `PROXY_SERVER` 或 `HOST_RESOLVER_RULES`。

## 进度观测

如果要分析远程服务端怎样认定学习进度，可以打开只读观测模式：

```powershell
$env:TRACE_PROGRESS="1"
npm start
```

日志会写入 `standalone\traces\progress-*.jsonl`，包含疑似学习进度/心跳请求的 URL、方法、状态码、请求体摘要、响应摘要和当时的视频时间。这个模式只记录，不伪造、不重放请求。

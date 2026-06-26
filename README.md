# 🎸 吉他三件套 · Guitar Kit

初学吉他用的浏览器工具，**单文件 HTML，声音全部由 Web Audio 程序化生成，零音频文件**。

### 🎸 [在线使用 → jada-q.github.io/guitar-tools](https://jada-q.github.io/guitar-tools/)

> 提示：调音器需要麦克风，浏览器规定只在 **https / localhost** 下可用。用手机打开上面的链接放在吉他旁边调音最方便。

## 三个工具
1. **调音器** — 麦克风收声 → 自相关算法（autocorrelation）测音高 → 告诉你每根弦偏高/偏低/准了（标准调弦 E A D G B E）
2. **和弦图** — 8 个初学者常用开放和弦（C / G / D / A / E / Am / Em / Dm），点一下看指法图（● 按弦 + 手指编号 / ○ 空弦 / ✕ 不弹）+ 听标准音
3. **节拍器** — Web Audio 精确调度，BPM 可调、第一拍重音、2/3/4/6 拍可选

## 技术
- 原生 JavaScript，无框架、无构建
- **调音**：getUserMedia + AnalyserNode + 自相关音高检测
- **和弦音**：Karplus-Strong 拨弦合成（噪音 + 衰减延迟回路 = 像吉他的"铮"声，不用音频文件）
- **节拍器**：AudioContext 前瞻调度（lookahead scheduler）

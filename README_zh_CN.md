<p align="center">
<img alt="SiYuan" src="https://raw.githubusercontent.com/anarion80/siyuan-oembed/refs/heads/main/icon.png">
<br>
<em>思源 Oembed 和 Ghost-style 书签卡片</em>
<br><br>
<a title="Releases" target="_blank" href="https://github.com/anarion80/siyuan-oembed/releases"><img src="https://img.shields.io/github/v/release/anarion80/siyuan-oembed?style=flat-square&color=9CF"></a>
<a title="Downloads" target="_blank" href="https://github.com/anarion80/siyuan-oembed/releases"><img src="https://img.shields.io/github/downloads/anarion80/siyuan-oembed/total.svg?style=flat-square&color=blueviolet"></a>
<br>
<a title="AGPLv3" target="_blank" href="https://www.gnu.org/licenses/agpl-3.0.txt"><img src="https://img.shields.io/github/license/anarion80/siyuan-oembed"></a>
<a title="Code Size" target="_blank" href="https://github.com/anarion80/siyuan-oembed"><img src="https://img.shields.io/github/languages/code-size/anarion80/siyuan-oembed.svg?style=flat-square&color=yellow"></a>
<a title="GitHub Pull Requests" target="_blank" href="https://github.com/anarion80/siyuan-oembed/pulls"><img src="https://img.shields.io/github/issues-pr-closed/anarion80/siyuan-oembed.svg?style=flat-square&color=FF9966"></a>
<br>
<a title="GitHub Commits" target="_blank" href="https://github.com/anarion80/siyuan-oembed/commits/main"><img src="https://img.shields.io/github/commit-activity/m/anarion80/siyuan-oembed.svg?style=flat-square"></a>
<a title="Last Commit" target="_blank" href="https://github.com/anarion80/siyuan-oembed/commits/main"><img src="https://img.shields.io/github/last-commit/anarion80/siyuan-oembed.svg?style=flat-square&color=FF9900"></a>
<br>
<a href="https://buymeacoffee.com/anarion" target="_blank"><img src="https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-yellow.svg" alt="Buy Me Coffee"/></a>
</p>

<p align="center">
<a href="README.md">English</a> | <a href="README_pl_PL.md">Polish</a> | <a href="README_zh_CN.md">简体中文</a>
</p>

## ✨ 插件描述

这是有两个主要功能的插件:

1. 它可以根据 [Oembed](https://oembed.com/) 格式转换链接(URLs)到它们的嵌入式样式。当指定网站支持时，一个链接可被直接转换成图片或视频，或者任何其他网站提供的格式。

2. 它可以根据 [Ghost CMS](https://ghost.org/) [书签卡片](https://ghost.org/help/cards/#bookmark)格式转换链接(URLs)到一个好看的书签卡片样式。我重用了来自我的 [Astro Simply](https://github.com/anarion80/astro-simply) 主题的实现。

每个功能都是彼此独立的，因此你可以转换到嵌入卡片或书签卡片之一。

它像这样工作:

![preview.png](preview.png)

![example usage](asset/example_usage.gif)

> :exclamation:
> 不幸的是，X.com(Twitter)的嵌入是基于脚本的，并且我还没有弄明白为什么在设置中允许脚本运行脚本仍不工作。(参见[我在流云社区的文章](https://liuyun.io/article/1729866570402)) :exclamation:
>
> 同样的，Facebook/Instagram 要求使用 API_KEY 来允许嵌入它们的内容。

因为上述原因，嵌入样式的可用性可能受限，我可能需要为推文添加显式的 Twitter 转换。

## 🖱 使用

插件提供三种方式来转换链接:

1. 斜杠菜单和相关快捷键:
   - `/oembed`, `/Oembed`, `/oe`, `Ctrl`+`Shift`+`O` 用于 Oembed 转换
   - `/card`, `/bookmark`, `/bk`, `Ctrl`+`Shift`+`C` 用于书签卡片转换
  ![Slash Commands](asset/slashcommands.png)

2. 选中一个或多个块之后的块图标菜单:
  ![Block Icon Menu](asset/blockiconmenu.png)

3. 单独的工具栏图标:
  ![Toolbar icons](asset/toolbar.png)

> :exclamation:
> 所有转换都支持切换操作。第一次触发操作会将链接转换成嵌入样式或书签卡片。第二次触发操作会转换回普通链接。

## ⚙ 设置

插件有许多设置项可用:

| 设置 | 解释 |
| ---: | ----------- |
|`捕获剪贴板链接`|自动将剪贴板中粘贴的链接转换成嵌入样式或书签卡片 (:exclamation: 未完成!)|
|`选择粘贴样式`|从剪贴板中粘贴链接时自动转换成什么样式 (:exclamation: 未完成!)|
|`启用调试`|启用详细调试来协助解决问题|
|嵌入样式的`屏蔽列表`|跳过转换的域名列表(每行一个) (:exclamation: 未完成!)|
|书签卡片的`屏蔽列表`|跳过转换的域名列表(每行一个) (:exclamation: 未完成!)|
|`书签卡片的自定义CSS样式`|允许输入自定义的CSS代码来调整书签卡片的样式。所有的`kg-card-*`和`kg-bookmark-*`可调整样式。|

## ⌛ 问题和限制

目前，插件使用 [openGraphScraperLite](https://github.com/jshemas/openGraphScraperLite) 来抓取开放图表和 Twitter 元数据。这是我发现的唯一一个可以毫无问题地和插件捆绑在一起的工具。这也导致了插件大小超过3MB。[Metascraper](https://github.com/microlinkhq/metascraper) 要好很多，但不幸的是，它不能在插件环境中工作。

另一个选择可能会使用 [Microlink API](https://api.microlink.io) 来获取链接元数据，但是它的免费计划限制 50 请求/天。

另一个限制是已经提到的通过 oembed 提供 Facebook/Instagram 嵌入的缺失，以及无法执行脚本来为 X.com（Twitter）提供正确的样式。

## 🙏 鸣谢名单

- [SiYuan](https://github.com/siyuan-note/siyuan) 的有用的工具。我直接使用了他们的一些功能，因为它们没有通过API暴露出来。
- [SiYuan plugin sample with vite and svelte](https://github.com/siyuan-note/plugin-sample-vite-svelte) - 非常有用的插件开发基础。
- [Zuoqiu-Yingyi 和他们的 siyuan-packages-monorepo](https://github.com/Zuoqiu-Yingyi/siyuan-packages-monorepo).
- [SiYuan 插件开发教程](https://docs.siyuan-note.club/en/guide/plugin/sy-plugin-dev-quick-start.html?utm_source=liuyun.io) - 非常有用的插件开发教程。
- [Zuoez02 和他们的 plugin-card-link](https://github.com/zuoez02/siyuan-plugin-card-link).
- [Frostime 和他们的 siyuan-dailynote-today](https://github.com/frostime/siyuan-dailynote-today).
- [Hqweay 和他们的 siyuan-hqweay-go](https://github.com/hqweay/siyuan-hqweay-go).

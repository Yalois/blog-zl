// 友链检测 CLI 需要使用显式导入和相对路径
import type { FeedGroup } from '../app/types/feed'
import { myFeed } from '../blog.config'
// eslint-disable-next-line unused-imports/no-unused-imports
import { getFavicon, getGithubAvatar, getGithubIcon, getOciqGroupAvatar, getOicqAvatar, OicqAvatarSize } from './utils/img'

export default [
	// #region Clarity
	{
		name: '清晰体验',
		desc: '使用 Clarity 博客主题构建的网站。',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			myFeed,
			{
				author: 'GuuGuai',
				sitenick: '杂记本',
				title: '古怪杂记本',
				desc: '一个什么都可能会写的博客',
				link: 'https://blog.guuguai.site/',
				feed: 'https://blog.guuguai.site/atom.xml',
				icon: 'https://cravatar.cn/avatar/646331BFF8F19A0E05679C3CC0FC54D6',
				avatar: 'https://cdn.libravatar.org/avatar/646331bff8f19a0e05679c3cc0fc54d6?s=160',
				archs: ['Nuxt', 'Netlify'],
				date: '2023-12-23',
				comment: '高中同学，技术好友，爱好番剧/折腾。',
			}
		],
	},
	// #endregion
	// #region 网上邻居 since 2024
	{
		name: '网上邻居',
		desc: '哔——啵——电波通讯中，欢迎常来串门。',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: 'isYangs',
				desc: '一个前端Bug构造师的博客',
				link: 'https://www.isyangs.cn/',
				feed: 'https://www.isyangs.cn/feed.xml',
				icon: 'https://www.isyangs.cn/favicon.svg',
				avatar: 'https://7.isyangs.cn/8/655c9835780a0-8.jpg',
				archs: ['Vue', '国内 CDN'],
				date: '2024-01-29',
				comment: '高中时认识的小学校友，目前从事前端开发。',
			}
			/* ========从此处新增友链======== */
		],
	},
	// #endregion
	// #region XUPTers
	{
		name: 'XUPTers',
		desc: '西安邮电大学的校友们。',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: '半岛的孤城',
				sitenick: '小屋',
				title: '半岛的小屋',
				desc: '不知道写啥，那就不写了。哎嘿',
				link: 'https://www.bandao.ltd/',
				feed: 'https://www.bandao.ltd/atom.xml',
				icon: getGithubIcon('bandaoworld'),
				avatar: getGithubAvatar('bandaoworld'),
				archs: ['Hexo', '服务器'],
				date: '2024-02-02',
				comment: '大学学长，爱好摄影/听歌，会一些Vue。',
			}
		],
	},
	// #endregion
	// #region 知识分享
	{
		name: '知识分享',
		desc: '“AI时代”创作分享/知识内容收集。',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: '茂茂物语',
				desc: '茂茂的成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',
				link: 'https://notes.fe-mm.com/',
				icon: getGithubIcon('maomao1996'),
				avatar: getGithubAvatar('maomao1996'),
				archs: ['VitePress', 'Cloudflare'],
				date: '2024-02-17',
				comment: '前端开发笔记。',
			}
		],
	},
	// #endregion
	// #region 漫游
	{
		name: '漫游',
		desc: '网上冲浪时发现的精彩内容与常读订阅，与君共享。',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: '风记星辰',
				desc: '热爱你来过的每度温暖',
				feed: 'https://www.thyuu.com/feed',
				link: 'https://thyuu.com/',
				icon: 'https://std.thyuu.com/logo.svg',
				avatar: 'https://std.thyuu.com/logo.svg',
				archs: ['WordPress', '服务器'],
				date: '2024-02-01',
			},
		],
	},
	// #endregion
] satisfies FeedGroup[]

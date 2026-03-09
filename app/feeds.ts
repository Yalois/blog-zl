// 友链检测 CLI 需要使用显式导入和相对路径
import type { FeedGroup } from '../app/types/feed'
import { myFeed } from '../blog.config'
// eslint-disable-next-line unused-imports/no-unused-imports

import { getFavicon, getGithubAvatar, getGithubIcon, getOciqGroupAvatar, getOicqAvatar, OicqAvatarSize } from './utils/img'

export default [
	// #region QLNU
	{
		name: 'QLNU',
		desc: 'QLNU的朋友们',
		// @keep-sorted { "keys": ["date"] }
		entries:[
			myFeed,
			{
			author: '晴川',
			title: "晴川's Blog",
			desc: 'QLNUWeb扛把子飞天大炮',
			link: 'https://blog.q1ngchuan.top/',
			icon: '/fimg/Q1ngchuan.png',
			avatar: '/fimg/Q1ngchuan.png',
			archs: [],
			date: '2024-01-01',
				},
				{
			author: '云自无心水自闲',
			title: '云自无心水自闲',
			desc: '狗哥狗话多',
			link: 'https://cgjue.vercel.app/',
			icon: '/fimg/GouGe.png',
			avatar: '/fimg/GouGe.png',
			archs: ['Vercel'],
			date: '2024-01-01',
				},
				{
			author: 'yhuanhuan',
			title: 'yhuanhuan',
			desc: 'QLNUPwn总',
			link: 'https://yhuanhuan01.github.io/',
			icon: '/fimg/huanhuan.png',
			avatar: '/fimg/huanhuan.png',
			archs: ['GitHub Pages'],
			date: '2024-01-01',
				},
				{
			author: 'shenghuo2',
			title: 'shenghuo2',
			desc: '生蚝王',
			link: 'https://blog.shenghuo2.top/',
			icon: '/fimg/shenghuo2.png',
			avatar: '/fimg/shenghuo2.png',
			archs: [],
			date: '2024-01-01',
				},
				{
			author: 'jiangwenwen',
			title: 'jiangwenwen',
			desc: '雯雯酱',
			link: 'https://jiangwenwen066.github.io/',
			icon: '/fimg/wenwenjiang.jpg',
			avatar: '/fimg/wenwenjiang.jpg',
			archs: ['GitHub Pages'],
			date: '2024-01-01',
				},
				{
			author: 'Yime',
			title: "Yime's Blog",
			desc: '1m雪地',
			link: 'https://blog.r1ce.cn/',
			icon: '/fimg/1m.png',
			avatar: '/fimg/1m.png',
			archs: [],
			date: '2024-01-01',
				},
				{
			author: 'Reinon',
			title: "Reinon's Blog",
			desc: '努力dePwn雪地',
			link: 'https://blog.supid.cn/',
			icon: '/fimg/mm.webp',
			avatar: '/fimg/mm.webp',
			archs: [],
			date: '2024-01-01',
				},
				{
			author: 'zrt',
			title: 'zrt',
			desc: '愿世间再无饿殍',
			link: 'https://ztusers.github.io',
			icon: 'https://i.postimg.cc/dVbQVqkK/6088094018-EDAD27-ADC380-C19-AAB1-D08.jpg',
			avatar: 'https://i.postimg.cc/dVbQVqkK/6088094018-EDAD27-ADC380-C19-AAB1-D08.jpg',
			archs: ['GitHub Pages'],
			date: '2024-01-01',
				},
				{
			author: 'COLLAPSING WORLD',
			title: 'COLLAPSING WORLD',
			desc: '一个网安人的日常',
			link: 'https://collasping.byethost22.com/',
			icon: 'http://collasping.byethost22.com/usr/uploads/2025/04/3186581558.jpg',
			avatar: 'http://collasping.byethost22.com/usr/uploads/2025/04/3186581558.jpg',
			archs: ['Typecho'],
			date: '2025-04-01',
				},
				{
			author: 'Duktig',
			title: 'Duktig',
			desc: '～～～',
			link: 'https://douktig.github.io/',
			icon: 'https://i.postimg.cc/Fzp3WRfm/4913b15879b83d4181c0b65a29f494d9.jpg',
			avatar: 'https://i.postimg.cc/Fzp3WRfm/4913b15879b83d4181c0b65a29f494d9.jpg',
			archs: ['GitHub Pages'],
			date: '2024-01-01',
				},
				{
			author: 'Camille',
			title: 'Camille',
			desc: 'Per aspera ad astras',
			link: 'https://camille-192.github.io/',
			icon: 'https://i.postimg.cc/SsmGDWnJ/f2874032bd4ade8b35d836818413495d.jpg',
			avatar: 'https://i.postimg.cc/SsmGDWnJ/f2874032bd4ade8b35d836818413495d.jpg',
			archs: ['GitHub Pages'],
			date: '2024-01-01',
			}
		],
	},
	// #endregion
	// #region 网上邻居
	{
		name: '网上邻居',
		desc: '欢迎常来串门。',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: 'Kurococ Liu',
				title: 'Kurococ Liu',
				desc: '被子外面很危险！',
				link: 'https://blog.lkurococ.top/',
				icon: 'https://cdn.lkurococ.top/2024/10/600292e5a454abe3b6e653801834fb60.jpg',
				avatar: 'https://cdn.lkurococ.top/2024/10/600292e5a454abe3b6e653801834fb60.jpg',
				archs: [],
				date: '2024-10-01',
},
{
				author: '夜将夜',
				title: '夜将夜',
				desc: 'Ajiang的个人博客，记录美好生活！',
				link: 'https://yejiangye.com',
				icon: '/fimg/yjy.png',
				avatar: '/fimg/yjy.png',
				archs: ['WordPress'],
				date: '2024-01-01',
},	{
	author: 'I Am I',
	title: 'I Am I',
	desc: '永远相信美好的事情即将发生',
	link: 'https://5ime.cn',
	icon: '/fimg/iami.jpg',
	avatar: '/fimg/iami.jpg',
	archs: [],
	date: '2024-01-01',
		},
		{
	author: '魔法少女雪殇',
	title: '魔法少女雪殇',
	desc: '开摆',
	link: 'https://www.snowywar.top/',
	icon: 'https://www.snowywar.top/wp-content/uploads/2021/05/3666.png',
	avatar: 'https://www.snowywar.top/wp-content/uploads/2021/05/3666.png',
	archs: ['WordPress'],
	date: '2024-01-01',
		},
		{
	author: 'Aura',
	title: 'AuraBlog',
	desc: 'Aura 的网络安全学习记录',
	link: 'https://jasmineaura.github.io/AuraBlog/',
	icon: 'https://jasmineaura.github.io/AuraBlog/favicon.ico',
	avatar: 'https://jasmineaura.github.io/AuraBlog/favicon.ico',
	archs: ['GitHub Pages'],
	date: '2024-01-01',
		}]
},
	// #endregion
	// #region 博客导航
{
	name: '博客导航',
	desc: '加入我们，一起分享知识。',
	entries: [
{
				author: '个站商店',
				sitenick: '个站商店',
				title: '个站商店',
				desc: '发现优秀的个人网站',
				link: 'https://storeweb.cn/',
				icon: '/fimg/storeweb.png',
				avatar: '/fimg/storeweb.png',
				date: '2024-01-01',
},
{
				author: 'BlogFinder',
				sitenick: 'BlogFinder',
				title: 'BlogFinder',
				desc: '中文博客发现站',
				link: 'https://bf.zzxworld.com/',
				icon: 'https://bf.zzxworld.com/images/favicon.png',
				avatar: 'https://bf.zzxworld.com/images/favicon.png',
				date: '2024-01-01',
},
{
				author: '开往',
				sitenick: '开往',
				title: '开往-Travellings',
				desc: '友链接力!',
				link: 'https://www.travellings.cn/',
				icon: 'https://www.travellings.cn/assets/favicon.png',
				avatar: 'https://www.travellings.cn/assets/favicon.png',
				date: '2024-01-01',
}
		],
	},
	// #endregion
] satisfies FeedGroup[]

const contentSections = [
  {
    id: 'home',
    title: '首页',
    tags: ['爱游戏', '热门推荐', '新游上线'],
    keywords: ['爱游戏平台', '游戏资讯', '最新游戏'],
    items: [
      { name: '爱游戏首页', url: 'https://webzh-aiyouxi.com.cn', desc: '探索精彩游戏世界' },
    ]
  },
  {
    id: 'news',
    title: '新闻动态',
    tags: ['游戏新闻', '行业资讯', '爱游戏'],
    keywords: ['游戏更新', '赛事报道', '游戏评测'],
    items: [
      { name: '最新公告', url: 'https://webzh-aiyouxi.com.cn/news', desc: '第一时间了解游戏动态' },
      { name: '行业观察', url: 'https://webzh-aiyouxi.com.cn/industry', desc: '深度解析游戏行业趋势' },
    ]
  },
  {
    id: 'guides',
    title: '攻略指南',
    tags: ['攻略', '技巧', '爱游戏'],
    keywords: ['新手教程', '进阶攻略', '隐藏关卡'],
    items: [
      { name: '新手入门', url: 'https://webzh-aiyouxi.com.cn/guides/newbie', desc: '快速上手必备' },
      { name: '高手进阶', url: 'https://webzh-aiyouxi.com.cn/guides/expert', desc: '提升游戏技巧' },
    ]
  },
  {
    id: 'community',
    title: '玩家社区',
    tags: ['社区', '论坛', '爱游戏'],
    keywords: ['玩家交流', '游戏圈子', '分享经验'],
    items: [
      { name: '讨论区', url: 'https://webzh-aiyouxi.com.cn/community/forum', desc: '和玩家一起畅聊' },
      { name: '作品展示', url: 'https://webzh-aiyouxi.com.cn/community/showcase', desc: '分享你的游戏创作' },
    ]
  }
];

function filterContentByTag(sections, tagQuery) {
  if (!tagQuery || tagQuery.trim() === '') {
    return sections;
  }
  const lowerQuery = tagQuery.toLowerCase().trim();
  return sections.reduce((result, section) => {
    const matchedItems = section.items.filter(item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.desc.toLowerCase().includes(lowerQuery)
    );
    const tagMatch = section.tags.some(t => t.toLowerCase().includes(lowerQuery));
    const keywordMatch = section.keywords.some(k => k.toLowerCase().includes(lowerQuery));
    if (tagMatch || keywordMatch || matchedItems.length > 0) {
      result.push({
        ...section,
        items: matchedItems.length > 0 ? matchedItems : section.items
      });
    }
    return result;
  }, []);
}

function searchContent(sections, query) {
  if (!query || query.trim() === '') {
    return { results: [], total: 0 };
  }
  const lowerQuery = query.toLowerCase().trim();
  const matched = [];
  sections.forEach(section => {
    section.items.forEach(item => {
      const matchName = item.name.toLowerCase().includes(lowerQuery);
      const matchDesc = item.desc.toLowerCase().includes(lowerQuery);
      const matchSectionTitle = section.title.toLowerCase().includes(lowerQuery);
      const matchTag = section.tags.some(t => t.toLowerCase().includes(lowerQuery));
      const matchKeyword = section.keywords.some(k => k.toLowerCase().includes(lowerQuery));
      if (matchName || matchDesc || matchSectionTitle || matchTag || matchKeyword) {
        matched.push({
          sectionId: section.id,
          sectionTitle: section.title,
          item: item,
          relevance: (matchName ? 3 : 0) + (matchDesc ? 2 : 0) + (matchSectionTitle ? 1 : 0) + (matchTag ? 1 : 0) + (matchKeyword ? 1 : 0)
        });
      }
    });
  });
  matched.sort((a, b) => b.relevance - a.relevance);
  return { results: matched, total: matched.length };
}

export { contentSections, filterContentByTag, searchContent };
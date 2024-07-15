---
layout: page
---

<script setup>
import VPArticles from '.vitepress/theme/components/VPArticles.vue'
import data from './articles.json'

const articles = data.map(article => {
  return {
    title: article.article_info.title,
    details: article.article_info.brief_content,
    link: `https://juejin.cn/post/${article.article_id}`,
    linkText: 'Skip to Juejin'
  }
})
</script>

<VPArticles :articles="articles" />
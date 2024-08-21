---
layout: page
---

<script setup>
import { ref, onMounted } from 'vue'
import VPArticles from '.vitepress/theme/components/VPArticles.vue'

const articles = ref([])

onMounted(() => {
  fetch('https://raw.githubusercontent.com/OSpoon/auto-articles/main/data.json').then(async res => {
    const data = await res.json()
    articles.value = data.map(article => {
      return {
        title: article.article_info.title,
        details: article.article_info.brief_content,
        link: `https://juejin.cn/post/${article.article_id}`,
        linkText: 'Skip to Juejin'
      }
    })
  })
})

</script>
<VPArticles :articles="articles" />
<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { computed } from 'vue'
import VPArticle from './VPArticle.vue'

export interface Article {
    title: string
    details: string
    link?: string
    linkText?: string
    rel?: string
    target?: string
}

const props = defineProps<{
    articles: Article[]
}>()

const grid = computed(() => {
    const length = props.articles.length

    if (!length) {
        return
    } else if (length === 2) {
        return 'grid-2'
    } else if (length === 3) {
        return 'grid-3'
    } else if (length % 3 === 0) {
        return 'grid-6'
    } else if (length > 3) {
        return 'grid-4'
    }
})
</script>

<template>
    <div v-if="articles" class="VPArticles">
        <div class="container">
            <div class="items">
                <div v-for="article in articles" :key="article.title" class="item" :class="[grid]">
                    <VPArticle :title="article.title" :details="article.details" :link="article.link"
                        :link-text="article.linkText" :rel="article.rel" :target="article.target" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.VPArticles {
    position: relative;
    padding: 12px 24px;
}

@media (min-width: 640px) {
    .VPArticles {
        padding: 24px 48px;
    }
}

@media (min-width: 960px) {
    .VPArticles {
        padding: 32px 64px;
    }
}

.container {
    margin: 0 auto;
    max-width: 1152px;
}

.items {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
}

.item {
    padding: 8px;
    width: 100%;
}

@media (min-width: 640px) {

    .item.grid-2,
    .item.grid-4,
    .item.grid-6 {
        width: calc(100% / 2);
    }
}

@media (min-width: 768px) {

    .item.grid-2,
    .item.grid-4 {
        width: calc(100% / 2);
    }

    .item.grid-3,
    .item.grid-6 {
        width: calc(100% / 3);
    }
}

@media (min-width: 960px) {
    .item.grid-4 {
        width: calc(100% / 4);
    }
}
</style>
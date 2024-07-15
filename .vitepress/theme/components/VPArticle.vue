<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import VPLink from './VPLink.vue'

defineProps<{
    title: string
    details?: string
    link?: string
    linkText?: string
    rel?: string
    target?: string
}>()
</script>

<template>
    <VPLink class="VPArticle" :href="link" :rel="rel" :target="target" :no-icon="true" :tag="link ? 'a' : 'div'">
        <article class="box">
            <h2 class="title" v-html="title"></h2>
            <p v-if="details" class="details" v-html="details"></p>

            <div v-if="linkText" class="link-text">
                <p class="link-text-value">
                    {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
                </p>
            </div>
        </article>
    </VPLink>
</template>

<style scoped>
.VPArticle {
    display: block;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s;
}

.VPArticle.link:hover {
    border-color: var(--vp-c-brand-1);
}

.box {
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
}

.box> :deep(.VPImage) {
    margin-bottom: 20px;
}

.title {
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
}

.details {
    flex-grow: 1;
    padding-top: 8px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);

    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
}

.link-text {
    padding-top: 8px;
}

.link-text-value {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
}

.link-text-icon {
    margin-left: 6px;
}
</style>
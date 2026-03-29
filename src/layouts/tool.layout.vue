<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const route = useRoute();

const head = computed<HeadObject>(() => ({
  title: `${route.meta.name} - dev-tools`,
  meta: [
    {
      name: 'description',
      content: route.meta?.description as string,
    },
    {
      name: 'keywords',
      content: ((route.meta.keywords ?? []) as string[]).join(','),
    },
  ],
}));
useHead(head);
const { t } = useI18n();

const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));
</script>

<template>
  <BaseLayout>
    <div class="tool-layout">
      <div class="tool-header font-mono">
        <div flex flex-nowrap items-center justify-between>
          <n-h1 class="text-primary tracking-tighter">
            <span class="opacity-50">#</span> {{ toolTitle }}
          </n-h1>

          <div>
            <FavoriteButton :tool="{ name: route.meta.name, path: route.meta.path } as Tool" />
          </div>
        </div>

        <div class="separator" />

        <div class="description font-sans">
          {{ toolDescription }}
        </div>
      </div>
    </div>

    <div class="tool-content">
      <slot />
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;

  ::v-deep(& > *) {
    flex: 0 1 612px;
  }
}

.tool-layout {
  max-width: 612px;
  margin: 0 auto;
  box-sizing: border-box;

  .tool-header {
    padding: 60px 0 30px;
    width: 100%;

    .n-h1 {
      font-size: 32px;
      font-weight: 800;
      margin: 0;
      line-height: 1.2;
      text-transform: lowercase;
    }

    .separator {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, var(--n-primary-color) 0%, transparent 100%);
      opacity: 0.3;
      margin: 15px 0 20px;
    }

    .description {
      margin: 0;
      font-size: 16px;
      line-height: 1.6;
      opacity: 0.8;
      color: #e6edf3;
    }
  }
}
</style>

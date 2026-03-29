<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();

const makeLabel = (tool: Tool) => () => h(RouterLink, { to: tool.path }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories',
  {},
  undefined,
  {
    deep: true,
    serializer: {
      read: v => (v ? JSON.parse(v) : null),
      write: v => JSON.stringify(v),
    },
  },
);

function toggleCategoryCollapse({ name }: { name: string }) {
  collapsedCategories.value[name] = !collapsedCategories.value[name];
}

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name],
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
    })),
  })),
);

const themeVars = useThemeVars();
</script>

<template>
  <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name">
    <div ml-6px mt-12px flex cursor-pointer items-center op-60 hover:op-100 transition-opacity @click="toggleCategoryCollapse({ name })">
      <span :class="{ 'rotate-0': isCollapsed, 'rotate-90': !isCollapsed }" text-16px lh-1 op-80 transition-transform>
        <icon-mdi-chevron-right class="text-primary!" />
      </span>

      <span ml-8px text-11px font-mono uppercase tracking-[0.2em] font-700 text-white op-90>
        {{ name }}
      </span>
    </div>

    <n-collapse-transition :show="!isCollapsed">
      <div class="menu-wrapper">
        <div class="toggle-bar" @click="toggleCategoryCollapse({ name })" />

        <n-menu
          class="menu font-mono"
          :value="route.path"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="tools"
          :indent="8"
          :default-expand-all="true"
        />
      </div>
    </n-collapse-transition>
  </div>
</template>

<style scoped lang="less">
.menu-wrapper {
  display: flex;
  flex-direction: row;
  .menu {
    flex: 1;
    margin-bottom: 5px;

    ::v-deep(.n-menu-item-content::before) {
      left: 0;
      right: 13px;
      border-radius: 4px;
    }

    ::v-deep(.n-menu-item-content.n-menu-item-content--selected) {
      .n-menu-item-content-header {
        color: var(--n-primary-color) !important;
        text-shadow: 0 0 10px rgba(57, 255, 20, 0.6);
        font-weight: 700;
      }
    }
    
    ::v-deep(.n-menu-item-content-header) {
      color: rgba(255, 255, 255, 0.85) !important;
      transition: color 0.2s ease;
    }

    ::v-deep(.n-menu-item-content:hover .n-menu-item-content-header) {
      color: var(--n-primary-color) !important;
    }
  }

  .toggle-bar {
    width: 24px;
    opacity: 0.1;
    transition: opacity ease 0.2s;
    position: relative;
    cursor: pointer;

    &::before {
      width: 1px;
      height: 100%;
      content: ' ';
      background: linear-gradient(to bottom, var(--n-primary-color), transparent);
      position: absolute;
      top: 0;
      left: 14px;
    }

    &:hover {
      opacity: 0.4;
    }
  }
}
</style>

import { type MaybeRef, get, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import _ from 'lodash';
import type { Tool, ToolCategory, ToolWithCategory } from './tools.types';
import { toolsWithCategory } from './index';

export const useToolStore = defineStore('tools', () => {
  const favoriteToolsName = useStorage('favoriteToolsName', []) as Ref<string[]>;
  const { t } = useI18n();

  const tools = computed<ToolWithCategory[]>(() => toolsWithCategory.map((tool) => {
    const toolI18nKey = tool.path.replace(/\//g, '');

    return ({
      ...tool,
      path: tool.path,
      name: t(`tools.${toolI18nKey}.title`, tool.name),
      description: t(`tools.${toolI18nKey}.description`, tool.description),
      category: t(`tools.categories.${tool.category.toLowerCase()}`, tool.category),
    });
  }));

  const toolsByCategory = computed<ToolCategory[]>(() => {
    return _.chain(tools.value)
      .groupBy('category')
      .map((components, name, path) => ({
        name,
        path,
        components,
      }))
      .value();
  });

  const favoriteTools = computed(() => {
    return favoriteToolsName.value
      .map(favoriteName => tools.value.find(({ name, path }) => name === favoriteName || path === favoriteName))
      .filter(Boolean) as ToolWithCategory[]; // cast because .filter(Boolean) does not remove undefined from type
  });

  return {
    tools,
    favoriteTools,
    toolsByCategory,
    newTools: computed(() => tools.value.filter(({ isNew }) => isNew)),

    addToolToFavorites({ tool }: { tool: MaybeRef<Tool> }) {
      const toolPath = get(tool).path;
      if (toolPath && !favoriteToolsName.value.includes(toolPath)) {
        favoriteToolsName.value.push(toolPath);
      }
    },

    removeToolFromFavorites({ tool }: { tool: MaybeRef<Tool> }) {
      const { name, path } = get(tool);
      favoriteToolsName.value = favoriteToolsName.value.filter(n => n !== name && n !== path);
    },

    isToolFavorite({ tool }: { tool: MaybeRef<Tool> }) {
      const { name, path } = get(tool);
      return favoriteToolsName.value.includes(name)
        || favoriteToolsName.value.includes(path);
    },

    updateFavoriteTools(newOrder: ToolWithCategory[]) {
      favoriteToolsName.value = newOrder.map(tool => tool.path);
    },
  };
});

<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool }>();
const { tool } = toRefs(props);

const theme = useThemeVars();
</script>

<template>
  <div class="menu-icon-item">
    <n-icon :component="tool.icon" />
    <div v-if="tool.isNew" class="badge" />
  </div>
</template>

<style lang="less" scoped>
.menu-icon-item {
  position: relative;

  .badge {
    position: absolute;
    background-color: v-bind('theme.primaryColor');
    border-radius: 50%;
    top: 2px;
    left: -4px;
    height: 6px;
    width: 6px;
    box-shadow: 0 0 6px v-bind('theme.primaryColor');
    z-index: 10;
  }
}
</style>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { useStyleStore } from '@/stores/style.store';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
const { isMenuCollapsed, isSmallScreen } = toRefs(styleStore);
const siderPosition = computed(() => (isSmallScreen.value ? 'absolute' : 'static'));
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="0"
      :width="240"
      :collapsed="isMenuCollapsed"
      :show-trigger="false"
      :native-scrollbar="false"
      :position="siderPosition"
    >
      <slot name="sider" />
    </n-layout-sider>
    <n-layout class="content">
      <slot name="content" />
      <div v-show="isSmallScreen && !isMenuCollapsed" class="overlay" @click="isMenuCollapsed = true" />
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  cursor: pointer;
  z-index: 99;
}

.content {
  background-color: transparent !important;
  ::v-deep(.n-layout-scroll-container) {
    padding: 26px;
    background-color: transparent !important;
  }
}

.n-layout {
  height: 100vh;
  background-color: transparent !important;
}

.n-layout-sider {
  background-color: v-bind('themeVars.siderColor') !important;
  backdrop-filter: blur(12px);
  border-right: 1px solid v-bind('themeVars.siderBorderColor') !important;
  transition: background-color 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier);
  z-index: 100;
}
</style>

<script lang="ts" setup>
import { NIcon, useThemeVars } from 'naive-ui';

import { RouterLink } from 'vue-router';
import { Heart, Home2, Menu2 } from '@vicons/tabler';

import { storeToRefs } from 'pinia';
import HeroGradient from '../assets/hero-gradient.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import { useTracker } from '@/modules/tracker/tracker.services';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = (config.app.lastCommitSha as string || '').slice(0, 7);

const { tracker } = useTracker();
const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper">
        <HeroGradient class="gradient" />
        <div class="text-wrapper font-mono">
          <div class="title tracking-tighter">
            <span class="text-primary">>_</span>dev-tools
          </div>
          <div class="divider" />
          <div class="subtitle opacity-70 uppercase text-xs tracking-widest">
            {{ $t('home.subtitle') }}
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <locale-selector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer font-mono text-[10px] opacity-40 uppercase tracking-tighter mt-10">
          <div>
            $ dev-tools --version
            <c-link target="_blank" rel="noopener" :href="`https://github.com/CorentinTh/dev-tools/tree/v${version}`">
              {{ version }}
            </c-link>
          </div>
          <div v-if="commitSha && commitSha.length > 0">
            $ git rev-parse HEAD
            <c-link
              target="_blank"
              rel="noopener"
              type="primary"
              :href="`https://github.com/CorentinTh/dev-tools/tree/${commitSha}`"
            >
              {{ commitSha }}
            </c-link>
          </div>
          <div mt-4>
            system: online
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div flex items-center justify-center gap-2 mb-6 border-b pb-4 class="border-white/5">
        <c-button
          circle
          variant="text"
          class="hover:text-primary transition-colors"
          :aria-label="$t('home.toggleMenu')"
          @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
        >
          <NIcon size="25" :component="Menu2" />
        </c-button>

        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button to="/" circle variant="text" class="hover:text-primary transition-colors" :aria-label="$t('home.home')">
            <NIcon size="25" :component="Home2" />
          </c-button>
        </c-tooltip>

        <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
          <c-button v-if="config.app.env === 'development'" to="/c-lib" circle variant="text" :aria-label="$t('home.uiLib')">
            <icon-mdi:brush-variant text-20px />
          </c-button>
        </c-tooltip>

        <command-palette class="mx-4 flex-grow max-w-[400px]" />

        <locale-selector v-if="!styleStore.isSmallScreen" />

        <div>
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </div>

        <c-tooltip position="bottom" :tooltip="$t('home.support')">
          <c-button
            secondary
            href="https:// Buymeacoffee.com/cthmsst"
            rel="noopener"
            target="_blank"
            class="support-button font-mono tracking-widest text-xs uppercase"
            :bordered="false"
            @click="() => tracker.trackEvent({ eventName: 'Support button clicked' })"
          >
            {{ $t('home.buyMeACoffee') }}
            <NIcon v-if="!styleStore.isSmallScreen" :component="Heart" ml-2 />
          </c-button>
        </c-tooltip>
      </div>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.support-button {
  background: var(--n-primary-color);
  color: #0b0e14 !important;
  font-weight: 800;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);

  &:hover {
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.4);
    transform: translateY(-1px);
  }
}

.footer {
  text-align: left;
  padding: 0 20px 20px;
  line-height: 1.5;
  color: var(--n-text-color);
  opacity: 0.6;

  .c-link {
    color: inherit;
    &:hover {
      color: var(--n-primary-color);
    }
  }
}

.sider-content {
  padding-top: 140px;
  padding-bottom: 200px;
}

.hero-wrapper {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;

  .gradient {
    margin-top: -65px;
    filter: v-bind('styleStore.isDarkTheme ? "hue-rotate(90deg) brightness(0.8)" : "hue-rotate(90deg) brightness(1.3)"');
    opacity: 0.6;
  }

  .text-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 24px;
    color: var(--n-text-color);

    .title {
      font-size: 28px;
      font-weight: 800;
      text-shadow: v-bind('styleStore.isDarkTheme ? "0 0 10px rgba(0, 255, 65, 0.3)" : "none"');
    }

    .divider {
      width: 40px;
      height: 2px;
      border-radius: 4px;
      background-color: var(--n-primary-color);
      margin: 4px auto 8px;
      box-shadow: 0 0 5px var(--n-primary-color);
    }

    .subtitle {
      font-size: 10px;
    }
  }
}
</style>

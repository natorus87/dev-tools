<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { TEST_COLORS } from './dead-pixel-tester.service';

const isFullscreen = ref(false);
const currentColorIndex = ref(0);
const fullscreenDiv = ref<HTMLElement | null>(null);

const startTest = (index: number = 0) => {
  currentColorIndex.value = index;
  if (fullscreenDiv.value) {
    if (fullscreenDiv.value.requestFullscreen) {
      fullscreenDiv.value.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
  }
};

const nextColor = () => {
  currentColorIndex.value = (currentColorIndex.value + 1) % TEST_COLORS.length;
};

const prevColor = () => {
  currentColorIndex.value = (currentColorIndex.value - 1 + TEST_COLORS.length) % TEST_COLORS.length;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!isFullscreen.value) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === ' ') {
    nextColor();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    prevColor();
  }
};

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});
</script>

<template>
  <div>
    <c-card title="Test Colors" mb-4>
      <p class="mb-4 text-gray-600 dark:text-gray-300">
        Click any color below to enter full-screen diagnostic mode. While in full-screen, click anywhere on the screen or use your arrow keys to cycle through all test colors. Press ESC to safely exit.
      </p>
      
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div 
          v-for="(color, index) in TEST_COLORS" 
          :key="color"
          class="h-24 rounded cursor-pointer shadow hover:scale-105 transition-transform border border-gray-300 dark:border-gray-700"
          :style="{ backgroundColor: color }"
          @click="startTest(index)"
        ></div>
      </div>
      
      <n-button type="primary" size="large" block mt-6 @click="startTest(0)">
        Start Full-Screen Test
      </n-button>
    </c-card>

    <div 
      ref="fullscreenDiv" 
      v-show="isFullscreen"
      class="fixed inset-0 z-50 flex items-center justify-center cursor-pointer select-none"
      :style="{ backgroundColor: TEST_COLORS[currentColorIndex] }"
      @click="nextColor"
    >
      <div v-if="currentColorIndex === 0" class="text-white opacity-30 text-xl font-bold p-4 text-center">
        Click or use Arrow Keys to cycle colors. <br> Press ESC to exit.
      </div>
    </div>
  </div>
</template>
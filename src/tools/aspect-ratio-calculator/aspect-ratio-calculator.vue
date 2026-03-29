<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { calculateRatio, calculateNewHeight, calculateNewWidth } from './aspect-ratio-calculator.service';

const originalWidth = useStorage('aspect-ratio:original-width', 1920);
const originalHeight = useStorage('aspect-ratio:original-height', 1080);

const newWidth = useStorage('aspect-ratio:new-width', 1280);
const newHeight = useStorage('aspect-ratio:new-height', 720);

const ratio = computed(() => {
  const result = calculateRatio(originalWidth.value, originalHeight.value);
  if (result) {
    return `${result.widthRatio}:${result.heightRatio}`;
  }
  return '-:-';
});

const onNewWidthUpdate = (v: number | null) => {
  if (v !== null) {
    newWidth.value = v;
    const calcHeight = calculateNewHeight(originalWidth.value, originalHeight.value, v);
    if (calcHeight !== null) {
      newHeight.value = calcHeight;
    }
  }
};

const onNewHeightUpdate = (v: number | null) => {
  if (v !== null) {
    newHeight.value = v;
    const calcWidth = calculateNewWidth(originalWidth.value, originalHeight.value, v);
    if (calcWidth !== null) {
      newWidth.value = calcWidth;
    }
  }
};

const onOriginalUpdate = () => {
  // Re-calculate new height based on the new aspect ratio and the current new width
  if (newWidth.value > 0 && originalWidth.value > 0 && originalHeight.value > 0) {
    const calcHeight = calculateNewHeight(originalWidth.value, originalHeight.value, newWidth.value);
    if (calcHeight !== null) {
      newHeight.value = calcHeight;
    }
  }
};

watch([originalWidth, originalHeight], () => {
  onOriginalUpdate();
});
</script>

<template>
  <div>
    <c-card title="Original Resolution" mb-4>
      <div grid grid-cols-1 md:grid-cols-2 gap-4>
        <n-form-item label="Width (W1)">
          <n-input-number v-model:value="originalWidth" placeholder="1920" w-full :min="1" />
        </n-form-item>
        <n-form-item label="Height (H1)">
          <n-input-number v-model:value="originalHeight" placeholder="1080" w-full :min="1" />
        </n-form-item>
      </div>

      <div mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md flex justify-center items-center text-lg font-bold font-mono>
        Aspect Ratio: {{ ratio }}
      </div>
    </c-card>

    <c-card title="New Resolution">
      <div grid grid-cols-1 md:grid-cols-2 gap-4>
        <n-form-item label="New Width (W2)">
          <n-input-number :value="newWidth" @update:value="onNewWidthUpdate" placeholder="1280" w-full :min="1" />
        </n-form-item>
        <n-form-item label="New Height (H2)">
          <n-input-number :value="newHeight" @update:value="onNewHeightUpdate" placeholder="720" w-full :min="1" />
        </n-form-item>
      </div>
    </c-card>
  </div>
</template>
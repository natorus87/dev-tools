<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { cardNetworks, generateMultipleCards } from './credit-card-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const networkId = useStorage('cc-generator:network', 'visa');
const count = useStorage('cc-generator:count', 10);
const formatSpaces = useStorage('cc-generator:format', true);

const networkOptions = Object.entries(cardNetworks).map(([id, net]) => ({
  label: net.name,
  value: id
}));

const generatedOutput = ref('');

const doGenerate = () => {
  const quantity = Math.min(Math.max(count.value, 1), 1000); // Prevent vast loops
  const cards = generateMultipleCards(networkId.value, formatSpaces.value, quantity);
  generatedOutput.value = cards.join('\n');
};

watch([networkId, count, formatSpaces], doGenerate, { immediate: true });
</script>

<template>
  <div>
    <c-card>
      <n-form title-placement="left" label-width="150" class="mb-4">
        <n-form-item label="Card Network">
          <n-select v-model:value="networkId" :options="networkOptions" />
        </n-form-item>
        <n-form-item label="Quantity">
          <n-input-number v-model:value="count" :min="1" :max="1000" w-full />
        </n-form-item>
        <n-form-item label="Format (Spaces)">
          <n-switch v-model:value="formatSpaces" />
        </n-form-item>
      </n-form>

      <n-button type="primary" size="large" block @click="doGenerate">
        Generate Cards
      </n-button>
    </c-card>

    <c-card title="Generated Test Numbers" mt-6>
      <n-alert type="warning" class="mb-4">
        These are mock credit card strings calculated purely pseudo-randomly for development checksum testing. They do not correlate to actual valid funding accounts.
      </n-alert>
      <TextareaCopyable
        :value="generatedOutput"
        :rows="12"
        font-mono
      />
    </c-card>
  </div>
</template>
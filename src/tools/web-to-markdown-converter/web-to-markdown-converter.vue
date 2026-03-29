<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { convertHtmlToMarkdown, fetchAndConvertUrl, type WebToMarkdownResult } from './web-to-markdown-converter.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const mode = useStorage<'url' | 'html'>('web-to-markdown:mode', 'url');
const urlInput = useStorage('web-to-markdown:url', 'https://example.com');
const htmlInput = useStorage('web-to-markdown:html', '<h1>Hello World</h1><p>Converted to <strong>Markdown</strong></p>');

const isLoading = ref(false);
const result = ref<WebToMarkdownResult>({ markdown: '' });

const runConversion = async () => {
  isLoading.value = true;
  result.value = { markdown: '' };
  
  if (mode.value === 'url') {
    result.value = await fetchAndConvertUrl(urlInput.value);
  } else {
    result.value = convertHtmlToMarkdown(htmlInput.value);
  }
  
  isLoading.value = false;
};

const modeOptions = [
  { label: 'Fetch from URL', value: 'url' },
  { label: 'Raw HTML', value: 'html' },
];

watch([mode, htmlInput], () => {
    if (mode.value === 'html') {
        runConversion();
    }
}, { immediate: true });

</script>

<template>
  <div>
    <c-card title="Input source" mb-4>
      <n-form-item label="Mode">
        <n-radio-group v-model:value="mode">
          <n-radio-button v-for="opt in modeOptions" :key="opt.value" :value="opt.value" :label="opt.label" />
        </n-radio-group>
      </n-form-item>

      <div v-if="mode === 'url'">
        <n-form-item label="Website URL to convert">
          <n-input-group>
            <c-input-text v-model:value="urlInput" placeholder="https://example.com" @keydown.enter="runConversion" />
            <n-button type="primary" :loading="isLoading" @click="runConversion">Fetch & Convert</n-button>
          </n-input-group>
        </n-form-item>
        <n-alert v-if="result.error" type="error" mt-2>
          {{ result.error }}
        </n-alert>
      </div>

      <div v-else>
        <n-form-item label="Raw HTML code">
          <c-input-text v-model:value="htmlInput" placeholder="<h1>Title</h1>..." multiline :rows="6" />
        </n-form-item>
        <n-alert v-if="result.error" type="error" mt-2>
          {{ result.error }}
        </n-alert>
      </div>
    </c-card>

    <c-card title="Markdown Output">
      <div v-if="isLoading" class="flex justify-center items-center p-8">
        <n-spin size="large" />
      </div>
      <TextareaCopyable v-else :value="result.markdown" language="markdown" :rows="15" />
    </c-card>
  </div>
</template>
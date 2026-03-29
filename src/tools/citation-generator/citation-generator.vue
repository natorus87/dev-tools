<script setup lang="ts">
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { generateAPA, generateMLA, generateChicago, type CitationSource } from './citation-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const sourceType = useStorage<'book' | 'website'>('citation:type', 'website');
const authorFirst = useStorage('citation:authorFirst', '');
const authorLast = useStorage('citation:authorLast', '');
const title = useStorage('citation:title', '');
const publisher = useStorage('citation:publisher', '');
const year = useStorage('citation:year', '');
const url = useStorage('citation:url', '');
const accessDate = useStorage('citation:accessDate', '');

const sourceObject = computed<CitationSource>(() => ({
  type: sourceType.value,
  authorFirst: authorFirst.value,
  authorLast: authorLast.value,
  title: title.value,
  publisher: publisher.value,
  year: year.value,
  url: url.value,
  accessDate: accessDate.value
}));

const apaCitation = computed(() => generateAPA(sourceObject.value));
const mlaCitation = computed(() => generateMLA(sourceObject.value));
const chicagoCitation = computed(() => generateChicago(sourceObject.value));

</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Metadata Inputs -->
      <c-card title="Source Information">
        <n-form title-placement="left" label-width="120" class="mb-4">
          <n-form-item label="Source Type">
            <n-radio-group v-model:value="sourceType" name="source_type">
              <n-radio-button value="website">Website</n-radio-button>
              <n-radio-button value="book">Book</n-radio-button>
            </n-radio-group>
          </n-form-item>
          
          <div class="grid grid-cols-2 gap-2">
            <n-form-item label="Author First">
              <c-input-text v-model:value="authorFirst" placeholder="Jane" />
            </n-form-item>
            <n-form-item label="Author Last">
              <c-input-text v-model:value="authorLast" placeholder="Doe" />
            </n-form-item>
          </div>

          <n-form-item label="Title">
             <c-input-text v-model:value="title" placeholder="Understanding the Cosmos" />
          </n-form-item>
          
          <n-form-item label="Publisher">
             <c-input-text v-model:value="publisher" placeholder="Publisher / Site Name" />
          </n-form-item>
          
          <n-form-item label="Published Date">
             <c-input-text v-model:value="year" placeholder="2026 or Nov 12, 2026" />
          </n-form-item>

          <template v-if="sourceType === 'website'">
            <n-form-item label="URL">
               <c-input-text v-model:value="url" placeholder="https://example.com" />
            </n-form-item>
            <n-form-item label="Date Accessed">
               <c-input-text v-model:value="accessDate" placeholder="26 March 2026" />
            </n-form-item>
          </template>
        </n-form>
      </c-card>

      <!-- Formatting Outputs -->
      <c-card title="Generated Citations">
        <n-alert type="info" class="mb-4" :show-icon="false">
          Italics are designated natively using Markdown asterisks (`*`) to ensure safe plain-text copying compatibility across documents.
        </n-alert>

        <h3 class="text-md font-bold mb-2 text-gray-700 dark:text-gray-300">APA 7</h3>
        <TextareaCopyable :value="apaCitation" :rows="3" class="mb-4" />

        <h3 class="text-md font-bold mb-2 text-gray-700 dark:text-gray-300">MLA 9</h3>
        <TextareaCopyable :value="mlaCitation" :rows="3" class="mb-4" />

        <h3 class="text-md font-bold mb-2 text-gray-700 dark:text-gray-300">Chicago 17</h3>
        <TextareaCopyable :value="chicagoCitation" :rows="3" />
      </c-card>

    </div>
  </div>
</template>
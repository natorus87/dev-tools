<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { generateMailtoLink, generateHtmlAnchor } from './mailto-link-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const to = useStorage('mailto:to', '');
const cc = useStorage('mailto:cc', '');
const bcc = useStorage('mailto:bcc', '');
const subject = useStorage('mailto:subject', '');
const body = useStorage('mailto:body', '');
const linkText = useStorage('mailto:linkText', 'Send Email');

const rawLink = computed(() => {
  return generateMailtoLink({
    to: to.value,
    cc: cc.value,
    bcc: bcc.value,
    subject: subject.value,
    body: body.value
  });
});

const htmlAnchor = computed(() => {
  return generateHtmlAnchor(rawLink.value, linkText.value);
});

</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Input Settings -->
      <c-card title="Email Parameters">
        <n-form title-placement="left" label-width="80">
          <n-form-item label="To">
             <c-input-text v-model:value="to" placeholder="recipient@example.com" />
          </n-form-item>
          <n-form-item label="Cc">
             <c-input-text v-model:value="cc" placeholder="cc@example.com" />
          </n-form-item>
          <n-form-item label="Bcc">
             <c-input-text v-model:value="bcc" placeholder="bcc@example.com" />
          </n-form-item>
          <n-form-item label="Subject">
             <c-input-text v-model:value="subject" placeholder="Bug Report: Issue with..." />
          </n-form-item>
          <n-form-item label="Body">
             <c-input-text 
               v-model:value="body" 
               placeholder="Describe the issue here..." 
               multiline 
               :rows="6" 
               w-full 
             />
          </n-form-item>
        </n-form>
      </c-card>

      <!-- Formatting Output -->
      <c-card title="Generated Mailto Link">
        <n-form-item label="Raw URL" label-placement="top">
           <TextareaCopyable :value="rawLink" :rows="4" />
        </n-form-item>

        <div class="border-t dark:border-gray-700 my-4"></div>

        <n-form-item label="HTML Anchor Text (e.g., Send Email)" label-placement="top">
           <c-input-text v-model:value="linkText" placeholder="Send Email" />
        </n-form-item>

        <n-form-item label="HTML Source" label-placement="top">
           <TextareaCopyable :value="htmlAnchor" language="html" :rows="4" />
        </n-form-item>

        <div class="mt-4 flex justify-end">
           <n-button type="primary" size="large" tag="a" :href="rawLink" target="_blank">
             Test Preview Link
           </n-button>
        </div>
      </c-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { compileObjGen, type ObjGenResult } from './objgen-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const input = useStorage('objgen:input', `User\n  Id[int] = 1\n  Username = jwinfield`);
const output = ref<ObjGenResult>({ json: '' });

watch(input, (newVal) => {
  output.value = compileObjGen(newVal);
}, { immediate: true });

</script>

<template>
  <div>
    <div grid grid-cols-1 md:grid-cols-2 gap-4>
      <c-card title="ObjGen Input">
        <n-form-item>
          <c-input-text 
            v-model:value="input" 
            placeholder="Type ObjGen syntax here..." 
            multiline 
            :rows="15" 
            w-full 
            font-mono
            class="code-editor"
          />
        </n-form-item>
      </c-card>

      <c-card title="JSON Output">
        <n-alert v-if="output.error" type="error" mb-4>{{ output.error }}</n-alert>
        <TextareaCopyable :value="output.json" language="json" :rows="15" />
      </c-card>
    </div>
  </div>
</template>

<style scoped>
.code-editor {
  white-space: pre !important;
}
</style>
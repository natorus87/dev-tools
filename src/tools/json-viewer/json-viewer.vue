<script setup lang="ts">
import JSON5 from 'json5';
import { useStorage } from '@vueuse/core';
import JsonTreeViewer from './JsonTreeViewer.vue';

const inputElement = ref<HTMLElement>();

const rawJson = useStorage('json-prettify:raw-json', '{"hello": "world", "foo": "bar"}');
const indentSize = useStorage('json-prettify:indent-size', 3);
const sortKeys = useStorage('json-prettify:sort-keys', true);
const viewMode = ref<'raw' | 'tree'>('raw');

const cleanJson = computed(() => withDefaultOnError(() => formatJson({ rawJson, indentSize, sortKeys }), ''));

const rawJsonValidation = useValidation({
  source: rawJson,
  rules: [
    {
      validator: v => v === '' || JSON5.parse(v),
      message: 'Provided JSON is not valid.',
    },
  ],
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px" flex justify-center gap-3 items-center>
      <n-form-item label="Sort keys :" label-placement="left" label-width="100">
        <n-switch v-model:value="sortKeys" />
      </n-form-item>
      <n-form-item label="Indent size :" label-placement="left" label-width="100" :show-feedback="false">
        <n-input-number v-model:value="indentSize" min="0" max="10" style="width: 100px" />
      </n-form-item>
      <n-radio-group v-model:value="viewMode" name="view-mode" size="medium">
        <n-radio-button value="raw">
          Raw
        </n-radio-button>
        <n-radio-button value="tree">
          Tree
        </n-radio-button>
      </n-radio-group>
    </div>
  </div>

  <div v-if="viewMode === 'raw'">
    <n-form-item
      label="Your raw JSON"
      :feedback="rawJsonValidation.message"
      :validation-status="rawJsonValidation.status"
    >
      <c-input-text
        ref="inputElement"
        v-model:value="rawJson"
        placeholder="Paste your raw JSON here..."
        rows="20"
        multiline
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        monospace
      />
    </n-form-item>
    <n-form-item label="Prettified version of your JSON">
      <TextareaCopyable :value="cleanJson" language="json" :follow-height-of="inputElement" />
    </n-form-item>
  </div>

  <div v-else mt-4>
    <JsonTreeViewer :raw-json="rawJson" />
  </div>
</template>

<style lang="less" scoped>
.result-card {
  position: relative;
  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>

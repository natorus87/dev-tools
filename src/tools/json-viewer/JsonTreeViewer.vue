<script setup lang="ts">
import JSON5 from 'json5';
import JsonNode from './JsonNode.vue';

const props = defineProps<{
  rawJson: string
}>();

const parsed = computed(() => {
  try {
    return JSON5.parse(props.rawJson);
  } catch (e) {
    return null;
  }
});
</script>

<template>
  <div v-if="parsed !== null" class="json-tree-viewer">
    <JsonNode :value="parsed" :depth="0" />
  </div>
  <div v-else class="error">
    Invalid JSON to display tree view.
  </div>
</template>

<style scoped lang="less">
.json-tree-viewer {
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fcfcfc;
  overflow: auto;
  max-height: 500px;
}

.error {
  color: #d03050;
  padding: 10px;
}
</style>

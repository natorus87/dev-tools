<script setup lang="ts">
import { ChevronDown, ChevronRight } from '@vicons/tabler';

const props = defineProps<{
  name?: string | number
  value: any
  depth: number
}>();

const isExpanded = ref(props.depth < 2);
const isObject = computed(() => props.value !== null && typeof props.value === 'object');
const isArray = computed(() => Array.isArray(props.value));

const toggle = () => {
  if (isObject.value) {
    isExpanded.value = !isExpanded.value;
  }
};

const valueDisplay = computed(() => {
  if (props.value === null) return 'null';
  if (typeof props.value === 'string') return `"${props.value}"`;
  return String(props.value);
});

const children = computed(() => {
  if (!isObject.value) return [];
  return Object.entries(props.value).map(([key, val]) => ({ key, value: val }));
});
</script>

<template>
  <div class="json-node" :style="{ paddingLeft: `${depth * 10}px` }">
    <div class="node-header" @click="toggle" :class="{ 'is-collapsible': isObject }">
      <n-icon v-if="isObject" size="14" class="toggle-icon">
        <ChevronDown v-if="isExpanded" />
        <ChevronRight v-else />
      </n-icon>
      <span v-else class="bullet">&bull;</span>

      <span v-if="name !== undefined" class="key">{{ name }}:</span>

      <span v-if="!isObject" class="value" :class="typeof value">{{ valueDisplay }}</span>
      <span v-else class="bracket-open">{{ isArray ? '[' : '{' }}</span>
      <span v-if="isObject && !isExpanded" class="ellipsis">...</span>
      <span v-if="isObject && !isExpanded" class="bracket-close">{{ isArray ? ']' : '}' }}</span>
    </div>

    <div v-if="isObject && isExpanded" class="node-children">
      <JsonNode
        v-for="child in children"
        :key="child.key"
        :name="child.key"
        :value="child.value"
        :depth="depth + 1"
      />
      <div class="bracket-close" :style="{ paddingLeft: `${depth * 10}px` }">
        {{ isArray ? ']' : '}' }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.json-node {
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
}

.node-header {
  display: flex;
  align-items: center;
  cursor: default;

  &.is-collapsible {
    cursor: pointer;
    &:hover {
      background-color: rgba(128, 128, 128, 0.1);
    }
  }
}

.toggle-icon {
  margin-right: 4px;
  opacity: 0.6;
}

.bullet {
  margin-right: 18px;
  opacity: 0.3;
}

.key {
  color: #881391;
  margin-right: 8px;
  font-weight: bold;
}

.value {
  &.string { color: #c41a16; }
  &.number { color: #1c00cf; }
  &.boolean { color: #0000ff; }
  &.undefined, &.object { color: #808080; }
}

.bracket-open, .bracket-close {
  color: #333;
}

.ellipsis {
  background-color: #eee;
  padding: 0 4px;
  border-radius: 2px;
  margin: 0 2px;
}
</style>

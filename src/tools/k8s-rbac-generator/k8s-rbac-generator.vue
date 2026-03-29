<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { generateRbacYaml, type RbacConfig, type RbacRule, type RbacSubject } from './k8s-rbac-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';
import { Plus, Trash } from '@vicons/tabler';

const defaultRule: RbacRule = {
  apiGroups: [''],
  resources: ['pods', 'pods/log'],
  verbs: ['get', 'list', 'watch'],
};

const defaultSubject: RbacSubject = {
  kind: 'ServiceAccount',
  name: 'my-service-account',
  namespace: 'default',
};

const config = useStorage<RbacConfig>('k8s-rbac-generator:config', {
  name: 'my-role',
  scope: 'Namespace',
  namespace: 'default',
  subjects: [{ ...defaultSubject }],
  rules: [{ ...defaultRule }],
  labels: {},
});

const scopeOptions = [
  { label: 'Role (Namespaced)', value: 'Namespace' },
  { label: 'ClusterRole (Cluster-wide)', value: 'Cluster' },
];

const subjectKindOptions = [
  { label: 'ServiceAccount', value: 'ServiceAccount' },
  { label: 'User', value: 'User' },
  { label: 'Group', value: 'Group' },
];

const generatedYaml = computed(() => {
  return generateRbacYaml(config.value);
});

const addRule = () => config.value.rules.push({ apiGroups: [''], resources: [''], verbs: [''] });
const removeRule = (idx: number) => config.value.rules.splice(idx, 1);

const addSubject = () => config.value.subjects.push({ kind: 'ServiceAccount', name: '', namespace: config.value.namespace || 'default' });
const removeSubject = (idx: number) => config.value.subjects.splice(idx, 1);
</script>

<template>
  <div>
    <c-card title="General Settings" mb-4>
      <div grid grid-cols-1 md:grid-cols-2 gap-4>
        <n-form-item label="Role / Binding Name">
          <c-input-text v-model:value="config.name" placeholder="my-role" w-full />
        </n-form-item>
        <n-form-item label="Scope">
          <n-select v-model:value="config.scope" :options="scopeOptions" w-full />
        </n-form-item>
        <n-form-item v-if="config.scope === 'Namespace'" label="Namespace">
          <c-input-text v-model:value="config.namespace" placeholder="default" w-full />
        </n-form-item>
      </div>
    </c-card>

    <c-card title="Subjects (Who)" mb-4>
      <div v-for="(subject, idx) in config.subjects" :key="idx" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-2 relative">
        <n-button circle size="small" type="error" ghost class="absolute top-2 right-2" @click="removeSubject(idx)">
          <template #icon>
            <n-icon><Trash /></n-icon>
          </template>
        </n-button>
        <div grid grid-cols-1 md:grid-cols-3 gap-4>
          <n-form-item label="Kind">
            <n-select v-model:value="subject.kind" :options="subjectKindOptions" w-full />
          </n-form-item>
          <n-form-item label="Name">
            <c-input-text v-model:value="subject.name" placeholder="subject-name" w-full />
          </n-form-item>
          <n-form-item v-if="subject.kind === 'ServiceAccount'" label="Namespace">
            <c-input-text v-model:value="subject.namespace" placeholder="default" w-full />
          </n-form-item>
        </div>
      </div>
      <n-button dashed block @click="addSubject" mt-2>
        <template #icon>
          <n-icon><Plus /></n-icon>
        </template>
        Add Subject
      </n-button>
    </c-card>

    <c-card title="Rules (What they can do)" mb-4>
      <div v-for="(rule, idx) in config.rules" :key="idx" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-2 relative">
        <n-button circle size="small" type="error" ghost class="absolute top-2 right-2" @click="removeRule(idx)">
          <template #icon>
            <n-icon><Trash /></n-icon>
          </template>
        </n-button>
        
        <div class="mb-4">
          <n-form-item label="API Groups (comma separated)">
            <c-input-text
              :value="rule.apiGroups.join(', ')"
              @update:value="v => rule.apiGroups = v.split(',').map(s => s.trim())"
              placeholder="e.g. '', 'extension', 'apps'"
              w-full 
            />
          </n-form-item>
        </div>
        <div class="mb-4">
          <n-form-item label="Resources (comma separated)">
            <c-input-text
              :value="rule.resources.join(', ')"
              @update:value="v => rule.resources = v.split(',').map(s => s.trim())"
              placeholder="e.g. 'pods', 'deployments'"
              w-full 
            />
          </n-form-item>
        </div>
        <div>
          <n-form-item label="Verbs (comma separated)">
            <c-input-text
              :value="rule.verbs.join(', ')"
              @update:value="v => rule.verbs = v.split(',').map(s => s.trim())"
              placeholder="e.g. 'get', 'list', 'watch', 'create'"
              w-full 
            />
          </n-form-item>
        </div>
      </div>
      <n-button dashed block @click="addRule" mt-2>
        <template #icon>
          <n-icon><Plus /></n-icon>
        </template>
        Add Rule
      </n-button>
    </c-card>

    <c-card title="Generated YAML">
      <TextareaCopyable :value="generatedYaml" language="yaml" :rows="15" />
    </c-card>
  </div>
</template>
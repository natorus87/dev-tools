<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { ulid } from 'ulid';
import { executeApiRequest, type ApiRequest, type ApiResponse, type HeaderDef } from './api-client.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const url = useStorage('api-client:url', 'https://jsonplaceholder.typicode.com/posts/1');
const method = useStorage('api-client:method', 'GET');
const useProxy = useStorage('api-client:proxy', false);
const body = useStorage('api-client:body', '');

// Can't use useStorage easily for array of objects in this context, just use local ref or initialize
const savedHeaders = localStorage.getItem('api-client:headers');
const headers = ref<HeaderDef[]>(savedHeaders ? JSON.parse(savedHeaders) : [{ id: ulid(), key: '', value: '', enabled: true }]);

watch(headers, (newVal) => {
  localStorage.setItem('api-client:headers', JSON.stringify(newVal));
}, { deep: true });

const methodOptions = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => ({ label: m, value: m }));

const addHeader = () => {
  headers.value.push({ id: ulid(), key: '', value: '', enabled: true });
};

const removeHeader = (id: string) => {
  headers.value = headers.value.filter(h => h.id !== id);
  if (headers.value.length === 0) {
    addHeader();
  }
};

const activeTab = ref('body'); // body | headers
const responseTab = ref('body'); // body | headers

const isLoading = ref(false);
const response = ref<ApiResponse | null>(null);

const sendRequest = async () => {
  isLoading.value = true;
  response.value = null;

  try {
    const req: ApiRequest = {
      method: method.value,
      url: url.value,
      headers: headers.value,
      body: body.value,
      useProxy: useProxy.value
    };
    response.value = await executeApiRequest(req);
    responseTab.value = 'body';
  } finally {
    isLoading.value = false;
  }
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
};

const statusColor = computed(() => {
  if (!response.value) return 'default';
  const code = response.value.status;
  if (code >= 200 && code < 300) return 'success';
  if (code >= 400 && code < 500) return 'warning';
  if (code >= 500) return 'error';
  return 'default';
});

const JSONResponseString = computed(() => {
  if (!response.value?.data) return '';
  if (response.value.isJson) return JSON.stringify(response.value.data, null, 2);
  return String(response.value.data);
});
</script>

<template>
  <div>
    <!-- URL & Method -->
    <n-input-group class="mb-4">
      <n-select v-model:value="method" :options="methodOptions" style="width: 120px" />
      <c-input-text v-model:value="url" placeholder="Enter request URL" @keydown.enter="sendRequest" />
      <n-button type="primary" :loading="isLoading" @click="sendRequest">Send</n-button>
    </n-input-group>

    <!-- Request Configuration -->
    <c-card>
      <div class="flex items-center gap-4 mb-4 border-b pb-2">
        <n-button :type="activeTab === 'body' ? 'primary' : 'default'" text class="font-bold" @click="activeTab = 'body'">Body</n-button>
        <n-button :type="activeTab === 'headers' ? 'primary' : 'default'" text class="font-bold" @click="activeTab = 'headers'">Headers</n-button>
        <div class="flex-grow"></div>
        <n-switch v-model:value="useProxy">
          <template #checked>CORS Proxy ON</template>
          <template #unchecked>CORS Proxy OFF</template>
        </n-switch>
      </div>

      <div v-show="activeTab === 'body'">
        <c-input-text v-model:value="body" placeholder="Enter request body here..." multiline :rows="6" font-mono w-full />
      </div>

      <div v-show="activeTab === 'headers'">
        <div v-for="(h, index) in headers" :key="h.id" class="flex gap-2 mb-2 items-center">
          <n-checkbox v-model:checked="h.enabled" />
          <c-input-text v-model:value="h.key" placeholder="Key (e.g., Content-Type)" class="flex-1" />
          <c-input-text v-model:value="h.value" placeholder="Value (e.g., application/json)" class="flex-1" />
          <n-button quaternary circle type="error" @click="removeHeader(h.id)">
            <template #icon>
              <i class="i-mdi-delete"></i>
            </template>
          </n-button>
        </div>
        <n-button dashed class="mt-2 w-full" @click="addHeader">
          <i class="i-mdi-plus mr-1"></i> Add Header
        </n-button>
      </div>
    </c-card>

    <!-- Response Section -->
    <c-card mt-6 title="Response" v-if="response || isLoading">
      <div v-if="isLoading" class="flex justify-center p-8">
        <n-spin size="large" />
      </div>
      
      <div v-else-if="response">
        <div v-if="response.error" class="mb-4">
          <n-alert type="error">{{ response.error }}</n-alert>
        </div>
        
        <div class="flex items-center gap-6 mb-4 text-sm" v-if="response.status > 0">
          <n-tag :type="statusColor" round>
             Status: {{ response.status }} {{ response.statusText }}
          </n-tag>
          <n-tag round>
            Time: {{ response.timeMs }} ms
          </n-tag>
          <n-tag round>
            Size: {{ formatSize(response.sizeBytes) }}
          </n-tag>
        </div>

        <div class="flex items-center gap-4 mb-4 border-b pb-2" v-if="response.status > 0">
          <n-button :type="responseTab === 'body' ? 'primary' : 'default'" text class="font-bold" @click="responseTab = 'body'">Body</n-button>
          <n-button :type="responseTab === 'headers' ? 'primary' : 'default'" text class="font-bold" @click="responseTab = 'headers'">Headers</n-button>
        </div>

        <div v-if="responseTab === 'body' && response.status > 0">
          <TextareaCopyable :value="JSONResponseString" :language="response.isJson ? 'json' : 'text'" :rows="12" />
        </div>

        <div v-if="responseTab === 'headers' && response.status > 0">
          <table class="w-full text-left font-mono text-sm border-collapse">
            <tbody>
              <tr v-for="(val, key) in response.headers" :key="key" class="border-b dark:border-gray-700">
                <th class="py-2 pr-4 text-gray-500 font-semibold">{{ key }}</th>
                <td class="py-2 break-all">{{ val }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </c-card>
  </div>
</template>
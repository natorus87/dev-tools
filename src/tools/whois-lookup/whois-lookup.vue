<script setup lang="ts">
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { lookupDomain, type WhoisResult } from './whois-lookup.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const inputDomain = useStorage('whois:domain', 'github.com');
const isLoading = ref(false);
const result = ref<WhoisResult | null>(null);
const errorMessage = ref('');
const activeTab = ref('parsed'); // 'parsed' or 'raw'

const formatKey = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
};

const executeLookup = async () => {
  if (!inputDomain.value) return;
  isLoading.value = true;
  result.value = null;
  errorMessage.value = '';

  try {
    result.value = await lookupDomain(inputDomain.value);
  } catch (e: any) {
    errorMessage.value = e.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <c-card>
      <n-input-group>
        <c-input-text 
          v-model:value="inputDomain" 
          placeholder="example.com" 
          @keydown.enter="executeLookup" 
          :disabled="isLoading" 
          autocomplete="off" 
          spellcheck="false" 
          autocapitalize="off"
        />
        <n-button type="primary" :loading="isLoading" @click="executeLookup">
          Search
        </n-button>
      </n-input-group>
    </c-card>

    <div v-if="errorMessage" class="mt-4">
      <n-alert type="error">{{ errorMessage }}</n-alert>
    </div>

    <c-card mt-6 title="Lookup Results" v-if="result && !isLoading">
       <div class="flex items-center gap-4 mb-4 border-b pb-2">
        <n-button :type="activeTab === 'parsed' ? 'primary' : 'default'" text class="font-bold cursor-pointer" @click="activeTab = 'parsed'">Record</n-button>
        <n-button :type="activeTab === 'raw' ? 'primary' : 'default'" text class="font-bold cursor-pointer" @click="activeTab = 'raw'">Raw JSON</n-button>
      </div>

      <div v-if="activeTab === 'parsed'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Main Details -->
          <div>
            <h3 class="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Domain Details</h3>
            <table class="w-full text-left font-mono text-sm border-collapse bg-gray-50 dark:bg-gray-800 rounded">
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <th class="py-2 px-3 font-semibold w-1/3">Domain Name:</th>
                  <td class="py-2 px-3 text-primary font-bold">{{ result.domain }}</td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <th class="py-2 px-3 font-semibold">Registrar:</th>
                  <td class="py-2 px-3">{{ result.registrar }}</td>
                </tr>
                <tr v-for="(val, key) in result.events" :key="key" class="border-b dark:border-gray-700">
                  <th class="py-2 px-3 font-semibold">{{ formatKey(key) }}:</th>
                  <td class="py-2 px-3">{{ val }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Nameservers -->
          <div>
            <h3 class="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Nameservers</h3>
            <div v-if="result.nameservers.length > 0" class="bg-gray-50 dark:bg-gray-800 rounded p-3 text-sm font-mono">
              <div v-for="ns in result.nameservers" :key="ns" class="py-1">
                {{ ns }}
              </div>
            </div>
            <div v-else class="text-gray-500 italic text-sm">No nameservers found.</div>
          </div>
        </div>

        <!-- Status -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Status Codes</h3>
          <div class="flex flex-wrap gap-2">
            <n-tag v-for="stat in result.status" :key="stat" type="info" round class="font-mono text-xs">{{ stat }}</n-tag>
          </div>
        </div>
      </div>

      <!-- Raw -->
      <div v-if="activeTab === 'raw'">
        <TextareaCopyable :value="result.rawJson" language="json" :rows="20" />
      </div>
    </c-card>
  </div>
</template>
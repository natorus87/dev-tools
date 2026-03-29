<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { encodeBech32, decodeBech32, type Bech32EncodeResult, type Bech32DecodeResult } from './bech32-toolkit.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const mode = useStorage<'encode' | 'decode'>('bech32:mode', 'encode');

// Encode Settings
const encodeHrp = useStorage('bech32:encode-hrp', 'bc');
const encodeData = useStorage('bech32:encode-data', '0014751e76e8199196d454941c45d1b3a323f1433bd6');
const encodeFormat = useStorage<'bech32' | 'bech32m'>('bech32:encode-format', 'bech32');

// Decode Settings
const decodeString = useStorage('bech32:decode-string', 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4');

const encodeOutput = ref<Bech32EncodeResult>({ bech32String: '' });
const decodeOutput = ref<Bech32DecodeResult>({ hrp: '', dataHex: '', format: 'bech32' });

const runOperation = () => {
  if (mode.value === 'encode') {
    encodeOutput.value = encodeBech32({
      hrp: encodeHrp.value,
      dataHex: encodeData.value,
      format: encodeFormat.value,
    });
  } else {
    decodeOutput.value = decodeBech32(decodeString.value);
  }
};

const modeOptions = [
  { label: 'Encode', value: 'encode' },
  { label: 'Decode', value: 'decode' },
];

const formatOptions = [
  { label: 'Bech32 (BIP-173)', value: 'bech32' },
  { label: 'Bech32m (BIP-350)', value: 'bech32m' },
];

watch([mode, encodeHrp, encodeData, encodeFormat, decodeString], runOperation, { immediate: true });

</script>

<template>
  <div>
    <c-card title="Bech32 Settings" mb-4>
      <n-form-item label="Mode">
        <n-radio-group v-model:value="mode">
          <n-radio-button v-for="opt in modeOptions" :key="opt.value" :value="opt.value" :label="opt.label" />
        </n-radio-group>
      </n-form-item>
    </c-card>

    <div v-if="mode === 'encode'">
      <div grid grid-cols-1 md:grid-cols-2 gap-4>
        <c-card title="Encoding Input">
          <n-form-item label="Human Readable Part (HRP)">
            <c-input-text v-model:value="encodeHrp" placeholder="bc" w-full />
          </n-form-item>
          <n-form-item label="Data (HEX format)">
            <c-input-text v-model:value="encodeData" placeholder="0014751e..." multiline :rows="4" w-full />
          </n-form-item>
          <n-form-item label="Checksum Format">
            <n-select v-model:value="encodeFormat" :options="formatOptions" w-full />
          </n-form-item>
        </c-card>

        <c-card title="Bech32 Output">
          <n-alert v-if="encodeOutput.error" type="error" mb-4>{{ encodeOutput.error }}</n-alert>
          <TextareaCopyable :value="encodeOutput.bech32String" :rows="8" placeholder="Output string..." />
        </c-card>
      </div>
    </div>

    <div v-else>
      <div grid grid-cols-1 md:grid-cols-2 gap-4>
        <c-card title="Decoding Input">
          <n-form-item label="Bech32 / Bech32m String">
            <c-input-text v-model:value="decodeString" placeholder="bc1q..." multiline :rows="6" w-full />
          </n-form-item>
        </c-card>

        <c-card title="Decoded Output">
          <n-alert v-if="decodeOutput.error" type="error" mb-4>{{ decodeOutput.error }}</n-alert>
          <template v-else>
            <n-form-item label="Detected Format">
              <div class="p-2 border rounded border-gray-200 dark:border-gray-700 w-full mb-2">
                {{ decodeOutput.format.toUpperCase() }}
              </div>
            </n-form-item>
            <n-form-item label="Human Readable Part (HRP)">
              <div class="p-2 border rounded border-gray-200 dark:border-gray-700 font-mono w-full mb-2 text-primary font-bold">
                {{ decodeOutput.hrp }}
              </div>
            </n-form-item>
            <n-form-item label="Data (HEX)">
              <TextareaCopyable :value="decodeOutput.dataHex" :rows="4" />
            </n-form-item>
          </template>
        </c-card>
      </div>
    </div>
  </div>
</template>
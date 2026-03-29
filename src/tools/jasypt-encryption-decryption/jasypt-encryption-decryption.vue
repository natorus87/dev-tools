<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { encryptJasypt, decryptJasypt, type JasyptResult } from './jasypt-encryption-decryption.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const mode = useStorage<'encrypt' | 'decrypt'>('jasypt:mode', 'encrypt');
const password = useStorage('jasypt:password', '');
const plainText = useStorage('jasypt:plain', 'my-secret-token');
const encryptedText = useStorage('jasypt:encrypted', '');

const result = ref<JasyptResult>({ text: '' });

const runOperation = () => {
  result.value = { text: '' };
  if (mode.value === 'encrypt') {
    result.value = encryptJasypt(plainText.value, password.value);
    if (!result.value.error) {
      encryptedText.value = `ENC(${result.value.text})`;
    }
  } else {
    result.value = decryptJasypt(encryptedText.value, password.value);
    if (!result.value.error) {
      plainText.value = result.value.text;
    }
  }
};

const modeOptions = [
  { label: 'Encrypt', value: 'encrypt' },
  { label: 'Decrypt', value: 'decrypt' },
];

watch([mode, password, plainText, encryptedText], () => {
  // If the user hasn't typed a password yet, just clear error and wait
  if (!password.value) {
    result.value = { text: '', error: 'Please enter a Jasypt Master Password' };
    return;
  }
  // We only run auto-calculate if it's currently focused or changed
  // In a robust implementation, it's better to fire on button click or debounced input
}, { immediate: true });

</script>

<template>
  <div>
    <c-card title="Jasypt Settings" mb-4>
      <n-form-item label="Mode">
        <n-radio-group v-model:value="mode">
          <n-radio-button v-for="opt in modeOptions" :key="opt.value" :value="opt.value" :label="opt.label" />
        </n-radio-group>
      </n-form-item>

      <n-form-item label="Master Password (JASYPT_ENCRYPTOR_PASSWORD)">
        <n-input
          v-model:value="password"
          type="password"
          show-password-on="click"
          placeholder="Enter master password..."
          w-full
        />
      </n-form-item>
    </c-card>

    <div grid grid-cols-1 md:grid-cols-2 gap-4>
      <c-card title="Plain Text">
        <n-form-item>
          <c-input-text
            v-if="mode === 'encrypt'"
            v-model:value="plainText"
            placeholder="Type secret text to encrypt..."
            multiline
            :rows="6"
            w-full
          />
          <TextareaCopyable
            v-else
            :value="plainText"
            :rows="6"
          />
        </n-form-item>
        
        <n-button v-if="mode === 'encrypt'" type="primary" block @click="runOperation" :disabled="!password">
          Encrypt Text
        </n-button>
      </c-card>

      <c-card title="Encrypted Text (ENC)">
        <n-form-item>
          <c-input-text
            v-if="mode === 'decrypt'"
            v-model:value="encryptedText"
            placeholder="ENC(....) or base64 token..."
            multiline
            :rows="6"
            w-full
          />
          <TextareaCopyable
            v-else
            :value="encryptedText"
            :rows="6"
          />
        </n-form-item>

        <n-button v-if="mode === 'decrypt'" type="primary" block @click="runOperation" :disabled="!password">
          Decrypt Text
        </n-button>
      </c-card>
    </div>

    <n-alert v-if="result.error" type="error" mt-4>
      {{ result.error }}
    </n-alert>
  </div>
</template>
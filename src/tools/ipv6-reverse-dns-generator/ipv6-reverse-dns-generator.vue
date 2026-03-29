<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { getIpv6ReverseDns } from './ipv6-reverse-dns-generator.service';
import TextareaCopyable from '@/components/TextareaCopyable.vue';

const ipv6 = useStorage('ipv6-reverse-dns:ipv6', '2001:db8::567:89ab');

const reverseDns = computed(() => getIpv6ReverseDns(ipv6.value) || '');
</script>

<template>
  <div>
    <c-card title="Input" mb-4>
      <n-form-item label="IPv6 Address">
        <c-input-text
          v-model:value="ipv6"
          placeholder="2001:db8::567:89ab"
          clearable
          w-full
        />
      </n-form-item>
    </c-card>

    <c-card title="Output">
      <n-form-item label="Reverse DNS (PTR Record)">
        <TextareaCopyable
          :value="reverseDns"
          placeholder="b.a.9.8.7.6.5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa."
          :rows="3"
        />
      </n-form-item>
    </c-card>
  </div>
</template>
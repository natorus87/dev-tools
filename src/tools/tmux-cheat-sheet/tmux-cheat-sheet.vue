<script setup lang="ts">
import { tmuxCheatSheetData } from './tmux-cheat-sheet.service';
</script>

<template>
  <div>
    <p class="mb-6 opacity-80">
      A quick reference for the Tmux terminal multiplexer. The default prefix key is <code>Ctrl + b</code>.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <c-card v-for="category in tmuxCheatSheetData" :key="category.title" :title="category.title">
        <table class="w-full text-left text-sm">
          <tbody>
            <tr v-for="cmd in category.commands" :key="cmd.key" class="border-b dark:border-gray-700 last:border-0">
              <td class="py-2 pr-4 font-mono font-bold w-1/3">{{ cmd.key }}</td>
              <td class="py-2 text-gray-700 dark:text-gray-300 w-2/3">{{ cmd.description }}</td>
            </tr>
          </tbody>
        </table>
      </c-card>
    </div>
  </div>
</template>
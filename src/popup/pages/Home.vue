<template>
  <div
    class="absolute top-0 left-0 w-[1px] h-[1px] rounded-b-2xl bg-transparent"
  />
</template>
<script setup>
import { onMounted } from 'vue';
import browser from 'webextension-polyfill';
import { initElementSelector as initElementSelectorFunc } from '@/newtab/utils/elementSelector';

async function initElementSelector() {
  const [tab] = await browser.tabs.query({
    url: '*://*/*',
    active: true,
    currentWindow: true,
  });
  if (!tab) return;
  initElementSelectorFunc(tab).then(() => {
    window.close();
  });
}

onMounted(() => {
  initElementSelector();
});
</script>
<style>
.recording-card {
  transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) !important;
}
</style>

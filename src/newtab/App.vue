<template>Content</template>
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.remove(tabs[0].id);
  });
});
</script>
<style></style>

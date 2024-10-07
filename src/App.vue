<template>
  <div id="app" class="page">
    <AppointmentPage />
  </div>
</template>

<script setup lang="ts">
import AppointmentPage from '@/components/AppointmentPage.vue'
</script>

<style scoped>
.page {
  width: 100%;
  height: auto;
  min-height: 100%;
  flex: 1;
  background-color: #edeff2;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.5;
  padding: 50px 0;
}
</style>

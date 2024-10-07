<template>
  <button class="time-slot" :disabled="timeSlot.taken" @click="emits('book-slot', timeSlot)">
    {{ timeSlot.start }}
  </button>
</template>

<script setup lang="ts">
import type { TimeSlot } from '@/types/time-slot'

defineProps<{ timeSlot: TimeSlot }>()
const emits = defineEmits<{
  (e: 'book-slot', slot: TimeSlot): void
}>()
</script>

<style scoped>
.time-slot {
  padding: 4px 0;
  width: 50px;
  margin: 2px 0;
  border: none;
  background-color: #eff4fd;
  border-radius: 3%;
  color: #3773c1;
  font-weight: bold;
}

.time-slot:disabled {
  background-color: white;
  text-decoration: line-through;
  color: #bfc3cb;
  cursor: auto;
}
</style>

<template>
  <div>
    <p>Your visit with <b>Test Doctor</b> is confirmed:</p>
    <div class="appointment-date">
      <img src="../assets/calendar.svg" class="icon" alt="calendar-icon" />
      <p>
        On <b>{{ displayedBookedSlot }}</b>
      </p>
    </div>
    <p class="appointment-date__sub-title">Select new appointment date to book a new visit:</p>
    <AppointmentPageSlotItem v-for="slot in timeSlots" :key="slot.start" :time-slot="slot" @book-slot="onBookSlot" />
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { computed, onMounted, ref } from 'vue'
import { getClosestLastMonday, getClosestNextMonday, isDateAfterTomorrow } from '@/utils/date'
import { bookSlot, getWeeklySlots } from '@/utils/api'
import type { WeeklySlotsResponse } from '@/types/api-models'
import type { TimeSlot } from '@/types/time-slot'
import AppointmentPageSlotItem from '@/components/AppointmentPageSlotItem.vue'

const timeSlots = ref<TimeSlot[]>([])
const bookedAppointmentDate = ref('2024-08-20 09:00')

const getAvailableSlots = async () => {
  let apiSlots: WeeklySlotsResponse = []

  const lastMonday = getClosestLastMonday(new Date())
  const nextMonday = getClosestNextMonday(new Date())

  const currentWeekSlots = await getWeeklySlots(lastMonday)
  const nextWeekSlots = await getWeeklySlots(nextMonday)

  apiSlots = [...currentWeekSlots, ...nextWeekSlots]

  timeSlots.value = apiSlots
    .filter((slot) => isDateAfterTomorrow(slot.Start))
    .map((item) => {
      return {
        start: item.Start,
        end: item.End,
        taken: item.Taken ?? false
      }
    })
}

const onBookSlot = async (selectedSlot: TimeSlot) => {
  await bookSlot({
    Start: selectedSlot.start,
    End: selectedSlot.end,
    Comments: '',
    Patient: {
      Name: 'Example',
      SecondName: 'Patient',
      Email: 'example@patient.com',
      Phone: '123456789'
    }
  })
}

const displayedBookedSlot = computed(() => {
  return format(bookedAppointmentDate.value, "EEEE, d MMMM yyyy 'at' HH:mm")
})

onMounted(async () => {
  await getAvailableSlots()
})
</script>

<style scoped lang="scss">
.appointment-date {
  background-color: white;
  padding: 10px 20px;
  margin: 12px 0;
  display: flex;
  align-items: center;

  &__sub-title {
    margin-bottom: 6px;
  }
}

.icon {
  width: 20px;
  height: auto;
  margin-right: 10px;
}
</style>

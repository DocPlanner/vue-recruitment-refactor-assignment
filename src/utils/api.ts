import axios from 'axios'
import type { BookSlotData, WeeklySlotsResponse } from '@/types/api-models'

const BASE_URL = 'https://draliatest.azurewebsites.net/api/availability'

export const getWeeklySlots = async (date: string): Promise<WeeklySlotsResponse | []> => {
  try {
    const response = await axios.get<WeeklySlotsResponse>(`${BASE_URL}/GetWeeklySlots/${date}`)
    return response.data
  } catch (error) {
    console.error('Error fetching slots:', error)
    return []
  }
}

export const bookSlot = async (data: BookSlotData): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/BookSlot`, data)
  } catch (error) {
    console.error('Error booking slot:', error)
  }
}

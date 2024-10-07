export type BookSlotData = {
  Start: string
  End: string
  Comments?: string
  Patient: {
    Name: string
    SecondName: string
    Email: string
    Phone: string
  }
}

export type WeeklySlotsResponse = Array<{
  Start: string
  End: string
  Taken?: boolean
}>

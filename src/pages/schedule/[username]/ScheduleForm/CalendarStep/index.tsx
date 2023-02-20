import { Calendar } from '@/components/Calendar'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
  CalendarStepContainer,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const handleDateSelected = (date: Date) => {
    const hasDateIsEqual = dayjs(date).isSame(dayjs(selectedDate))

    if (hasDateIsEqual) {
      setSelectedDate(null)
      return
    }

    setSelectedDate(date)
  }

  const fakeHoursList = Array.from(Array(11).keys())

  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar
        selectedDate={selectedDate}
        onDateSelected={handleDateSelected}
      />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {fakeHoursList.map((item) => (
              <TimePickerItem key={item}>
                {String(item + 8).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </CalendarStepContainer>
  )
}

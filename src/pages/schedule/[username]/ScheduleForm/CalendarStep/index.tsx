import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  CalendarStepContainer,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState(null)

  const router = useRouter()

  const username = String(router.query.username)
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

  useEffect(() => {
    if (!selectedDate) {
      return
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => console.log(response.data))
  }, [selectedDate, username])

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

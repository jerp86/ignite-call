import { Calendar } from '@/components/Calendar'
import {
  CalendarStepContainer,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export const CalendarStep = () => {
  const isDateSelected = true
  const fakeHoursList = Array.from(Array(11).keys())

  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            segunda-feira <span>20 de fevereiro</span>
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

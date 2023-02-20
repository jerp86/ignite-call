import { getWeekDays } from '@/utils'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import {
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarActions,
  CalendarBody,
  CalendarDay,
} from './styles'

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))

  const handlePreviousMonth = () => {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  const handleNextMonth = () => {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => currentDate.set('date', i + 1))

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse()

    return [...previousMonthFillArray, ...daysInMonthArray]
  }, [currentDate])
  console.log(calendarWeeks)

  const fakeDays = Array.from(Array(7).keys())
  const fakeWeeks = [1, 8, 15, 22]

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button
            type="button"
            onClick={handlePreviousMonth}
            title="Mês anterior"
          >
            <CaretLeft />
          </button>
          <button type="button" onClick={handleNextMonth} title="Próximo mês">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fakeWeeks.map((item) => (
            <tr key={item}>
              {fakeDays.map((_, index) => (
                <td key={index}>
                  <CalendarDay>{index + item}</CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}

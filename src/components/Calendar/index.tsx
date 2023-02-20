import { getWeekDays } from '@/utils'
import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarActions,
  CalendarBody,
  CalendarDay,
} from './styles'

export const Calendar = () => {
  const shortWeekDays = getWeekDays({ short: true })
  const fakeDays = Array.from(Array(7).keys())
  const fakeWeeks = [1, 8, 15, 22]

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Fevereiro <span>2023</span>
        </CalendarTitle>

        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
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

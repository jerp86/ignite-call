import { ConfirmStep } from './ConfirmStep'
import { CalendarStep } from './CalendarStep'
import { useCallback, useState } from 'react'

export const ScheduleForm = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  const handleClearSelectedDateTime = useCallback(
    () => setSelectedDateTime(null),
    [],
  )

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancelConfirmation={handleClearSelectedDateTime}
      />
    )
  }

  return <CalendarStep onSelectDateTime={setSelectedDateTime} />
}

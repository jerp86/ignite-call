export const convertTimeStringToMinutes = (timeString: string) => {
  const [hours, minutes] = timeString.split(':').map(Number)

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error('The specified time is not valid')
  }

  return hours * 60 + minutes
}

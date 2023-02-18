interface TimeToRevalidateProps {
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
}

export const timeToRevalidate = ({
  seconds = 60,
  minutes = 60,
  hours = 24,
  days = 1,
}: TimeToRevalidateProps) => {
  return seconds * minutes * hours * days
}

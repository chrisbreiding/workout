export function padNumber (item) {
  return item < 10 ? `0${item}` : `${item}`
}

export function toMinutesAndSeconds (totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds - minutes * 60

  return { minutes, seconds }
}

export function fromMinutesAndSeconds ({ minutes, seconds }) {
  return minutes * 60 + seconds
}

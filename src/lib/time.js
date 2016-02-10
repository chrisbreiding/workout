function padNumber (item) {
  return item < 10 ? '0' + item : item;
}

export function secondsToTime (seconds) {
  var minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  return minutes.toString() + ':' + padNumber(seconds.toString());
}

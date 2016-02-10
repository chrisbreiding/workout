export function addTimer () {
  return {
    type: 'ADD_TIMER',
    timer: {
      isRunning: false,
      time: 0,
      timeLeft: 0,
    }
  };
}

export function removeTimer (index) {
  return {
    type: 'REMOVE_TIMER',
    index
  };
}

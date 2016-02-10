const lsKey = 'workout';

function save (data) {
  localStorage[lsKey] = JSON.stringify(data);
}

export function retrieveData () {
  return (dispatch) => {
    const data = JSON.parse(localStorage[lsKey] || '{}');
    dispatch({
      type: 'REPLACE_TIMERS',
      timers: data.timers || []
    });
  };
}

export function addTimer () {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_TIMER',
      timer: {
        isRunning: false,
        time: 0,
        timeLeft: 0,
      }
    });
    save(getState());
  };
}

export function removeTimer (index) {
  return (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_TIMER',
      index
    });
    save(getState());
  };
}

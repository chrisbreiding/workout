import _ from 'lodash';
const lsKey = 'workout';

function save (data) {
  localStorage[lsKey] = JSON.stringify(data);
}

function saveTimers (data) {
  save(_.extend({}, data, {
    timers: _.map(data.timers, timer => _.pick(timer, 'time', 'timeLeft'))
  }));
}

export function retrieveData () {
  return (dispatch) => {
    const data = JSON.parse(localStorage[lsKey] || '{}');
    if (data.timers) {
      dispatch({ type: 'REPLACE_TIMERS', timers: data.timers || [] });
    }
  };
}

export function addTimer () {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_TIMER' });
    saveTimers(getState());
  };
}

export function removeTimer (index) {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_TIMER', index });
    saveTimers(getState());
  };
}

export function updateTimerTime (index, time) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_TIMER_TIME', index, time });
    saveTimers(getState());
  };
}

export function updateTimerTimeLeft (index, timeLeft) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_TIMER_TIME_LEFT', index, timeLeft });
    saveTimers(getState());
  };
}

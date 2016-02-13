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

function timersData (timers) {
  return _.map(timers, timer => _.extend(timer, {
    isEditing: false,
    isRunning: false
  }));
}

export function retrieveData () {
  return (dispatch) => {
    const data = JSON.parse(localStorage[lsKey] || '{}');
    dispatch({ type: 'REPLACE_TIMERS', timers: timersData(data.timers) || [] });
  };
}

export function addTimer () {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_TIMER',
      timer: {
        isEditing: false,
        isRunning: false,
        time: 0,
        timeLeft: 0,
      }
    });
    saveTimers(getState());
  };
}

export function removeTimer (index) {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_TIMER', index });
    saveTimers(getState());
  };
}

export function editTimer (index, isEditing) {
  return { type: 'EDIT_TIMER', index, isEditing };
}

export function startTimer (index) {
  return { type: 'START_TIMER', index };
}

export function stopTimer (index) {
  return { type: 'STOP_TIMER', index };
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

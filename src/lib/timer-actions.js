import _ from 'lodash';
import { saveData } from './actions';

function saveTimers (data) {
  saveData(_.extend({}, data, {
    timers: data.timers
  }));
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

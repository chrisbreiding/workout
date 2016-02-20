import _ from 'lodash';

function updateTimer(state, action, value) {
  return [
    ...state.slice(0, action.index),
    _.extend({}, state[action.index], value),
    ...state.slice(action.index + 1)
  ];
}

const newTimer = () => ({
  time: 0,
  timeLeft: 0,
});

export default {
  timers (state = [newTimer()], action = {}) {
    switch (action.type) {
      case 'REPLACE_TIMERS':
        return action.timers;
      case 'ADD_TIMER':
        return state.concat(newTimer());
      case 'REMOVE_TIMER':
        return [
          ...state.slice(0, action.index),
          ...state.slice(action.index + 1)
        ];
      case 'UPDATE_TIMER_TIME':
        return updateTimer(state, action, { time: action.time, timeLeft: action.time })
      case 'UPDATE_TIMER_TIME_LEFT':
        return updateTimer(state, action, { timeLeft: action.timeLeft })
      default:
        return state;
    }
  }
};

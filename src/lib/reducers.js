import _ from 'lodash';

function newId (ids) {
  if (!ids.length) { return 0; }
  return Math.max(...ids) + 1;
}

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

export const timers = (state = [newTimer()], action = {}) => {
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
};

const newCategory = (categories) => ({
  id: newId(_.map(categories, 'id')),
  name: 'Category',
  exercises: [],
});

export const categories = (state = [], action = {}) => {
  switch (action.type) {
    case 'REPLACE_CATEGORIES':
      return action.categories;
    case 'ADD_CATEGORY':
      return state.concat(newCategory(state));
    case 'REMOVE_CATEGORY':
      const index = _.findIndex(state, { id: action.category.id })
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

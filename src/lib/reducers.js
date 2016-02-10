export default {
  timers (state = [], action = {}) {
    switch (action.type) {
      case 'REPLACE_TIMERS':
        return action.timers;
      case 'ADD_TIMER':
        return state.concat(action.timer);
      case 'REMOVE_TIMER':
        return state.slice(0, action.index).concat(state.slice(action.index + 1, state.length));
      default:
        return state;
    }
  }
};

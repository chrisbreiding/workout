import _ from 'lodash';

const lsKey = 'workout';

export function retrieveData () {
  return (dispatch) => {
    const data = JSON.parse(localStorage[lsKey] || '{}');
    if (data.timers) {
      dispatch({ type: 'REPLACE_TIMERS', timers: data.timers || [] });
    }
    if (data.categories) {
      dispatch({ type: 'REPLACE_CATEGORIES', categories: data.categories || [] });
    }
  };
}

export function saveData (data) {
  localStorage[lsKey] = JSON.stringify(data);
}

import _ from 'lodash';
import { saveData } from './actions';

function saveCategories (data) {
  saveData(_.extend({}, data, {
    categories: data.categories
  }));
}
export function addCategory () {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_CATEGORY' });
    saveCategories(getState());
  };
}

export function removeCategory (category) {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_CATEGORY', category });
    saveCategories(getState());
  };
}

export function updateCategory (category) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_CATEGORY', category });
    saveCategories(getState());
  };
}

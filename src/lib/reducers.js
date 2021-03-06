import _ from 'lodash'

function addItemToArray (arr, data) {
  return arr.concat(data)
}

function addItemToObject (obj, data) {
  return _.extend({}, obj, { [data.id]: data })
}

function updateItemInArray (arr, data) {
  const index = _.findIndex(arr, { id: data.id })
  return [
    ...arr.slice(0, index),
    _.extend({}, arr[index], data),
    ...arr.slice(index + 1),
  ]
}

function updateItemInObject (obj, data) {
  return _.extend({}, obj, {
    [data.id]: _.extend({}, obj[data.id], data),
  })
}

function removeItemAtIndex (arr, index) {
  return [
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
  ]
}

function removeItemFromArray (arr, data) {
  return removeItemAtIndex(arr, _.findIndex(arr, { id: data.id }))
}

function removeItemFromObject (obj, data) {
  return _.omit(obj, data.id)
}

export const timers = (state = [], action = {}) => {
  switch (action.type) {
    case 'REPLACE_DATA':
      return action.data.timers || state
    case 'ADD_TIMER':
      return addItemToArray(state, action.data)
    case 'REMOVE_TIMER':
      return removeItemFromArray(state, action.data)
    case 'UPDATE_TIMER':
      return updateItemInArray(state, action.data)
    default:
      return state
  }
}

export const routines = (state = [], action = {}) => {
  switch (action.type) {
    case 'REPLACE_DATA':
      return action.data.routines || state
    case 'ADD_ROUTINE':
      return addItemToArray(state, action.data)
    case 'REMOVE_ROUTINE':
      return removeItemFromArray(state, action.data)
    case 'UPDATE_ROUTINE':
      return updateItemInArray(state, action.data)
    case 'ADD_ACTIVITY_TO_ROUTINE': {
      const routine = _.find(state, { id: action.toId })
      return updateItemInArray(state, {
        id: action.toId,
        activityIds: routine.activityIds.concat(action.id),
      })
    }
    case 'REMOVE_ACTIVITY_FROM_ROUTINE': {
      const routine = _.find(state, { id: action.fromId })
      const index = _.findIndex(routine.activityIds, (id) => id === action.id)
      return updateItemInArray(state, {
        id: action.fromId,
        activityIds: removeItemAtIndex(routine.activityIds, index),
      })
    }
    default:
      return state
  }
}

export const activities = (state = {}, action = {}) => {
  switch (action.type) {
    case 'REPLACE_DATA':
      return action.data.activities || state
    case 'ADD_ACTIVITY':
      return addItemToObject(state, action.data)
    case 'REMOVE_ACTIVITY':
      return removeItemFromObject(state, action.data)
    case 'UPDATE_ACTIVITY':
      return updateItemInObject(state, action.data)
    default:
      return state
  }
}

export const categories = (state = [], action = {}) => {
  switch (action.type) {
    case 'REPLACE_DATA':
      return action.data.categories || state
    case 'ADD_CATEGORY':
      return addItemToArray(state, action.data)
    case 'REMOVE_CATEGORY':
      return removeItemFromArray(state, action.data)
    case 'UPDATE_CATEGORY':
      return updateItemInArray(state, action.data)
    case 'ADD_EXERCISE_TO_CATEGORY': {
      const category = _.find(state, { id: action.toId })
      return updateItemInArray(state, {
        id: action.toId,
        exerciseIds: category.exerciseIds.concat(action.id),
      })
    }
    case 'REMOVE_EXERCISE_FROM_CATEGORY': {
      const category = _.find(state, { id: action.fromId })
      const index = _.findIndex(category.exerciseIds, (id) => id === action.id)
      return updateItemInArray(state, {
        id: action.fromId,
        exerciseIds: removeItemAtIndex(category.exerciseIds, index),
      })
    }
    default:
      return state
  }
}

export const exercises = (state = {}, action = {}) => {
  switch (action.type) {
    case 'REPLACE_DATA':
      return action.data.exercises || state
    case 'ADD_EXERCISE':
      return addItemToObject(state, action.data)
    case 'REMOVE_EXERCISE':
      return removeItemFromObject(state, action.data)
    case 'UPDATE_EXERCISE':
      return updateItemInObject(state, action.data)
    case 'ADD_WEIGHT_TO_EXERCISE': {
      const exercise = state[action.toId]
      return updateItemInObject(state, {
        id: action.toId,
        weightIds: exercise.weightIds.concat(action.id),
      })
    }
    case 'REMOVE_WEIGHT_FROM_EXERCISE': {
      const exercise = _.find(state, { id: action.fromId })
      const index = _.findIndex(exercise.weightIds, (id) => id === action.id)
      return updateItemInObject(state, {
        id: action.fromId,
        weightIds: removeItemAtIndex(exercise.weightIds, index),
      })
    }
    default:
      return state
  }
}

export const weights = (state = {}, action = {}) => {
  switch (action.type) {
    case 'REPLACE_DATA':
      return action.data.weights || state
    case 'ADD_WEIGHT':
      return addItemToObject(state, action.data)
    case 'REMOVE_WEIGHT':
      return removeItemFromObject(state, action.data)
    case 'UPDATE_WEIGHT':
      return updateItemInObject(state, action.data)
    default:
      return state
  }
}

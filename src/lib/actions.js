import _ from 'lodash'

const lsKey = 'workout'

function newId (ids) {
  if (!ids.length) { return 0 }
  return Math.max(...ids) + 1
}

const save = _.debounce((data) => {
  localStorage[lsKey] = JSON.stringify(data)
}, 500)

function addAndSaveSingle ({ type, pluralType, createFn }) {
  return (dispatch, getState) => {
    dispatch({ type: `ADD_${type.toUpperCase()}`, data: createFn(getState()[pluralType]) })
    save(getState())
  }
}

function addAndSaveRelationship ({ type, toType, createFn }, { toId }) {
  return (dispatch, getState) => {
    const item = createFn(getState()[`${type}s`])
    dispatch({ type: `ADD_${type.toUpperCase()}`, data: item })
    dispatch({
      type: `ADD_${type.toUpperCase()}_TO_${toType.toUpperCase()}`,
      id: item.id,
      toId,
    })
    save(getState())
  }
}

function removeAndSave ({ type, fromType },  { id, fromId }) {
  return (dispatch, getState) => {
    dispatch({ type: `REMOVE_${type.toUpperCase()}_FROM_${fromType.toUpperCase()}`, id, fromId })
    dispatch({ type: `REMOVE_${type.toUpperCase()}`, data: { id } })
    save(getState())
  }
}

function dispatchAndSave (type, data) {
  return (dispatch, getState) => {
    dispatch({ type, data })
    save(getState())
  }
}

export function retrieveData () {
  return (dispatch) => {
    const data = JSON.parse(localStorage[lsKey] || '{}')
    dispatch({ type: 'REPLACE_DATA', data })
  }
}


const newTimer = (timers) => ({
  id: newId(_.map(timers, 'id')),
  time: 0,
  timeLeft: 0,
  isNew: true,
})

export const addTimer = _.partial(addAndSaveSingle, { type: 'timer', pluralType: 'timers', createFn: newTimer })
export const removeTimer = _.partial(dispatchAndSave, 'REMOVE_TIMER')
export const updateTimer = _.partial(dispatchAndSave, 'UPDATE_TIMER')


const newCategory = (categories) => ({
  id: newId(_.map(categories, 'id')),
  name: '',
  exerciseIds: [],
  isNew: true,
})

export const addCategory = _.partial(addAndSaveSingle, { type: 'category', pluralType: 'categories', createFn: newCategory })
export const removeCategory = _.partial(dispatchAndSave, 'REMOVE_CATEGORY')
export const updateCategory = _.partial(dispatchAndSave, 'UPDATE_CATEGORY')


const newExercise = (exercises) => ({
  id: newId(_.map(exercises, 'id')),
  name: '',
  weightIds: [],
  isNew: true,
})

export const addExercise = _.partial(addAndSaveRelationship, { type: 'exercise', toType: 'category', createFn: newExercise })
export const removeExercise = _.partial(removeAndSave, { type: 'exercise', fromType: 'category' })
export const updateExercise = _.partial(dispatchAndSave, 'UPDATE_EXERCISE')


const newWeight = (weights) => ({
  id: newId(_.map(weights, 'id')),
  amount: 0,
  isNew: true,
})

export const addWeight = _.partial(addAndSaveRelationship, { type: 'weight', toType: 'exercise', createFn: newWeight })
export const removeWeight = _.partial(removeAndSave, { type: 'weight', fromType: 'exercise' })
export const updateWeight = _.partial(dispatchAndSave, 'UPDATE_WEIGHT')

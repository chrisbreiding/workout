import _ from 'lodash'
import { PropTypes as PT } from 'react'

export const timer = {
  id: PT.number.isRequired,
  time: PT.number.isRequired,
  timeLeft: PT.number.isRequired,
  isNew: PT.bool,

  onReset: PT.func.isRequired,
  onRemove: PT.func.isRequired,
  onUpdate: PT.func.isRequired,
}

export const timers = {
  timers: PT.arrayOf(PT.shape(_.omitBy(timer, _.isFunction))).isRequired,
}

export const weight = {
  id: PT.number.isRequired,
  amount: PT.number.isRequired,
}

export const exercise = {
  id: PT.number.isRequired,
  name: PT.string.isRequired,
  weightIds: PT.arrayOf(PT.number).isRequired,

  weights: PT.object.isRequired,
}

export const category = {
  id: PT.number.isRequired,
  name: PT.string.isRequired,
  exerciseIds: PT.arrayOf(PT.number).isRequired,
  isNew: PT.bool,

  exercises: PT.object.isRequired,
  weights: PT.object.isRequired,
}

export const categories = {
  categories: PT.arrayOf(PT.shape(_.omitBy(category, _.isFunction))).isRequired,
}

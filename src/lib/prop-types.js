import _ from 'lodash';
import { PropTypes as PT } from 'react';

export const timer = {
  time: PT.number.isRequired,
  timeLeft: PT.number.isRequired,

  onReset: PT.func.isRequired,
  onRemove: PT.func.isRequired,
  onUpdateTime: PT.func.isRequired,
  onUpdateTimeLeft: PT.func.isRequired,
  onPlaySound: PT.func.isRequired,
  onStopSound: PT.func.isRequired
};

export const timers = {
  timers: PT.arrayOf(PT.shape(_.omitBy(timer, _.isFunction))).isRequired
};

export const exercise = {
  name: PT.string.isRequired,
  weights: PT.arrayOf(PT.number).isRequired
};

export const exercises = {
  exercises: PT.arrayOf(PT.shape(_.omitBy(exercise, _.isFunction))).isRequired
};

export const category = {
  id: PT.number.isRequired,
  name: PT.string.isRequired,
  exercises: PT.arrayOf(PT.shape(exercises)).isRequired,

  onRemove: PT.func.isRequired,
};

export const categories = {
  categories: PT.arrayOf(PT.shape(_.omitBy(category, _.isFunction))).isRequired
};

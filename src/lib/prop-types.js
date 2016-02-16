import _ from 'lodash';
import { PropTypes as PT } from 'react';

const timer = {
  time: PT.number.isRequired,
  timeLeft: PT.number.isRequired,

  onReset: PT.func.isRequired,
  onRemove: PT.func.isRequired,
  onUpdateTime: PT.func.isRequired,
};

const timers = {
  timers: PT.arrayOf(PT.shape(_.omitBy(timer, _.isFunction))).isRequired
};

export default { timer, timers };

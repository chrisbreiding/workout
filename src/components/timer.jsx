import React from 'react';
import propTypes from '../lib/prop-types';
import { secondsToTime } from '../lib/time';

const Timer = ({timeLeft, onRemove}) => (
  <li>
    {secondsToTime(timeLeft)}
    <button onClick={onRemove}>x</button>
  </li>
);

Timer.propTypes = propTypes.timer;

export default Timer;

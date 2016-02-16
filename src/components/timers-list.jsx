import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import propTypes from '../lib/prop-types';
import { addTimer, removeTimer, updateTimerTime, updateTimerTimeLeft } from '../lib/actions';
import Timer from './timer';

const TimersList = ({ timers, dispatch }) => (
  <div className="timers-list">
    <ul>
      {timers.map((timer, index) => (
        <Timer
          key={index}
          onUpdateTime={time => dispatch(updateTimerTime(index, time))}
          onUpdateTimeLeft={timeLeft => dispatch(updateTimerTimeLeft(index, timeLeft))}
          onReset={() => dispatch(updateTimerTimeLeft(index, timer.time))}
          onRemove={() => dispatch(removeTimer(index))}
          {...timer}
        />
      ))}
    </ul>
    <button onClick={() => dispatch(addTimer())}>Add Timer</button>
  </div>
);

TimersList.propTypes = propTypes.timers;

export default connect(({timers}) => ({timers}))(TimersList);

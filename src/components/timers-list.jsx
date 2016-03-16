import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as propTypes from '../lib/prop-types';
import { addTimer, removeTimer, updateTimer } from '../lib/actions';
import Timer from './timer';

const sound = new Howl({
  urls: ['sounds/shell.mp3'],
  loop: true
});

function playSound () { sound.play(); }
function stopSound () { sound.stop(); }

const TimersList = ({ timers, dispatch }) => (
  <div className="timers-list">
    <ul>
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          onUpdate={data => dispatch(updateTimer(data))}
          onReset={() => dispatch(updateTimer({ id: timer.id, timeLeft: timer.time }))}
          onRemove={() => dispatch(removeTimer({ id: timer.id }))}
          onPlaySound={playSound}
          onStopSound={stopSound}
          {...timer}
        />
      ))}
    </ul>
    <button className="add-timer" onClick={() => dispatch(addTimer())}>
      <i className="fa fa-plus"></i>
    </button>
  </div>
);

TimersList.propTypes = propTypes.timers;

export default connect(({timers}) => ({timers}))(TimersList);

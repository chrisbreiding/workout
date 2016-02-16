import cs from 'classnames';
import React from 'react';
import Editor from './timer-editor';
import propTypes from '../lib/prop-types';
import { toMinutesAndSeconds, fromMinutesAndSeconds, padNumber } from '../lib/time';

function Timer (props) {
  const { minutes, seconds } = toMinutesAndSeconds(props.timeLeft);

  function edit () {
    props.onReset();
    props.onEdit(!props.isEditing);
  }

  return (
    <li className={cs('timer', { editing: props.isEditing })}>
      <span onClick={edit}>
        <span>{minutes}:{padNumber(seconds)}</span>
      </span>
      <button className="start" onClick={props.onStart}>Start</button>
      <button className="stop" onClick={props.onStop}>Stop</button>
      <button className="remove" onClick={props.onRemove}>x</button>
      {props.isEditing ? <Editor {...props} /> : null}
    </li>
  );
}

Timer.propTypes = propTypes.timer;

export default Timer;

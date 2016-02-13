import cs from 'classnames';
import React from 'react';
import Modal from './modal';
import propTypes from '../lib/prop-types';
import { toMinutesAndSeconds, fromMinutesAndSeconds, padNumber } from '../lib/time';

function editor (props) {
  if (!props.isEditing) { return null; }

  const { minutes, seconds } = toMinutesAndSeconds(props.time);

  const changeMinutes = amount => () => props.onUpdateTime(fromMinutesAndSeconds(minutes + amount, seconds));
  const changeSeconds = amount => () => props.onUpdateTime(fromMinutesAndSeconds(minutes, seconds + amount));

  return (
    <Modal onClose={() => props.onEdit(false)}>
      <div className="timer-editor">
        <div className="wrap">
          <button onClick={changeMinutes(5)}><i className="fa fa-chevron-up"></i> 5</button>
          <button onClick={changeMinutes(1)}><i className="fa fa-chevron-up"></i> 1</button>
          <div className="content">{padNumber(minutes)}</div>
          <button onClick={changeMinutes(-1)}><i className="fa fa-chevron-down"></i> 1</button>
          <button onClick={changeMinutes(-5)}><i className="fa fa-chevron-down"></i> 5</button>
        </div>
        <div className="wrap separator">
          <button></button>
          <button></button>
          <div className="content">:</div>
          <button></button>
          <button></button>
        </div>
        <div className="wrap">
          <button onClick={changeSeconds(5)}><i className="fa fa-chevron-up"></i> 5</button>
          <button onClick={changeSeconds(1)}><i className="fa fa-chevron-up"></i> 1</button>
          <div className="content">{padNumber(seconds)}</div>
          <button onClick={changeSeconds(-1)}><i className="fa fa-chevron-down"></i> 1</button>
          <button onClick={changeSeconds(-5)}><i className="fa fa-chevron-down"></i> 5</button>
        </div>
      </div>
    </Modal>
  );
}

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
      {editor(props)}
    </li>
  );
}

Timer.propTypes = propTypes.timer;

export default Timer;

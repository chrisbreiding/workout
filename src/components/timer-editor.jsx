import React from 'react';
import Modal from './modal';
import * as propTypes from '../lib/prop-types';
import { toMinutesAndSeconds, fromMinutesAndSeconds, padNumber } from '../lib/time';

function adjustedTime(time) {
  if (time < 0) {
    return 60 + time;
  } else {
    return time >= 60 ? time - 60 : time;
  }
}

function TimerEditor (props) {
  const { minutes, seconds } = toMinutesAndSeconds(props.time);

  const changeMinutes = amount => () =>
    props.onUpdateTime(fromMinutesAndSeconds(adjustedTime(minutes + amount), seconds));
  const changeSeconds = amount => () =>
    props.onUpdateTime(fromMinutesAndSeconds(minutes, adjustedTime(seconds + amount)));

  return (
    <Modal>
      <div className="timer-editor">
        <main>
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
        </main>
        <footer>
          <button className="remove" onClick={props.onRemove}>Remove</button>
          <button onClick={props.onClose}>OK</button>
        </footer>
      </div>
    </Modal>
  );
}

TimerEditor.propTypes = propTypes.timer;

export default TimerEditor;

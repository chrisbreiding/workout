import cs from 'classnames';
import React, { createClass } from 'react';
import Editor from './timer-editor';
import propTypes from '../lib/prop-types';
import { toMinutesAndSeconds, fromMinutesAndSeconds, padNumber } from '../lib/time';

export default createClass({
  propTypes: propTypes.timer,

  getInitialState () {
    return { isEditing: false };
  },

  render () {
    const { minutes, seconds } = toMinutesAndSeconds(this.props.timeLeft);

    return (
      <li className={cs('timer', { editing: this.props.isEditing })}>
        <span onClick={() => this._edit(true)}>
          <span>{minutes}:{padNumber(seconds)}</span>
        </span>
        <button className="start" onClick={this._start}>Start</button>
        <button className="stop" onClick={this._stop}>Stop</button>
        <button className="remove" onClick={this.props.onRemove}>x</button>
        {this.state.isEditing ? <Editor {...this.props} onClose={() => this._edit(false)} /> : null}
      </li>
    );
  },

  _start () {

  },

  _stop () {

  },

  _edit (isEditing) {
    this.props.onReset();
    this.setState({ isEditing });
  },
});

import cs from 'classnames';
import { Howl } from 'howler';
import React, { createClass } from 'react';
import Editor from './timer-editor';
import * as propTypes from '../lib/prop-types';
import { toMinutesAndSeconds, fromMinutesAndSeconds, padNumber } from '../lib/time';

export default createClass({
  propTypes: propTypes.timer,

  getInitialState () {
    return {
      isEditing: false,
      isRunning: false,
      isTimeUp: this.props.time && !this.props.timeLeft
    };
  },

  render () {
    const { minutes, seconds } = toMinutesAndSeconds(this.props.timeLeft);

    const className = cs('timer', {
      editing: this.state.isEditing,
      running: this.state.isRunning,
      'can-start': this._canStart(),
      'can-reset': this._canReset(),
      'times-up': this.state.isTimeUp
    });

    return (
      <li className={className}>
        <span className="time-left" onClick={() => this._edit(true)}>
          <span>{minutes}:{padNumber(seconds)}</span>
        </span>
        <button className="start" onClick={this._start}>
          <i className="fa fa-play"></i>
        </button>
        <button className="pause" onClick={this._pause}>
          <i className="fa fa-pause"></i>
        </button>
        <button className="reset" onClick={this._reset}>
          <i className="fa fa-refresh"></i>
        </button>
        {this._editor()}
      </li>
    );
  },

  _canStart () {
    return this.props.timeLeft > 0 && !this.state.isRunning;
  },

  _canReset () {
    return this.props.time !== this.props.timeLeft && !this.state.isRunning;
  },

  _editor () {
    if (!this.state.isEditing) { return null; }

    return (
      <Editor
        {...this.props}
        onClose={() => this._edit(false)}
        onRemove={this.props.onRemove}
      />
    );
  },

  _reset () {
    this.props.onStopSound();
    this.setState({ isTimeUp: false });
    this.props.onReset();
  },

  _start () {
    if (this.state.isRunning) { return; }

    this.setState({ isRunning: true });

    this.intervalId = setInterval(() => {
      const newTimeLeft = this.props.timeLeft - 1;
      this.props.onUpdate({ id: this.props.id, timeLeft: newTimeLeft });
      if (newTimeLeft === 0) {
        this._timesUp();
      }
    }, 1000);
  },

  _timesUp () {
    this._pause();
    this.setState({ isTimeUp: true });
    this.props.onPlaySound();
  },

  _pause () {
    clearInterval(this.intervalId);
    this.setState({ isRunning: false });
  },

  _edit (isEditing) {
    this._pause();
    this.props.onReset();
    this.setState({ isEditing });
  },
});

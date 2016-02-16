import cs from 'classnames';
import React, { createClass } from 'react';
import Editor from './timer-editor';
import propTypes from '../lib/prop-types';
import { toMinutesAndSeconds, fromMinutesAndSeconds, padNumber } from '../lib/time';

export default createClass({
  propTypes: propTypes.timer,

  getInitialState () {
    return {
      isEditing: false,
      isRunning: false,
      isTimeUp: false
    };
  },

  render () {
    const { minutes, seconds } = toMinutesAndSeconds(this.props.timeLeft);

    const className = cs('timer', {
      editing: this.state.isEditing,
      running: this.state.isRunning,
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
        {this._resetButton()}
        {this._editor()}
      </li>
    );
  },

  _resetButton () {
    if (this.props.time === this.props.timeLeft || this.intervalId) { return null; }

    return (
      <button className="reset" onClick={this._reset}>
        <i className="fa fa-refresh"></i>
      </button>
    );
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
    this.setState({ isTimeUp: false });
    this.props.onReset();
  },

  _start () {
    if (this.state.isRunning) { return; }

    this.setState({ isRunning: true });

    this.intervalId = setInterval(() => {
      const newTimeLeft = this.props.timeLeft - 1;
      this.props.onUpdateTimeLeft(newTimeLeft);
      if (newTimeLeft === 0) {
        this._pause();
        this.setState({ isTimeUp: true });
      }
    }, 1000);
  },

  _pause () {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.setState({ isRunning: false });
  },

  _edit (isEditing) {
    this._pause();
    this.props.onReset();
    this.setState({ isEditing });
  },
});

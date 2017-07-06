import cs from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import * as propTypes from '../lib/prop-types'
import { addTimer, removeTimer, updateTimer } from '../lib/actions'
import Timer from './timer'

const TimersList = ({ timers, dispatch }) => (
  <div
    className={cs('list timers-list', {
      'is-empty': !timers.length,
    })}
  >
    <ul>
      {timers.map((timer) => (
        <Timer
          key={timer.id}
          onUpdate={(data) => dispatch(updateTimer(data))}
          onReset={() => dispatch(updateTimer({ id: timer.id, timeLeft: timer.time }))}
          onRemove={() => dispatch(removeTimer({ id: timer.id }))}
          {...timer}
        />
      ))}
    </ul>
    <div className="empty-list">No Timers</div>
    <button className="add add-timer" onClick={() => dispatch(addTimer())}>
      <i className="fa fa-plus"></i>
    </button>
  </div>
)

TimersList.propTypes = propTypes.timers

export default connect(({ timers }) => ({ timers }))(TimersList)

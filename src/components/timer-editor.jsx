import React from 'react'
import Editor from './editor'
import * as propTypes from '../lib/prop-types'
import { toMinutesAndSeconds, fromMinutesAndSeconds, padNumber } from '../lib/time'

function adjustedTime (time) {
  if (time < 0) {
    return 60 + time
  } else {
    return time >= 60 ? time - 60 : time
  }
}

function TimerEditor (props) {
  const { minutes, seconds } = toMinutesAndSeconds(props.time)

  const changeMinutes = (amount) => () => {
    const time = fromMinutesAndSeconds(adjustedTime(minutes + amount), seconds)
    props.onUpdate({ id: props.id, time, timeLeft: time })
  }
  const changeSeconds = (amount) => () => {
    const time = fromMinutesAndSeconds(minutes, adjustedTime(seconds + amount))
    props.onUpdate({ id: props.id, time, timeLeft: time })
  }

  return (
    <Editor className="timer-editor" onRemove={props.onRemove} onClose={props.onClose}>
      <div>
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
    </Editor>
  )
}

TimerEditor.propTypes = propTypes.timer

export default TimerEditor

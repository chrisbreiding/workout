import React from 'react'
import Editor from './editor'
import * as propTypes from '../lib/prop-types'
import { toMinutesAndSeconds, fromMinutesAndSeconds } from '../lib/time'

// keep time from 0 to 59
function adjustedTime (time) {
  return time < 0 ? 60 + time : time % 60
}

const TimerEditor = (props) => {
  const { minutes, seconds } = toMinutesAndSeconds(props.time)

  const change = (part) => (e) => {
    const value = Number(e.target.value)
    if (isNaN(value)) return

    const time = fromMinutesAndSeconds({
      minutes: part === 'minutes' ? adjustedTime(value) : minutes,
      seconds: part === 'seconds' ? adjustedTime(value) : seconds,
    })
    props.onUpdate({ id: props.id, time, timeLeft: time })
  }

  const select = (e) => {
    e.target.setSelectionRange(0, e.target.value.length)
  }

  return (
    <Editor className="timer-editor" onRemove={props.onRemove} onClose={props.onClose}>
      <input type="tel" value={minutes} onChange={change('minutes')} onFocus={select} />
      <label>m</label>
      <input type="tel" value={seconds} onChange={change('seconds')} onFocus={select} />
      <label>s</label>
    </Editor>
  )
}

TimerEditor.propTypes = propTypes.timer

export default TimerEditor

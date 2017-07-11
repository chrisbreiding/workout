import React from 'react'
import FocusedInput from './focused-input'
import * as propTypes from '../lib/prop-types'
import { updateActivity } from '../lib/actions'

const ActivityEditor = (props) => (
  <li className="sub-editor activity-editor">
    <fieldset>
      <label>Activity Name</label>
      <FocusedInput
        defaultValue={props.name}
        shouldFocus={props.isNew}
        placeholder="Activity Name..."
        onChange={(e) => props.dispatch(updateActivity({ id: props.id, name: e.target.value, isNew: false }))}
      />
      <button className="remove" onClick={props.onRemove}>
        <i className="fa fa-remove"></i> Remove Activity
      </button>
    </fieldset>
  </li>
)

ActivityEditor.propTypes = propTypes.activity

export default ActivityEditor

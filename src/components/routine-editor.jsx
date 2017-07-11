import React from 'react'
import { connect } from 'react-redux'
import Editor from './editor'
import ActivityEditor from './activity-editor'
import FocusedInput from './focused-input'
import * as propTypes from '../lib/prop-types'
import { removeRoutine, updateRoutine, addActivity, removeActivity } from '../lib/actions'

const RoutineEditor = (props) => {
  const activities = props.activityIds.map((id) => props.activities[id])

  return (
    <Editor
      className="routine-editor"
      onClose={props.onClose}
      removeText="Remove Routine"
      onRemove={() => props.dispatch(removeRoutine({ id: props.id }))}
    >
      <fieldset>
        <label>Routine Name</label>
        <FocusedInput
          defaultValue={props.name}
          shouldFocus={props.isNew}
          placeholder="Routine name..."
          onChange={(e) => props.dispatch(updateRoutine({ id: props.id, name: e.target.value }))}
        />
      </fieldset>
      <h3>Activities</h3>
      <ul className="editor-activities">
        {activities.map((activity) => (
          <ActivityEditor
            key={activity.id}
            dispatch={props.dispatch}
            onRemove={() => props.dispatch(removeActivity({ id: activity.id, fromId: props.id }))}
            {...activity}
          />
        ))}
      </ul>
      <button className="add" onClick={() => props.dispatch(addActivity({ toId: props.id }))}>
        <i className="fa fa-plus"></i> <span>Add Activity</span>
      </button>
    </Editor>
  )
}

RoutineEditor.propTypes = propTypes.routine

export default connect()(RoutineEditor)

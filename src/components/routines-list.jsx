import cs from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import * as propTypes from '../lib/prop-types'
import { pluckState } from '../lib/util'
import { addRoutine, updateRoutine } from '../lib/actions'
import Routine from './routine'

const RoutinesList = ({ routines, dispatch }) => (
  <div
    className={cs('list routines-list', {
      'is-empty': !routines.length,
    })}
  >
    <ul>
      {routines.map((routine) => (
        <Routine
          key={routine.id}
          onUpdate={(data) => dispatch(updateRoutine(data))}
          {...routine}
        />
      ))}
    </ul>
    <div className="empty-list">No Routines</div>
    <button className="add" onClick={() => dispatch(addRoutine())}>
      <i className="fa fa-plus"></i>
    </button>
  </div>
)

RoutinesList.propTypes = propTypes.routines

export default connect(pluckState('routines'))(RoutinesList)

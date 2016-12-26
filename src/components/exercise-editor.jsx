import _ from 'lodash'
import React from 'react'
import FocusedInput from './focused-input'
import * as propTypes from '../lib/prop-types'
import { updateExercise, addWeight, removeWeight, updateWeight } from '../lib/actions'

function sanitizeAmount (amount) {
  return _.isNumber(Number(amount)) ? Number(amount) : 0
}

export default function ExerciseEditor (props) {
  const weights = props.weightIds.map((id) => props.weights[id])
  let nameInput

  return (
    <li className="editor-exercise">
      <fieldset>
        <label>Exercise Name</label>
        <FocusedInput
          ref={(node) => nameInput = node}
          defaultValue={props.name}
          shouldFocus={props.isNew}
          placeholder="Exercise Name..."
          onChange={() => props.dispatch(updateExercise({ id: props.id, name: nameInput.value, isNew: false }))}
        />
      </fieldset>
      <h4>Weights</h4>
      <ul className="editor-weights">
        {weights.map((weight) => {
          let amountInput
          return (
            <li key={weight.id} className="editor-weight">
              <FocusedInput
                type="number"
                ref={(node) => amountInput = node}
                defaultValue={weight.amount}
                shouldFocus={weight.isNew}
                onChange={() => props.dispatch(updateWeight({ id: weight.id, amount: sanitizeAmount(amountInput.value), isNew: false }))}
              />
              <button
                className="remove remove-weight"
                onClick={() => props.dispatch(removeWeight({ id: weight.id, fromId: props.id }))}
              >
                <i className="fa fa-remove"></i>
              </button>
            </li>
          )
        }).concat(
          <li key="add-weight" className="add-weight">
            <button onClick={() => props.dispatch(addWeight({ toId: props.id }))}>
              <i className="fa fa-plus"></i>
            </button>
          </li>
        )}
      </ul>
      <button className="remove remove-exercise" onClick={props.onRemove}>
        <i className="fa fa-remove"></i> Remove Exercise
      </button>
    </li>
  )
}

ExerciseEditor.propTypes = propTypes.exercise

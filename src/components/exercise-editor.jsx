import React from 'react';
import { connect } from 'react-redux';
import * as propTypes from '../lib/prop-types';
import { updateExercise, addWeight, removeWeight, updateWeight } from '../lib/actions';

function sanitizeAmount (amount) {
  return _.isNumber(Number(amount)) ? Number(amount) : 0;
}

export default function ExerciseEditor (props) {
  const weights = props.weightIds.map(id => props.weights[id]);
  let nameInput;

  return (
    <li>
      <fieldset>
        <label>Name</label>
        <input
          ref={node => nameInput = node}
          defaultValue={props.name}
          onChange={() => props.dispatch(updateExercise({ id: props.id, name: nameInput.value }))}
        />
        <button onClick={props.onRemove}><i className="fa fa-remove"></i></button>
      </fieldset>
      <h4>Weights</h4>
      <ul>
        {weights.map(weight => {
          let amountInput;
          return (
            <li key={weight.id}>
              <fieldset>
                <input
                  type="number"
                  ref={node => amountInput = node}
                  defaultValue={weight.amount}
                  onChange={() => props.dispatch(updateWeight({ id: weight.id, amount: sanitizeAmount(amountInput.value) }))}
                />
                <button onClick={() => props.dispatch(removeWeight({ id: weight.id, fromId: props.id }))}>
                  <i className="fa fa-remove"></i>
                </button>
              </fieldset>
            </li>
          );
        })}
      </ul>
      <button onClick={() => props.dispatch(addWeight({ toId: props.id }))}>+ Weight</button>
    </li>
  );
}

ExerciseEditor.propTypes = propTypes.exercise;

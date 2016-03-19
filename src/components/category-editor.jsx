import React from 'react';
import { connect } from 'react-redux';
import Editor from './editor';
import ExerciseEditor from './exercise-editor';
import * as propTypes from '../lib/prop-types';
import { removeCategory, updateCategory, addExercise, removeExercise } from '../lib/actions';

function CategoryEditor (props) {
  const exercises = props.exerciseIds.map(id => props.exercises[id]);
  let nameInput;

  return (
    <Editor
      className="category-editor"
      onClose={props.onClose}
      removeText="Remove Category"
      onRemove={() => props.dispatch(removeCategory({ id: props.id }))}
    >
      <fieldset>
        <label>Category Name</label>
        <input
          ref={node => nameInput = node}
          defaultValue={props.name}
          placeholder="Category name..."
          onChange={() => props.dispatch(updateCategory({ id: props.id, name: nameInput.value }))}
        />
      </fieldset>
      <h3>Exercises</h3>
      <ul className="editor-exercises">
        {exercises.map(exercise => (
          <ExerciseEditor
            key={exercise.id}
            weights={props.weights}
            dispatch={props.dispatch}
              onRemove={() => props.dispatch(removeExercise({ id: exercise.id, fromId: props.id }))}
            {...exercise}
          />
      )).concat(
        <li key="add-exercise" className="add-exercise">
          <button onClick={() => props.dispatch(addExercise({ toId: props.id }))}>
            <i className="fa fa-plus"></i>
          </button>
        </li>
      )}
      </ul>
    </Editor>
  );
}

CategoryEditor.propTypes = propTypes.category;

export default connect()(CategoryEditor);

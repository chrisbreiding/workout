import React, { Component } from 'react'
import * as propTypes from '../lib/prop-types'
import Editor from './category-editor'

export default class Category extends Component {
  static propTypes = propTypes.category

  state = {
    isEditing: false,
  }

  render () {
    const exercises = this.props.exerciseIds.map((id) => this.props.exercises[id])
    return (
      <li onClick={() => this.setState({ isEditing: true })}>
        <h2>{this.props.name || '(Unnamed)'}</h2>

        <ul className="exercises-list">
          {exercises.map((exercise) => {
            const weights = exercise.weightIds.map((id) => this.props.weights[id])
            return (
              <li key={exercise.id}>
                <h3>{exercise.name || '(Unnamed)'}</h3>
                <ul className="weights-list">
                  {weights.map((weight) => (
                    <li key={weight.id}>{weight.amount}</li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
        {this._editor()}
      </li>
    )
  }

  componentDidMount () {
    if (this.props.isNew) {
      this.setState({ isEditing: true })
      this.props.onUpdate({ id: this.props.id })
    }
  }

  _editor () {
    if (!this.state.isEditing) { return null }

    return (
      <Editor
        {...this.props}
        onClose={this._endEditing}
        onRemove={this.props.onRemove}
      />
    )
  }

  _endEditing = () => {
    this.setState({ isEditing: false })
    this.props.onUpdate({ id: this.props.id, isNew: false })
  }
}

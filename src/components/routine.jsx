import React, { Component } from 'react'
import * as propTypes from '../lib/prop-types'
import Editor from './routine-editor'

class Routine extends Component {
  static propTypes = propTypes.routine

  state = {
    isEditing: false,
  }

  render () {
    const activities = this.props.activityIds.map((id) => this.props.activities[id])
    return (
      <li onClick={() => this.setState({ isEditing: true })}>
        <h2>{this.props.name || '(Unnamed)'}</h2>

        <ul className="activities-list">
          {activities.map((activity) => (
            <li key={activity.id}>
              <h3>{activity.name || '(Unnamed)'}</h3>
              <p>Type: {activity.type}</p>
            </li>
          ))}
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

export default Routine

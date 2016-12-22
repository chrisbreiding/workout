import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

let idNum = 0

export default class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  componentDidMount () {
    document.body.className += ' modal-dialog-present'

    const id = `modal-${idNum++}`
    let element = document.getElementById(id)
    if (!element) {
      element = document.createElement('div')
      element.id = id
      document.body.appendChild(element)
    }
    this.element = element
    this.componentDidUpdate()
  }

  componentWillUnmount () {
    document.body.removeChild(this.element)
    document.body.className = document.body.className.replace(' modal-dialog-present', '')
  }

  componentDidUpdate () {
    render((
      <div className={`modal-dialog-overlay ${this.props.className || ''}`}>
        <div className="modal-dialog">
          {this.props.children}
        </div>
      </div>
    ), this.element)
  }

  render () {
    return null
  }
}

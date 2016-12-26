import React, { Component } from 'react'

export default class FocusedInput extends Component {
  render () {
    return <input ref="input" {...this.props} />
  }

  componentDidMount () {
    this._focusDomNode(this.refs.input)
  }

  get value () {
    return this.refs.input.value
  }

  _focusDomNode (domNode) {
    if (this.props.shouldFocus) {
      domNode.focus()
      domNode.value = domNode.value // trick to set cursor to end of text
    }
  }
}

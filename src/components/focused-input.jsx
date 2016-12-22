import React, { Component } from 'react'

export default class FocusedInput extends Component {
  render () {
    return <input ref="input" {...this.props} />
  }

  componentDidMount () {
    this._focusDomNode(this.refs.input)
  }

  getValue () {
    return this.refs.input.value
  }

  _focusDomNode (domNode) {
    domNode.focus()
    domNode.value = domNode.value // trick to set cursor to end of text
  }
}

import React, { createClass } from 'react';
import * as propTypes from '../lib/prop-types';

export default createClass({
  propTypes: propTypes.category,

  getInitialState () {
    return { isEditing: false };
  },

  render () {
    return (
      <li>
        {this.props.name}
        <button onClick={() => this.props.onRemove()}>x</button>
      </li>
    );
  }
});

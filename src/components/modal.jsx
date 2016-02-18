import React, { createClass, PropTypes as PT } from 'react';

export default createClass({
  propTypes: {
    className: PT.string
  },

  componentDidMount () {
    document.body.className += ' modal-dialog-present';
  },

  componentWillUnmount () {
    document.body.className = document.body.className.replace(' modal-dialog-present', '');
  },

  render () {
    return (
      <div className={`modal-dialog-overlay ${this.props.className || ''}`}>
        <div className="modal-dialog">
          {this.props.children}
        </div>
      </div>
    );
  }
});

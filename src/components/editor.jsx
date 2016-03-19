import React from 'react';
import Modal from './modal';

export default (props) => (
  <Modal className={`editor ${props.className || ''}`}>
    <main>
      {props.children}
    </main>
    <footer>
      <button className="remove" onClick={props.onRemove}>
        <i className="fa fa-remove"></i> {props.removeText || 'Remove'}
      </button>
      <button className="ok" onClick={props.onClose}>OK</button>
    </footer>
  </Modal>
);

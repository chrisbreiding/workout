import React from 'react';
import Modal from './modal';

export default (props) => (
  <Modal className="editor">
    <main>
      <div>
        {props.children}
      </div>
    </main>
    <footer>
      <button className="remove" onClick={props.onRemove}>Remove</button>
      <button className="ok" onClick={props.onClose}>OK</button>
    </footer>
  </Modal>
);

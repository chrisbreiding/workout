import React from 'react';
import Modal from './modal';

export default (props) => (
  <Modal>
    <div className="editor">
      <main>
        {props.children}
      </main>
      <footer>
        <button className="remove" onClick={props.onRemove}>Remove</button>
        <button onClick={props.onClose}>OK</button>
      </footer>
    </div>
  </Modal>
);

import React from 'react';
import './modal.css';

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <>
        <div className="overlay" />
        <div class="modal" id="modal">
          <button type="button" className="close" onClick={this.onClose} style={{float: 'right'}}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="content">{this.props.children}</div>
          <div class="actions">
            {/*<button type="submit" class="toggle-button">Ok</button>*/}
          </div>
        </div>
      </>
    );
  }
}
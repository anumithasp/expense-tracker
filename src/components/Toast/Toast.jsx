import React from 'react';
import './Toast.css';

const Toast = (props) => {
    return (
      <div className="toast-container position-fixed top-0 end-0 p-3">
          <div id="liveToast" className="toast exp-toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className='d-flex'>
              <div className="toast-body toast-msg">
                {props.message}
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
      </div>
    )
  }

export default Toast

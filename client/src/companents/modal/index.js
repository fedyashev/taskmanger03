import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({title = "", body = "", onCloseModal = f => f}) => {
  const handleClick = e => {
    e.preventDefault();
    onCloseModal();
  };
  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{background: "rgba(0, 0, 0, 0.5)"}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header py-1 px-2">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" aria-label="Close" onClick={handleClick}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body py-1 px-2">
            <span>{body}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propsType = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

export default Modal;


  // <div className="modal fade show" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{display: "block"}}>
  //   <div className="modal-dialog" role="document">
  //     <div className="modal-content">
  //       <div className="modal-header">
  //         <h5 className="modal-title">{title}</h5>
  //         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
  //           <span aria-hidden="true">&times;</span>
  //         </button>
  //       </div>
  //       <div className="modal-body">
  //         <span>{body}</span>
  //       </div>
  //     </div>
  //   </div>
  // </div>

      // <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      //   <span aria-hidden="true">&times;</span>
      // </button>


    // <div className="alert alert-warning alert-dismissible fade show" role="alert">
    //   <span>{body}</span>
    //   <button type="button" className="close" aria-label="Close" onClick={handleClick}>
    //     <span aria-hidden="true">&times;</span>
    //   </button>
    // </div>
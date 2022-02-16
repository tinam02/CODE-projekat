import React from "react";

function Modal({ closeModal, imgSrc, imgDesc, imgTitle }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button> X </button>
        <div className="modalTitle">
          <h1>{imgTitle}</h1>
        </div>
        <div className="modalBody">
          <p>{imgDesc}</p>
          <img src={imgSrc} alt="Larger view of the doc you clicked on" />
        </div>
      </div>
    </div>
  );
}

export default Modal;

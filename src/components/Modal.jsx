import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Modal({
  toggleModal,
  imgSrc,
  imgDesc,
  imgTitle,
  imgTimestamp,
  imgTag,
  imgRemove,
  imgId,
  onRemove,
}) {
  const transition = {
    duration: 0.45,
    ease: [0, 0.5, -0.5, 1],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modalBackground"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition,
        }}
        exit={{ opacity: 0 }}
        className="modalContainer"
      >
        <img src={imgSrc} alt="modal img" draggable={false} />
        <div className="modalBody">
          <div className="modalDetails">
            <h1 className="modal__imgTitle">Title: {imgTitle}</h1>
            <p className="modal__imgDesc">Description: {imgDesc}</p>
            <p className="modal__imgDate">Date: {imgTimestamp}</p>
            <p     className="modal__imgTag">
              <Link
                to={`/filtered/${imgTag}`}
                className="modal__imgTag-link"
                //toggle modal off to enable scrolling
                onClick={() => toggleModal()}
              >
                #{imgTag}
              </Link>
            </p>
          </div>
          <div className="modal-btn-container">
            <button
              onClick={() => {
                toggleModal();
              }}
            >
              Close
            </button>
            {imgRemove && <button onClick={onRemove}>Remove</button>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;

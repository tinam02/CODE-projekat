import { motion } from "framer-motion";
function Modal({
  toggleModal,
  imgSrc,
  imgDesc,
  imgTitle,
  imgTimestamp,
  imgTag,
}) {
  const transition = {
    duration: 0.45,
    ease: [0, 0.5, -0.5,1],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modalBackground"
    >
      <motion.div
        initial={{ scale: 0, }}
        animate={{ scale: 1, transition }}
        exit={{ opacity: 0 }}
        className="modalContainer"
      >
        <img src={imgSrc} alt="modal img" draggable={false} />
        <div className="modalBody">
          <div className="modalDetails">
            <h1 className="modal__imgTitle">Title: {imgTitle}</h1>
            <p className="modal__imgDesc">Description: {imgDesc}</p>
            <p className="modal__imgDate">Date: {imgTimestamp}</p>
            <p className="modal__imgTag">#{imgTag}</p>
          </div>
          <button
            onClick={() => {
              toggleModal();
            }}
          >
            {" "}
            X{" "}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;

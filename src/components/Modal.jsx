import { motion } from "framer-motion";
function Modal({ toggleModal, imgSrc, imgDesc, imgTitle }) {
  const transition = {
    duration: 0.45,
    ease: [0.6, 0.01, -0.05, 0.9],
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
        animate={{ scale: 1, transition }}
        exit={{ opacity: 0 }}
        className="modalContainer"
      >
        <img src={imgSrc} alt="modal img" />
        <div className="modalBody">
          <div className="modalDetails">
            <h1>Title: {imgTitle}</h1>
            <p>Description: {imgDesc}</p>
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

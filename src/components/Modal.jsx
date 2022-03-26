import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { transition } from "../functions/constants";
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

  // framer
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const item = {
    hidden: { x: "-10%", opacity: 0 },
    show: { x: 0, opacity: 1, transition },
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
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="modalDetails"
          >
            <motion.h1 variants={item} className="modal__imgTitle">
              {imgTitle}
            </motion.h1>
            <motion.p variants={item} className="modal__imgDate">
             Posted {imgTimestamp}
            </motion.p>
            <motion.p variants={item} className="modal__imgDesc">
              Description: {imgDesc}
            </motion.p>
            <motion.p variants={item} className="modal__imgTag">
              <Link
                to={`/filtered/${imgTag}`}
                className="modal__imgTag-link"
                //toggle modal off to enable scrolling
                onClick={() => toggleModal()}
              >
                #{imgTag}
              </Link>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { ...transition, duration: 1.2 },
            }}
            exit={{ opacity: 0 }}
            className="modal-btn-container"
          >
            <button
              onClick={() => {
                toggleModal();
              }}
            >
              Close
            </button>
            {imgRemove && <button onClick={onRemove}>Remove</button>}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;

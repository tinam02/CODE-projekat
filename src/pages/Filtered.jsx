import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Masonry from "react-masonry-css";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { transition } from "../functions/constants";

// todo  update this code

function Filtered() {
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState({
    src: "",
    desc: "",
    name: "",
    time: "",
    tag: "",
  });
  const params = useParams();

  useEffect(() => {
    fetchByTag();
  }, []);
  //!!   dep array for inf loop

  const fetchByTag = async () => {
    const q = query(
      collection(db, "uploads"),
      where("type", "==", params.filteredBy),
      orderBy("timestamp", "desc")
    );

    const uploads = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      uploads.push({ id: doc.id, data: doc.data() });
    });

    setUploads(uploads);
    setLoading(false);
  };

  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1100: 3,
    719: 2,
    560: 1,
  };

  let renderedUploads = "";
  if (uploads) {
    if (!(uploads.length > 0)) {
      renderedUploads = `No uploads tagged with ${params.filteredBy}`;
    } else {
      renderedUploads = uploads.map((file, i) => (
        <motion.img
          src={file.data.imageURL[0]}
          key={i}
          alt={file.data.description}
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          onClick={() => {
            setOpenModal(true);
            setModalId({
              // ...modalId,
              src: file.data.imageURL[0],
              desc: file.data.description,
              name: file.data.name,
              time: JSON.stringify(file.data.timestamp.toDate()),
              tag: [file.data.type],
            });
          }}
        />
      ));
    }
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <h1 style={{ margin: " 30px 0", textAlign: "center" }}>
        #{params.filteredBy}
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {renderedUploads}
          </Masonry>
          {openModal && (
            <Modal
              toggleModal={setOpenModal}
              imgSrc={modalId.src}
              imgDesc={modalId.desc}
              imgTitle={modalId.name}
              imgTimestamp={modalId.time.slice(1, 11).replaceAll("-", "/")}
              imgTag={modalId.tag}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Filtered;

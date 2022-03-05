import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import Loading from "../components/Loading";
import Masonry from "react-masonry-css";
import Modal from "../components/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { transition } from "./constants";

function AllUploads() {
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const [lastUpload, setLastUpload] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState({
    src: "",
    desc: "",
    name: "",
    time: "",
    tag: "",
  });
  const [tags, setTags] = useState(null);
  //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    const q = query(
      collection(db, "uploads"),
      orderBy("timestamp", "desc"),
      limit(30)
    );
    const uploads = [];
    const tagsObjects = [];
    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastUpload(lastVisible);

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      // array objekata
      uploads.push({ id: doc.id, data: doc.data() });
      tagsObjects.push({ data: doc.data().type });
    });
    // izvlaci tag iz svakog tag objekta
    const tagsValues = tagsObjects.map((a) => a.data);
    // u Setu element moze da se pojavi samo jednom, znaci brise duplikate
    const tags = [...new Set(tagsValues)];
    setTags(tags);

    setUploads(uploads);
    setLoading(false);
  };

  //pagination
  const loadMore = async () => {
    const q = query(
      collection(db, "uploads"),
      orderBy("timestamp", "desc"),
      limit(10),
      startAfter(lastUpload)
    );
    const uploads = [];
    const querySnapshot = await getDocs(q);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastUpload(lastVisible);

    querySnapshot.forEach((doc) => {
      uploads.push({ id: doc.id, data: doc.data() });
    });
    setUploads((prevstate) => [...prevstate, ...uploads]);
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
      renderedUploads = "Nothing has been uploaded yet!";
    } else {
      <AnimatePresence>
        {
          (renderedUploads = uploads.map((file, i) => (
            <motion.img
              initial={{ opacity: 0, y: 200 }}
              key={i}
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
              src={file.data.imageURL[0]}
              alt={file.data.description}
            />
          )))
        }
      </AnimatePresence>;
    }
  }

  let marqueeTags = [];
  let marqueeRev = [];
  if (uploads) {
    if (!(uploads.length > 0)) {
      marqueeTags = "Nothing has been uploaded yet!";
    } else {
      marqueeTags = tags.map((tag, i) => {
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: "-100%" }}
            transition={{ transition, duration: 0.8 }}
          >
            <Link
              to={`/filtered/${tag}`}
              style={{
                fontSize: "var(--fs-default)",
                fontFamily: "lorenzaregular",
                marginLeft: "20px",
                textDecoration: "none",
                color: "white",
              }}
            >
              #{tag}
            </Link>
          </motion.span>
        );
      });
      // TODO remove this
      marqueeRev = [...marqueeTags].reverse();
    }
  }

  return (
    <main style={{ overflow: "hidden" }}>
      <motion.hr
        initial={{ width: 0, x: "-100%" }}
        animate={{ width: "105%", x: 0 }}
        exit={{ x: "-100%" }}
        transition={transition}
      />
      <motion.hr
        initial={{ width: 0, x: "-100%" }}
        animate={{ width: "105%", x: 0 }}
        exit={{ x: "-100%" }}
        transition={transition}
      />
      <motion.hr
        initial={{ width: 0, x: "-100%" }}
        animate={{ width: "105%", x: 0 }}
        exit={{ x: "-100%" }}
        transition={transition}
      />
      {/* ---Marquee */}
      <motion.marquee
        initial={{ width: 0, x: "-100%" }}
        animate={{ width: "105%", x: 0 }}
        exit={{ x: "-100%" }}
        transition={transition}
        behavior="scroll"
        direction="right"
        style={{ backgroundColor: "#000", padding: "2px" }}
      >
        {marqueeTags}
      </motion.marquee>
      <motion.marquee
        initial={{ width: 0, x: "100%" }}
        animate={{ width: "105%", x: 0 }}
        exit={{ x: "100%" }}
        transition={transition}
        behavior="scroll"
        direction="left"
        style={{ backgroundColor: "#000", padding: "2px" }}
      >
        {marqueeRev}
      </motion.marquee>

      {/* ---Images */}
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

          {lastUpload && <button onClick={loadMore}> Load more</button>}
        </>
      )}
    </main>
  );
}

export default AllUploads;

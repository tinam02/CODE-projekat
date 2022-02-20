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
import Modal from "../components/Modal";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../components/Loading";

function AllUploads() {
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const [lastUpload, setLastUpload] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState({
    src: "",
    desc: "",
    name: "",
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
      // console.log(doc.id, " => ", doc.data());
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

  const transition = {
    duration: 0.6,
    ease: [0.6, 0.01, -0.05, 0.9],
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

  let marqueeTags = "";
  if (uploads) {
    if (!(uploads.length > 0)) {
      marqueeTags = "Nothing has been uploaded yet!";
    } else {
      <AnimatePresence>
        {
          (marqueeTags = tags.map((tag, i) => {
            return (
              <Link
                key={i}
                to={`/filtered/${tag}`}
                style={{ fontSize: "30px", marginLeft: "20px",textDecoration:'none',color:'white',fontWeight: "bold"}}
              >
                #{tag}
              </Link>
            );
          }))
        }
      </AnimatePresence>;
    }
  }

  return (
    <main>
      <marquee
        behavior=""
        direction="right"
        style={{ backgroundColor: "#000", padding: "8px" }}
      >
        {marqueeTags}
      </marquee>
      <h1>Explore</h1>
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
          {lastUpload && <button onClick={loadMore}> Load more</button>}
          {openModal && (
            <Modal
              toggleModal={setOpenModal}
              imgSrc={modalId.src}
              imgDesc={modalId.desc}
              imgTitle={modalId.name}
            />
          )}
        </>
      )}
    </main>
  );
}

export default AllUploads;

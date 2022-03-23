import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase-config";
import useFb from "../functions/useFb";
import ScrollToTop from "../components/ScrollToTop";
// style
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import {
  breakpointColumnsObj,
  imageVariants,
  transition,
} from "../functions/constants";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";

function ProfilePage() {
  const { formData, defaultAvatar, onChange, onSubmit, onResetAvatar } =
    useFb();
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const [myData, setMyData] = useState({
    postCount: 0,
    myUsername: "",
  });
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalId, setModalId] = useState({
    src: "",
    desc: "",
    name: "",
    time: "",
    tag: "",
    imgRemove: true,
    imgId: null,
  });

  // get personal uploads
  //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  useEffect(() => {
    getMyUploads();
  }, []);

  //*--- Fetch uploads
  const getMyUploads = async () => {
    const q = query(
      collection(db, "uploads"),
      auth.currentUser.uid && where("userRef", "==", auth.currentUser.uid),
      orderBy("timestamp", "desc")
    );
    const uploads = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      uploads.push({
        id: doc.id,
        data: doc.data(),
      })
    );
    setUploads(uploads);
    setMyData((prevstate) => ({
      ...prevstate,
      myUsername: auth.currentUser && auth.currentUser.displayName,
      postCount: uploads && uploads.length,
    }));
    setLoading(false);
  };

  //*--- Log out
  const onLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log(`logged out!`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //*--- Delete image
  const deleteImg = async (id) => {
    const userDoc = doc(db, "uploads", id);
    await deleteDoc(userDoc);
    const updated = uploads.filter((file) => file.id !== id);
    setUploads(updated);
  };

  //*--- Uploads start
  let myUploads = "";
  if (!loading) {
    if (!(uploads.length > 0)) {
      myUploads = ''
    } else {
      myUploads = uploads.map((file) => (
        <motion.img
          className="profile-image"
          style={{ position: "relative" }}
          src={file.data.imageURL[0]}
          key={file.data.imageURL[0]}
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          exit="exit"
          alt={file.data.description}
          onClick={(evt) => {
            // deleteImg(file.id);

            setOpenModal(true);
            setModalId({
              // ...modalId,
              src: file.data.imageURL[0],
              desc: file.data.description,
              name: file.data.name,
              time: JSON.stringify(file.data.timestamp.toDate()),
              tag: [file.data.type],
              imgRemove: true,
              imgId: file.id,
            });
          }}
        />
      ));
    }
  }
  //--- Uploads end

  return (
    <>
      <Toaster />
      <ScrollToTop />
      <motion.main
        id="profile"
        initial="exit"
        animate="enter"
        exit="exit"
        variants={imageVariants}
      >
        <div
          id="avatar"
          style={{
            backgroundImage: `url(${
              auth.currentUser && auth.currentUser.photoURL
                ? auth.currentUser.photoURL
                : defaultAvatar
            })`,
          }}
        />
        <h2>{myData.myUsername}</h2>
        <h2>
          {myData.postCount === 1 ? "1 post" : `${myData.postCount} posts`}
        </h2>

        <div className="edit-details-container">
          <input
            type="text"
            id="username"
            disabled={!changeDetails}
            value={formData.username}
            onChange={onChange}
          />

          <input
            type="url"
            name="photoURL"
            id="photoURL"
            value={formData.photoURL}
            disabled={!changeDetails}
            onChange={onChange}
            placeholder="Upload avatar from url"
            required
          />
          <div className="details-btn-container">
            <button
              className="details-btn"
              onClick={async () => {
                //https://reactjs.org/docs/conditional-rendering.html
                changeDetails && onSubmit();

                await setChangeDetails((bool) => !bool);
                document.querySelector("#username").focus();
              }}
              // async await da bi fokus radio!
            >
              {changeDetails ? "Done" : "Update details"}
            </button>
            <button className="details-btn" onClick={onResetAvatar}>
              Reset avatar
            </button>
          </div>
        </div>

        <Link
          to="/submit"
          style={{
            color: "black",
            textDecoration: "underline",
            fontFamily: "gg-bold-italic",
            margin: "30px 0",
          }}
        >
          <p>Submit an image</p>

          <span style={{ "fontSize": "35px" }}> &#9758; </span>
        </Link>
        <button className="btn logOutButton" onClick={onLogout}>
          Log out
        </button>
      </motion.main>
      <div className="profile-masonry">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {myUploads}
        </Masonry>
      </div>
      {openModal && (
        <Modal
          toggleModal={setOpenModal}
          imgSrc={modalId.src}
          imgDesc={modalId.desc}
          imgTitle={modalId.name}
          imgTimestamp={modalId.time.slice(1, 11).replaceAll("-", "/")}
          imgTag={modalId.tag}
          imgRemove={true}
          onRemove={() => {
            toast.success("Image removed!");
            setOpenModal(false);
            deleteImg(modalId.imgId);
            setMyData({ ...myData, postCount: myData.postCount - 1 });
          }}
        />
      )}
    </>
  );
}

export default ProfilePage;

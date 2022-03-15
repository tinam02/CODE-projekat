import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
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
import Loading from "../components/Loading";
// style
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import {
  breakpointColumnsObj,
  imageVariants,
  transition,
} from "../functions/constants";

function ProfilePage() {
  const { formData, defaultAvatar, onChange, onSubmit, onResetAvatar } =
    useFb();
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
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
      myUploads = <h2 className="profile-no-uploads-text">No uploads yet</h2>;
    } else {
      myUploads = uploads.map((file) => (
        <>
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
              deleteImg(file.id);
            }}
          />
        </>
      ));
    }
  }
  //--- Uploads end

  return (
    <>
      <ScrollToTop/>
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

        <div className="editDetailsDiv">
          <div className="update-details">
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
            <p
              className="detailsText"
              onClick={async () => {
                //https://reactjs.org/docs/conditional-rendering.html
                //true && x je x, a false && x je false
                changeDetails && onSubmit();
                // changeDetails = changeDetails || onSubmit();
                await setChangeDetails((bool) => !bool);
                document.querySelector("#username").focus();
              }}
              // async await da bi fokus radio!
            >
              {changeDetails ? "Done" : "Update details"}
            </p>
            <p className="reset-avatar detailsText" onClick={onResetAvatar}>
              Reset avatar
            </p>
          </div>
        </div>

        <Link to="/submit">
          <p>Submit an image</p>

          <span style={{ "font-size": "35px" }}> &#9758; </span>
        </Link>
        <button className="logOutButton" onClick={onLogout}>
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
    </>
  );
}

export default ProfilePage;

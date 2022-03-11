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
// style
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "../components/ScrollToTop";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import {
  breakpointColumnsObj,
  imageVariants,
  transition,
} from "../functions/constants";
import useFb from "../functions/useFb";

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
    const getMyUploads = async () => {
      const q = query(
        collection(db, "uploads"),
        auth.currentUser.uid && where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const uploads = [];
      querySnapshot.forEach((doc) =>
        uploads.push({
          id: doc.id,
          data: doc.data(),
        })
      );
      // console.log(uploads);
      setUploads(uploads);
      setLoading(false);
    };
    console.log(`object`);
    getMyUploads();
    console.log(`object2`);
  }, []);

  //log out
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

  const deleteImg = async (id) => {
    const userDoc = doc(db, "uploads", id);
    await deleteDoc(userDoc);
    const updated = uploads.filter((file) => file.id !== id);
    setUploads(updated);
  };

  let myUploads = "";
  if (!loading) {
    if (!(uploads.length > 0)) {
      myUploads = <p className="profile-no-uploads">No uploads</p>;
    } else {
      myUploads = uploads.map((file) => (
        <>
          <motion.img
          className="profile-images"
            style={{ position: "relative" }}
            src={file.data.imageURL[0]}
            key={file.data.imageURL[0]}
            initial={{ opacity: 0, y: 200 }}
            variants={imageVariants}
            transition={transition}
            whileInView={{ opacity: 1, y: 0 }}
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

  return (
    <>
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
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
        <button className="logOutButton" onClick={onLogout}>
          Log out
        </button>
      </motion.main>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {myUploads}
      </Masonry>
    </>
  );
}

export default ProfilePage;

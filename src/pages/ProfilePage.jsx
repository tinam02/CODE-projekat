import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
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
  const {
    formData,
    defaultAvatar,
    onLogout,
    onChange,
    onSubmit,
    onResetAvatar,
  } = useFb();
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState(null);
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  // const [changeAvatar, setChangeAvatar] = useState(false);
  // const defaultAvatar =
  //   "https://firebasestorage.googleapis.com/v0/b/projekat1-8acde.appspot.com/o/images%2Favatar.svg?alt=media&token=977b09ec-a3fd-4ee4-96a7-965b629b999";
  // const [formData, setFormData] = useState({
  //   username: auth.currentUser.displayName,
  //   email: auth.currentUser.email,
  //   photoURL: "",
  // });

  // get personal uploads
  //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
  useEffect(() => {
    const getMyUploads = async () => {
      const q = query(
        collection(db, "uploads"),
        where("userRef", "==", auth.currentUser.uid)
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
    getMyUploads();
  }, [auth.currentUser.uid]);

  // const onSubmit = function () {
  //   //https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
  //   updateProfile(auth.currentUser, {
  //     displayName: formData.username,
  //     photoURL:
  //       formData.photoURL === "" || !formData.photoURL
  //         ? defaultAvatar
  //         : formData.photoURL,
  //   })
  //     .then(() => {
  //       // FireStore
  //       // u firestoreu postoji users kolekcija
  //       const userRef = doc(db, "users", auth.currentUser.uid);
  //       updateDoc(userRef, {
  //         username: formData.username,
  //         photoURL:
  //           formData.photoURL === "" || !formData.photoURL
  //             ? defaultAvatar
  //             : formData.photoURL,
  //       });
  //       setChangeAvatar(true);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  //   setChangeAvatar(false);
  // };

  // const onChange = function (evt) {
  //   setFormData({
  //     ...formData,
  //     [evt.target.id]: evt.target.value,
  //   });
  // };

  // const onResetAvatar = function () {
  //   updateProfile(auth.currentUser, {
  //     photoURL: defaultAvatar,
  //   }).then(() => {
  //     const userRef = doc(db, "users", auth.currentUser.uid);
  //     updateDoc(userRef, {
  //       photoURL: defaultAvatar,
  //     });

  //     setFormData({ ...formData, photoURL: "" });
  //   });
  // };
  // delete
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
      <AnimatePresence initial={{ opacity: 0 }} exitBeforeEnter={true}>
        {
          (myUploads = uploads.map((file) => (
            <motion.img
              src={file.data.imageURL[0]}
              key={file.data.imageURL[0]}
              initial={{ opacity: 0, y: 200 }}
              transition={transition}
              whileTap={{ scale: 1.1 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4 }}
              alt={file.data.description}
              onClick={(evt) => {
                deleteImg(file.id);
              }}
            />
          )))
        }
      </AnimatePresence>;
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
        <h1>
          Welcome back,
          {auth.currentUser.displayName
            ? auth.currentUser.displayName
            : "Guest"}
        </h1>
        <div
          id="avatar"
          style={{
            backgroundImage: `url(${
              auth.currentUser.photoURL
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

import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// change details;
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/projekat1-8acde.appspot.com/o/images%2Favatar.svg?alt=media&token=977b09ec-a3fd-4ee4-96a7-965b629b999";
  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
    photoURL: "",
  });

  const onLogout = function () {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = function () {
    //https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
    updateProfile(auth.currentUser, {
      displayName: formData.username,
      photoURL:
        formData.photoURL === "" || !formData.photoURL
          ? defaultAvatar
          : formData.photoURL,
    })
      .then(() => {
        // FireStore
        // u firestoreu postoji users kolekcija
        const userRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(userRef, {
          username: formData.username,
          photoURL:
            formData.photoURL === "" || !formData.photoURL
              ? defaultAvatar
              : formData.photoURL,
        });
        setChangeAvatar(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setChangeAvatar(false);
  };

  const onChange = function (evt) {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  const onResetAvatar = function () {
    updateProfile(auth.currentUser, {
      photoURL: defaultAvatar,
    }).then(() => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      updateDoc(userRef, {
        photoURL: defaultAvatar,
      });
      // setChangeAvatar(true);
      setFormData({ ...formData, photoURL: "" });
    });
    // setChangeAvatar(false);
  };

  return (
    <div id="profile">
      <h1>Welcome back, {auth.currentUser.displayName}</h1>
      <div
        id="avatar"
        style={{
          backgroundImage: `url(${
            auth.currentUser.photoURL
              ? auth.currentUser.photoURL
              : defaultAvatar
          })`,
        }}
      ></div>

      <div className="editDetailsDiv">
        <div className="update-details">
          <input
            type="text"
            id="username"
            disabled={!changeDetails}
            value={formData.username}
            onChange={onChange}
          />
          {/* <input
            type="email"
            id="email"
            disabled={true}
            value={formData.email}
          /> */}
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
    </div>
  );
}

export default ProfilePage;

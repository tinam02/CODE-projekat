import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// change details;
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogout = function () {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = function () {
    if (auth.currentUser.displayName === formData.username) {
      alert("Thats your current username");
    }
    //https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
    updateProfile(auth.currentUser, {
      displayName: formData.username,
    })
      .then(() => {
        // FireStore
        // u firestoreu postoji users kolekcija
        const userRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(userRef, {
          username: formData.username,
          //! ovde moze da se doda field =>
          // test:'test1234'
          // TODO profilna
          // https://firebase.google.com/docs/firestore/manage-data/add-data
          // https://firebase.google.com/docs/reference/js/firestore_
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const onChange = function (evt) {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };
  return (
    <>
      <h1>Welcome back, {auth.currentUser.displayName}</h1>
      <button className="logOutButton" onClick={onLogout}>
        Log out
      </button>
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
        {changeDetails ? "Done" : "Change Details"}
      </p>
      <div className="editDetailsDiv">
        <input
          type="text"
          id="username"
          disabled={!changeDetails}
          value={formData.username}
          onChange={onChange}
        />
        <input type="email" id="email" disabled={true} value={formData.email} />
      </div>

      <Link to="/submit">
        <p>Submit an image</p>
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </>
  );
}

export default ProfilePage;

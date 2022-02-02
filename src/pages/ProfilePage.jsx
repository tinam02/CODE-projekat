import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
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
  const [user, setUser] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { username, email } = formData;

  const onLogout = function () {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = async function () {
    if (auth.currentUser.displayName === username) {
      alert("Thats your current username");
    }
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    // FireStore
    // u firestoreu postoji users kolekcija
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      username: username,
      // https://firebase.google.com/docs/firestore/manage-data/add-data
      // https://firebase.google.com/docs/reference/js/firestore_
    });
  };
  const onChange = function (evt) {
    setFormData((prevstate) => ({
      ...prevstate,
      [evt.target.id]: evt.target.value,
    }));
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
          changeDetails && onSubmit();
          await setChangeDetails((prevstate) => !prevstate);
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
          value={username}
          onChange={onChange}
        />
        <input
          type="email"
          id="email"
          disabled={true}
          value={email}
          onChange={onChange}
        />
      </div>

      <Link to="/submit">
        <p>Submit an image</p>
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </>
  );
}

export default ProfilePage;

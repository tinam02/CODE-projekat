import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//todo regex
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase-config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
//misc
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;
  const onChange = function (evt) {
    setFormData((prevstate) => ({
      ...prevstate,
      [evt.target.id]: evt.target.value,
    }));
  };

  const onSubmit = function (evt) {
    evt.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // user created
        const user = userCredential.user;
        // za username
        updateProfile(auth.currentUser, {
          displayName: username,
         
        })
          .then(() => {
            console.log(`Welcome, ${username}`);
          })
          .catch((err) => {
            console.log(
              "An error occured with the createUserWithEmailAndPassword function" +
                err.message
            );
          });

        const formDataCopy = { ...formData };
        formDataCopy.timestamp = serverTimestamp();
        setDoc(doc(db, "users", user.uid), formDataCopy);
        //dodaje u kolekciju users
        navigate("/");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast.error("Email already in use");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Invalid email");
        } else if (err.code === "auth/weak-password") {
          toast.error("Password should be at least 6 chars");
        } else {
          toast.error("An unknown error has occured");
        }
      });
  };

  return (
    <div>
      <Toaster />
      <h1>SignUpPage</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="unesi user"
          value={username}
          onChange={onChange}
          className="username"
          id="username"
        />
        <input
          type="email"
          placeholder="unesi email"
          value={email}
          onChange={onChange}
          className="email"
          id="email"
        />
        <input
          placeholder="unesi sifru"
          type="password"
          value={password}
          onChange={onChange}
          className="password"
          id="password"
        />

        <div className="signUpDiv">
          <span>Sign up </span>

          <button className="signUpButton">
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              size="2x"
            ></FontAwesomeIcon>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;

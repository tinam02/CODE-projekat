import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//todo regex
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase-config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
//misc
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
    const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    const regUser = /^[a-z\d]{5,12}$/i;
    const auth = getAuth();

    if (regPass.test(password) !== true) {
      toast.error(
        "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter and a number"
      );
    } else if (regUser.test(username) !== true) {
      toast.error("Username needs to have between 5 and 12 characters");
    } else {
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
                `An error occured during registration: ${err.message}`
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
          } else {
            toast.error("An unknown error has occured");
          }
        });
    }
  };

  return (
    <div className="sign-page">
      <Toaster />
      <h1 className="page-h1">Sign Up</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={onChange}
          className="username"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={onChange}
          className="email"
          id="email"
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={onChange}
          className="password"
          id="password"
        />

        <button className="btn sign-up-btn">Submit</button>
      </form>
    </div>
  );
}

export default SignUpPage;

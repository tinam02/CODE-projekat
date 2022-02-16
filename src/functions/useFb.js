import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

const auth = getAuth();
const useFb = () => {
  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
    photoURL: "",
  });
  const navigate = useNavigate();

  //PROFILE
  const [changeAvatar, setChangeAvatar] = useState(false);
  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/projekat1-8acde.appspot.com/o/images%2Favatar.svg?alt=media&token=977b09ec-a3fd-4ee4-96a7-965b629b999";

  //log out
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  //form data
  const onChange = function (evt) {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  //reset avatar
  const onResetAvatar = function () {
    updateProfile(auth.currentUser, {
      photoURL: defaultAvatar,
    }).then(() => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      updateDoc(userRef, {
        photoURL: defaultAvatar,
      });
      setFormData({ ...formData, photoURL: "" });
    });
  };

  //submit
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

  return {
    formData,
    changeAvatar,
    defaultAvatar,
    onLogout,
    onChange,
    onSubmit,
    onResetAvatar,
  };
};
export default useFb;

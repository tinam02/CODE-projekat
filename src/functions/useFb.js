import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import toast from "react-hot-toast";

const useFb = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    username: auth.currentUser ? auth.currentUser.displayName : "",
    email: auth.currentUser ? auth.currentUser.email : "",
    photoURL: "",
  });

  //PROFILE
  const [changeAvatar, setChangeAvatar] = useState(false);
  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/projekat1-8acde.appspot.com/o/images%2Favatar.svg?alt=media&token=977b09ec-a3fd-4ee4-96a7-965b629b999";

  //input
  const onChange = function (evt) {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  //check if image
  const checkURL = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp|jfif)$/);
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
    const regUser = /^[a-z\d]{5,12}$/i;
    if (regUser.test(formData.username) !== true) {
      toast.error("Username must be between 5 and 12 characters!");
      setFormData({ ...formData, username: auth.currentUser.displayName });
    } else {
      updateProfile(auth.currentUser, {
        displayName: formData.username,
        photoURL:
          formData.photoURL === "" ||
          !formData.photoURL ||
          checkURL(formData.photoURL) === null
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
    }

    //https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
  };

  return {
    formData,
    changeAvatar,
    defaultAvatar,
    onChange,
    onSubmit,
    onResetAvatar,
    checkURL,
  };
};
export default useFb;

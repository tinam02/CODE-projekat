import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// AUTH
import { db } from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// STORAGE
// storage za slike https://firebase.google.com/docs/storage/web/upload-files#monitor_upload_progress
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// FORM
// tutorial za form u reactu
// https://dev.to/jleewebdev/using-the-usestate-hook-and-working-with-forms-in-react-js-m6b
function SubmitImage() {
  const auth = getAuth();
  const navigate = useNavigate();

  //TODO add loading state

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "digital",
    imageURL: {},
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid,    timestamp: serverTimestamp() });
        // console => components ima uid od korisnika koji je trenutno ulogovan
        console.log(`Useeffect u submitimage korisnik: ${user.displayName}`);
      } else {
        navigate("/");
      }
    });
  }, []);

  const handleChangeName = (evt) => {
    evt.preventDefault();
    setFormData({ ...formData, name: evt.target.value });
  };
  const handleChangeDesc = (evt) => {
    evt.preventDefault();
    setFormData({ ...formData, description: evt.target.value });
  };
  const handleChangeImg = (evt) => {
    evt.preventDefault();
    setFormData({ ...formData, imageURL: evt.target.files });
  };
  const handleChangeType = (evt) => {
    evt.preventDefault();
    setFormData({ ...formData, type: evt.target.value });
    // * FIXED target.type => target.value
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formData);
    //TODO loading, format name
    //!! storage
    const uploadFormFile = async (file) =>
      new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${Math.floor(
          Math.random() * 10000
        )}-${file.name}`;
        const storageRef = ref(storage, `images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            // eslint-disable-next-line default-case
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (err) => {
            // Handle unsuccessful uploads
            reject(`${err.message}Error on uploadtask`);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
   
    //array of image urls
    const imageURL = await Promise.all(
      [...formData.imageURL].map((file) => uploadFormFile(file))
    ).catch((err) => {
      console.log(`${err.message}Error in imgUrls`);
    });

    // add to  cloud;
    const formDataCopy = {
      ...formData,
      imageURL,
    };
    const docRef = await addDoc(collection(db, "uploads"), formDataCopy);
    console.log("Document written with ID: ", docRef.id);
    console.log("link =>", imageURL[0]);
    navigate(`/`);
  };

  // *FIXED napisala sam auth.currentuser.displayname u value={} i
  //* stranica nije radila nakon refresha zato sto treba malo da se saceka da bi auth proverio da li korisnik postoji,
  //* resenje je da se auth.currentUser stavi u if i da se tek nakon toga njegov displayname upise u variable pa dole u html
  let lockedUsername = "";
  if (auth.currentUser) {
    lockedUsername = auth.currentUser.displayName;
  }

  return (
    <div>
      <h1>Submit image</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Name:
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChangeName}
            required
          />
        </label>
        <label htmlFor="">
          Description:
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChangeDesc}
            required
          />
        </label>
        <label htmlFor="">
          Type
          <input
            type="text"
            id="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChangeType}
          />
        </label>
        <label>
          Images
          <input
            type="file"
            id="images"
            onChange={handleChangeImg}
            required
            multiple="multiple"
          />
        </label>
        <label htmlFor="">
          Username:
          <input value={lockedUsername} disabled />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitImage;

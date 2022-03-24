import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// AUTH
import { db } from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// storage
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { transition } from "../functions/constants";
import useFb from "../functions/useFb";

// FORM
// https://dev.to/jleewebdev/using-the-usestate-hook-and-working-with-forms-in-react-js-m6b
function SubmitImage() {
  const auth = getAuth();
  const { checkURL } = useFb();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "other",
    imageURL: {},
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({
          ...formData,
          userRef: user.uid,
          timestamp: serverTimestamp(),
        });
      } else {
        navigate("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeName = (evt) => {
    evt.preventDefault();
    if (evt.target.value === null) {
      console.log("Value is null");
    }
    setFormData({ ...formData, name: evt.target.value });
  };
  const handleChangeDesc = (evt) => {
    evt.preventDefault();

    setFormData({ ...formData, description: evt.target.value });
  };
  const handleChangeImg = (evt) => {
    evt.preventDefault();
    if (checkURL(evt.target.files[0].name) !== null) {
      setFormData({ ...formData, imageURL: evt.target.files });
    } else {
      toast.error(
        "Invalid extension: " + evt.target.files[0].name.split(".").pop()
      );
    }

    //set preview
    //https://stackoverflow.com/questions/22971580/jquery-append-element-if-it-doesnt-exist-otherwise-replace
    const previewURL = evt.target.files[0];
    let previewImage = document.createElement("img");
    const previewContainer = document.getElementById("image-preview-div");
    previewContainer.append(previewImage);
    previewImage.src = URL.createObjectURL(previewURL);
    if (previewContainer.hasChildNodes) {
      if (previewContainer.childNodes.length > 1)
        previewContainer.removeChild(previewContainer.firstChild);
    }
  };
  const handleChangeType = (evt) => {
    evt.preventDefault();
    setFormData({ ...formData, type: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    //* storage
    const uploadFormFile = async (file) =>
      new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${Math.floor(
          Math.random() * 1000000
        )}-${file.name}`;
        const storageRef = ref(storage, `images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // eslint-disable-next-line default-case
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log(`Upload is running`);
                break;
            }
          },
          (err) => {
            // Handle unsuccessful uploads
            reject(`${err.message}Error on uploadtask`);
          },
          () => {
            // Handle successful uploads
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              resolve(downloadURL);
            });
          }
        );
        toast.promise(uploadTask, {
          loading: `Upload is ${uploadTask.snapshot.state}`,
          success: "Uploaded successfully",
          error: "Upload failed",
        });
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
  // let lockedUsername = "";
  // if (auth.currentUser) {
  //   lockedUsername = auth.currentUser.displayName;
  // }
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { x: "-10%", opacity: 0 },
    show: { x: 0, opacity: 1, transition },
  };
  return (
    <>
      <Toaster />
      <h1 className="page-h1">Submit image</h1>
      <motion.div
        id="submit-image-div"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <form className="submit-form" onSubmit={handleSubmit}>
          <motion.ul variants={container} initial="hidden" animate="show">
            <motion.li variants={item}>
              <label htmlFor="name">
                title
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChangeName}
                  maxLength={30}
                  required
                />
              </label>
            </motion.li>
            <motion.li variants={item}>
              <label htmlFor="description">
                description
                <textarea
                  rows="4"
                  cols="50"
                  maxLength={300}
                  type="text"
                  id="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChangeDesc}
                  required
                />
              </label>
            </motion.li>
            <motion.li variants={item}>
              <div className="tag-input-container">
                <span className="tag-input-prefix">#</span>
                <input
                  className="tag-input"
                  type="text"
                  id="type"
                  placeholder="Type"
                  maxLength={18}
                  value={formData.type.toLowerCase()}
                  onChange={handleChangeType}
                />
              </div>
            </motion.li>
            <motion.li variants={item}>
              {" "}
              <label htmlFor="images">
                image
                <input
                  type="file"
                  id="images"
                  onChange={handleChangeImg}
                  required
                  multiple={false}
                />
              </label>
            </motion.li>
          </motion.ul>
          <button className="btn submit-image-btn" type="submit">
            submit
          </button>
        </form>
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          id="image-preview-div"
        ></motion.div>
      </motion.div>
    </>
  );
}

export default SubmitImage;

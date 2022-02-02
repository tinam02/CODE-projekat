import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// usenavigate umesto usehistory jer vise ne postoji

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
    images: {},
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid });
        // console => components ima uid od korisnika koji je trenutno ulogovan
        console.log(`Useeffect u submitimage korisnik: `+ user.displayName);
      } else {
        navigate("/");
      }
    });
  }, []);

  const handleChangeName = (e) => {
    e.preventDefault();
    setFormData({ ...formData, name: e.target.value });
  };
  const handleChangeDesc = (e) => {
    e.preventDefault();
    setFormData({ ...formData, description: e.target.value });
  };
  const handleChangeImg = (e) => {
    e.preventDefault();
    setFormData({ ...formData, images: e.target.files });
  };
  const handleChangeType = (e) => {
    e.preventDefault();
    setFormData({ ...formData, type: e.target.type });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
          ></input>
        </label>
        <label htmlFor="">
          Type
          <input
            type="text"
            id="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChangeType}
          ></input>
        </label>
        <label>
          Images
          <input type="file" id="images" onChange={handleChangeImg} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitImage;

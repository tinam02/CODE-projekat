import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//sign in;
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// misc
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";


//https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChange = function (evt) {
    setFormData((prevstate) => ({
      ...prevstate,
      [evt.target.id]: evt.target.value,
    }));
  };
  const onSubmit = async function (evt) {
    evt.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          toast.error("Wrong password");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Invalid email");
        } else if (err.code === "auth/user-not-found") {
          toast.error("User not found");
        } else if (err.code === "auth/too-many-requests") {
          toast.error("Too many requests. Try again later");
        } else {
          toast.error("An unknown error has occured");
        }
      });
  };

  return (
    <div>
      <Toaster />
      <h1>SignInPage</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="unesi email"
          value={formData.email}
          onChange={onChange}
          className="email"
          id="email"
        />
        <input
          placeholder="unesi sifru"
          type="password"
          value={formData.password}
          onChange={onChange}
          className="password"
          id="password"
        />

        <div className="signInDiv">
          <span>Sign in </span>

          <button className="signInButton">
            <FontAwesomeIcon icon={faArrowCircleRight} size="2x" />
          </button>
        </div>
        <Link to={"/forgotpass"}>Forgot password?</Link>
      </form>
    </div>
  );
}

export default SignInPage;

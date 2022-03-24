import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//sign in;
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// misc
import {motion} from "framer-motion";
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
    <motion.div className="sign-in-container sign-page"    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
      <Toaster />
      <h1 className="page-h1">Sign In</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          onChange={onChange}
          className="email"
          id="email"
        />
        <input
          placeholder="password"
          type="password"
          value={formData.password}
          onChange={onChange}
          className="password"
          id="password"
        />{" "}
        <Link to={"/forgotpass"} className="forgot-pass-link">
          Forgot your password?
        </Link>
       
        <button className="btn sign-in-btn">Sign in</button>
      </form>
    </motion.div>
  );
}

export default SignInPage;

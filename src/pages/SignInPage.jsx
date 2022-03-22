import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//sign in;
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// misc
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
    <div className="sign-in-container">
      <Toaster />
      <h1>Sign In</h1>
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
        />
        <button className="btn sign-in-btn">Sign in</button>

        <Link to={"/forgotpass"}>Forgot your password?</Link>
      </form>
    </div>
  );
}

export default SignInPage;

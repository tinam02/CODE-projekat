import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
//alerts
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const onChange = function (evt) {
    setEmail(evt.target.value);
  };
  const onSubmit = async function (evt) {
    evt.preventDefault();

    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#sendpasswordresetemail
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(function () {
        toast.success("An email has been sent!");
      })
      .catch(function (err) {
        if (err.code === "auth/invalid-email") {
          toast.error("Invalid email");
        } else if (err.code === "auth/user-not-found") {
          toast.error("User not found");
        } else {
          toast.error(`Failed`);
        }
      });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Toaster />
      <h1 className="page-h1">Reset password</h1>
      <main className="sign-page">
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={onChange}
          />

          <Link to="/signin" className="forgot-pass-link">
            Sign in instead
          </Link>

          <button>Send Reset Email</button>
        </form>
      </main>
    </motion.div>
  );
}

export default ForgotPasswordPage;

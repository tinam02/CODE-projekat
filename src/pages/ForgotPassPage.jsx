import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
//alerts
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
    <div>
      <Toaster />
      <h1>Reset password</h1>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={onChange}
          />
          <p>
            Back to <Link to="/signin">Sign in</Link>
          </p>
          <button>Send Reset Email</button>
        </form>
      </main>
    </div>
  );
}

export default ForgotPasswordPage;

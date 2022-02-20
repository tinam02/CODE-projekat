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
      <h1>ForgotPasswordPage</h1>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            value={email}
            onChange={onChange}
          />
          <Link to="/signin">Sign in</Link>

          <div>
            <p>Send reset email</p>
            <button>Send</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPasswordPage;

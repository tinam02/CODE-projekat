import React from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        alert("sent");
      })
      .catch(function (err) {
        if (err.code === "auth/invalid-email") {
          alert("Invalid email");
        } else if (err.code === "auth/user-not-found") {
          alert("User not found");
        } else {
          alert(`Failed`);
        }
      });
  };

  return (
    <div>
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

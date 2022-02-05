import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserCircle,
  faLock,
  faSignInAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [loggedin, setLoggedIn] = useState(false);

  const navIconActive = function (path) {
    if (path == location.pathname) {
      return true;
    }
  };
  const auth = getAuth();
  let user = "";
  if (auth.currentUser) {
    user = auth.currentUser;
  }
  return (
    <div className="nav">
      <ul className="nav-ul">
        {/* --Ne prikazuj sign in i sign up ako je pathname /profile --
        samo ulogovani korisnici mogu da udju na /profile,
        pa nema potrebe da vide linkove za sign in i sign up u navbaru */}
        {/* {location.pathname === "/profile" ? null : (
          <li className="nav-item" onClick={() => navigate("/signup")}>
            <FontAwesomeIcon
              icon={faLock}
              size="3x"
              color={navIconActive("/signup") ? "green" : "#fff"}
            ></FontAwesomeIcon>
            Sign Up
          </li>
        )} */}
        {/* {location.pathname !== "/profile" ? (
          <li className="nav-item" onClick={() => navigate("/signin")}>
            <FontAwesomeIcon
              icon={faSignInAlt}
              size="3x"
              color={navIconActive("/signin") ? "green" : "#fff"}
            ></FontAwesomeIcon>
            Sign In
          </li>
        ) : null} */}

        {/* Ako korisnik nije ulogovan, prikazi sign in i sign up i ne prikazuj link za upload slike */}
        {!user ? null : (
          <li className="nav-item" onClick={() => navigate("/submit")}>
            <FontAwesomeIcon
              icon={faPlus}
              size="3x"
              color={navIconActive("/submit") ? "green" : "#fff"}
            ></FontAwesomeIcon>
            Submit an image
          </li>
        )}
        {!user ? (
          <li className="nav-item" onClick={() => navigate("/signin")}>
            <FontAwesomeIcon
              icon={faSignInAlt}
              size="3x"
              color={navIconActive("/signin") ? "green" : "#fff"}
            ></FontAwesomeIcon>
            Sign In
          </li>
        ) : null}

        {!user ? (
          <li className="nav-item" onClick={() => navigate("/signup")}>
            <FontAwesomeIcon
              icon={faLock}
              size="3x"
              color={navIconActive("/signup") ? "green" : "#fff"}
            ></FontAwesomeIcon>
            Sign Up
          </li>
        ) : null}

        <li className="nav-item" onClick={() => navigate("/")}>
          <FontAwesomeIcon
            icon={faHome}
            size="3x"
            color={navIconActive("/") ? "green" : "#fff"}
          ></FontAwesomeIcon>
          Home
        </li>
        <li className="navbar-item" onClick={() => navigate("/profile")}>
          <FontAwesomeIcon
            icon={faUserCircle}
            size="3x"
            color={navIconActive("/profile") ? "green" : "#fff"}
          ></FontAwesomeIcon>
          Profile
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

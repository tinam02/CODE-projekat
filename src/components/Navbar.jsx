import React, { useState, useEffect } from "react";
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
// misc
import logo from "../assets/logo.svg";
import hamburger from "../assets/hamburger.svg";
import hamburgerclose from "../assets/hamburgerclose.svg";

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

  useEffect(() => {
    console.log("using effect");
    handleContentLoaded();
  }, []);
  const handleContentLoaded = () => {
    // style
    const nav = document.querySelector(".primary-navigation");
    const navToggle = document.querySelector(".mobile-nav-toggle");

    //1
    if (navToggle && nav) {
      navToggle.addEventListener("click", () => {
        //if closed open it

        const visibility = nav.getAttribute("data-visible");
        if (visibility === "false") {
          nav.setAttribute("data-visible", true);
          navToggle.setAttribute("aria-expanded", true);
        } else {
          nav.setAttribute("data-visible", false);
          navToggle.setAttribute("aria-expanded", false);
        }
        console.log(visibility);
      });
    }
  };

  return (
    <header className="primary-header flex">
      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>

      <button
        className="mobile-nav-toggle"
        aria-controls="primary-navigation"
      ></button>
      <nav>
        <ul
          data-visible="false"
          className="primary-navigation underline-indicators flex"
        >
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
            <li className="nav-item active" onClick={() => navigate("/submit")}>
              <FontAwesomeIcon
                className="a"
                icon={faPlus}
                size="2x"
                color={navIconActive("/submit") ? "#fff" : "rgba(255, 255, 255, 0.5)"}
              ></FontAwesomeIcon>
              <span aria-hidden="true"> Submit</span>
            </li>
          )}

          {!user ? (
            <li className="nav-item active" onClick={() => navigate("/signin")}>
              <FontAwesomeIcon
                className="a"
                icon={faSignInAlt}
                size="2x"
                color={navIconActive("/signin") ? "#fff" : "rgba(255, 255, 255, 0.5)"}
              ></FontAwesomeIcon>
              <span aria-hidden="true"> Sign In </span>
            </li>
          ) : null}

          {!user ? (
            <li className="nav-item active" onClick={() => navigate("/signup")}>
              <FontAwesomeIcon
                className="a"
                icon={faLock}
                size="2x"
                color={navIconActive("/signup") ? "#fff" : "rgba(255, 255, 255, 0.5)"}
              ></FontAwesomeIcon>
              <span aria-hidden="true"> Sign up </span>
            </li>
          ) : null}

          <li className="nav-item active" onClick={() => navigate("/")}>
            <FontAwesomeIcon
              className="a"
              icon={faHome}
              size="2x"
              color={navIconActive("/") ? "#fff" : "rgba(255, 255, 255, 0.5)"}
            ></FontAwesomeIcon>
            <span aria-hidden="true"> Home </span>
          </li>

          <li
            className="navbar-item active"
            onClick={() => navigate("/profile")}
          >
            <FontAwesomeIcon
              className="a"
              icon={faUserCircle}
              size="2x"
              color={navIconActive("/profile") ? "#fff" : "rgba(255, 255, 255, 0.5)"}
            ></FontAwesomeIcon>
            <span aria-hidden="true">Profile</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

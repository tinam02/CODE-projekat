import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
// misc
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserCircle,
  faLock,
  faSignInAlt,
  faPlus,
  faAtom,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo2.svg";
import hamburger from "../assets/hamburger.svg";
import hamburgerclose from "../assets/hamburgerclose.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navIconActive = function (path) {
    if (path === location.pathname) {
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
    const nav = document.querySelector(".primary-navigation");
    const navToggle = document.querySelector(".mobile-nav-toggle");

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
      });
    }
  };

  return (
    <header className="primary-header">
      <div>
        <img src={logo} alt="logo" className="logo rotating" />
      </div>

      <button
        className="mobile-nav-toggle"
        aria-controls="primary-navigation"
      />
      <nav>
        <ul
          data-visible="false"
          className="primary-navigation underline-indicators flex"
        >
          {/* Ako korisnik nije ulogovan, prikazi sign in i sign up i ne prikazuj link za upload slike */}
          {!user ? null : (
            <li className="nav-item" onClick={() => navigate("/submit")}>
              <FontAwesomeIcon
                className="a"
                icon={faPlus}
                size="1x"
                color={
                  navIconActive("/submit") ? "#fff" : "rgba(255, 255, 255, 0.5)"
                }
              />
              <span className="navbar-span" aria-hidden="true">
                {" "}
                Submit
              </span>
            </li>
          )}

          {!user ? (
            <li className="nav-item " onClick={() => navigate("/signin")}>
              <FontAwesomeIcon
                className="a"
                icon={faSignInAlt}
                size="1x"
                color={
                  navIconActive("/signin") ? "#fff" : "rgba(255, 255, 255, 0.5)"
                }
              />
              <span className="navbar-span" aria-hidden="true">
                Sign In
              </span>
            </li>
          ) : null}

          {!user ? (
            <li className="nav-item" onClick={() => navigate("/signup")}>
              <FontAwesomeIcon
                className="a"
                icon={faLock}
                size="1x"
                color={
                  navIconActive("/signup") ? "#fff" : "rgba(255, 255, 255, 0.5)"
                }
              />
              <span className="navbar-span" aria-hidden="true">
                Sign up
              </span>
            </li>
          ) : null}

          <li className="nav-item " onClick={() => navigate("/")}>
            <FontAwesomeIcon
              className="a"
              icon={faAtom}
              size="1x"
              color={navIconActive("/") ? "#fff" : "rgba(255, 255, 255, 0.5)"}
            />
            <span className="navbar-span" aria-hidden="true" >
              Explore
            </span>
          </li>

          <li className="nav-item " onClick={() => navigate("/profile")}>
            <FontAwesomeIcon
              className="a"
              icon={faUserCircle}
              size="1x"
              color={
                navIconActive("/profile") ? "#fff" : "rgba(255, 255, 255, 0.5)"
              }
            />
            <span className="navbar-span" aria-hidden="true">
              Profile
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

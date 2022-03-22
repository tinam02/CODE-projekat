import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
// misc
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
  //  navIconActive("/signup") ? "#fff" : "rgba(255, 255, 255, 0.5)"
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
      ></button>
      <nav>
        <ul
          data-visible="false"
          className="primary-navigation underline-indicators flex"
        >
          {/* Ako korisnik nije ulogovan, prikazi sign in i sign up i ne prikazuj link za upload slike */}
          {!user ? null : (
            <li className="nav-item" onClick={() => navigate("/submit")}>
              <span
                style={{
                  fontSize: "25px",
                  opacity: navIconActive("/submit") ? "1" : "0.5",
                }}
              >
                &#10133;
              </span>
              <span className="navbar-span" aria-hidden="true">
                Submit
              </span>
            </li>
          )}

          {!user ? (
            <li className="nav-item " onClick={() => navigate("/signin")}>
              <span
                style={{
                  fontSize: "25px",
                  opacity: navIconActive("/signin") ? "1" : "0.5",
                }}
              >
                &#x1f511;
              </span>
              <span className="navbar-span" aria-hidden="true">
                Sign In
              </span>
            </li>
          ) : null}

          {!user ? (
            <li className="nav-item" onClick={() => navigate("/signup")}>
              <span
                style={{
                  fontSize: "25px",
                  opacity: navIconActive("/signup") ? "1" : "0.5",
                }}
              >
                &#128274;
              </span>
              <span className="navbar-span" aria-hidden="true">
                Sign up
              </span>
            </li>
          ) : null}

          <li className="nav-item " onClick={() => navigate("/")}>
            <span
              style={{
                fontSize: "25px",
                opacity: navIconActive("/") ? "1" : "0.5",
              }}
            >
              &#127758;
            </span>
            <span className="navbar-span" aria-hidden="true">
              Explore
            </span>
          </li>

          <li className="nav-item " onClick={() => navigate("/profile")}>
            <span
              style={{
                fontSize: "25px",
                opacity: navIconActive("/profile") ? "1" : "0.5",
              }}
            >
              &#128566;
            </span>
            <span className="navbar-span" aria-hidden="true">
              Profile
            </span>
          </li>
        </ul>
      </nav>

      <div>
        <img src={logo} alt="logo" className="logo rotating" />
      </div>
    </header>
  );
}

export default Navbar;

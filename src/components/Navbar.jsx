import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserCircle,
  faLock,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navIconActive = function (path) {
    if (path == location.pathname) {
      return true;
    }
  };
  return (
    <div className="nav">
      <ul className="nav-ul">
        <li className="nav-item" onClick={() => navigate("/signup")}>
          <FontAwesomeIcon
            icon={faLock}
            size="3x"
            color={navIconActive("/signup") ? "green" : "#fff"}
          ></FontAwesomeIcon>
          Sign Up
        </li>
        <li className="nav-item" onClick={() => navigate("/signin")}>
          <FontAwesomeIcon
            icon={faSignInAlt}
            size="3x"
            color={navIconActive("/signin") ? "green" : "#fff"}
          ></FontAwesomeIcon>
          Sign In
        </li>
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

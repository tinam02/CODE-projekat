import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faPaintBrush,
  faTablet,
} from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  return (
    <div>
      <header>
        <h2>Explore</h2>
      </header>
      <main>
        <p>Filtered content</p>
        <div></div>
        <Link to="/filtered/digital">
          {" "}
          <FontAwesomeIcon icon={faTablet} size="3x"></FontAwesomeIcon>
          <p>Digital</p>
        </Link>
        <Link to="/filtered/photography">
          {" "}
          <FontAwesomeIcon icon={faPaintBrush} size="3x"></FontAwesomeIcon>
          <p>traditional</p>
        </Link>
      </main>
    </div>
  );
}

export default HomePage;

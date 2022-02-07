import React from "react";
import {useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faPaintBrush,
  faTablet,
} from "@fortawesome/free-solid-svg-icons";
import AllUploads from '../functions/fetchAllUploads'

function HomePage() {

  return (
    <div>
      <header>
        <h2>Home</h2>
      </header>
      <main>
        {/* slider? */}
        {/* <Link to="/filtered/digital">
          {" "}
          <FontAwesomeIcon icon={faTablet} size="3x"></FontAwesomeIcon>
          <p>Digital</p>
        </Link>
        <Link to="/filtered/photography">
          {" "}
          <FontAwesomeIcon icon={faPaintBrush} size="3x"></FontAwesomeIcon>
          <p>neki tag</p>
        </Link> */}

           {/* sve slike */}
           <AllUploads/>
      </main>
    </div>
  );
}

export default HomePage;

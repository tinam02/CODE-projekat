import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faPaintBrush,
  faTablet,
} from "@fortawesome/free-solid-svg-icons";
import AllUploads from "../functions/fetchAllUploads";
import ScrollToTop from "../components/ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
function HomePage() {
  const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };
  return (
    <motion.div 
      transition={transition}
      animate={{ opacity: 1,  }}
      exit={{ opacity: 0 }}
    
    >
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
        <AllUploads />
      </main>
      <ScrollToTop />
    </motion.div>
  );
}

export default HomePage;

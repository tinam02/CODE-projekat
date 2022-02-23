import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faPaintBrush,
  faTablet,
} from "@fortawesome/free-solid-svg-icons";
import AllUploads from "../functions/fetchAllUploads";
import ScrollToTop from "../components/ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/HomePage.css";
function HomePage() {
  return (
    <main id="homepage-main">
      <header className="homepage-header">
        <h1 className="homepage-title">GALLERY</h1>
        <h2>Latest tags</h2>
      </header>

      <div>
        {/* slider? */}

        {/* sve slike */}
        <AllUploads />
      </div>
      <ScrollToTop />
    </main>
  );
}

export default HomePage;

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

function HomePage() {
  return (
    <main id="homepage-main">
      <header className="homepage-header">
        <h1 className="homepage-title">
          <span className="accent-span">G</span>ALLERY
        </h1>
        <hr />
        <hr /><hr />
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

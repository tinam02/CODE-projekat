import React from "react";
import AllUploads from "../functions/fetchAllUploads";
import ScrollToTop from "../components/ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import RandomFont from "../components/RandomFont";

function HomePage() {
  return (
    <main id="homepage-main">
      <header className="homepage-header">
        <span className="homepage-title">
          <RandomFont text="GALLERY" />
        </span>
      </header>

      <div>
        {/* sve slike iz fetchalluploads */}
        <AllUploads />
      </div>
      <ScrollToTop />
    </main>
  );
}

export default HomePage;

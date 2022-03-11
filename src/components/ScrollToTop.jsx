import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTop() {
  const [isVisible, setVisibility] = useState();

  const toggleVisibility = () => {
    if (document.querySelector("body").classList.contains("body-openModal")) {
      setVisibility(false);
    }
    if (
      window.pageYOffset > 300 &&
      !document.querySelector("body").classList.contains("body-openModal")
    ) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
    // removes scroll button when modal is open
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    //clean up on unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top-button">
      <button
        className={
          isVisible
            ? "scroll-to-top-button_visible"
            : "scroll-to-top-button_hidden"
        }
        type="button"
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faArrowUp} size="2x" color="#000" />
      </button>
    </div>
  );
}

export default ScrollToTop;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTop() {
  const [isVisible, setVisibility] = useState();

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
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

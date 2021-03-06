import React, { useState, useEffect } from "react";

function ScrollToTop() {
  const [isVisible, setVisibility] = useState();

  // removes scroll button when modal is open
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
        &#128285;
      </button>
    </div>
  );
}

export default ScrollToTop;

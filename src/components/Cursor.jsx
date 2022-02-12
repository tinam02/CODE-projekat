import React, { useEffect } from "react";

function Cursor() {
  useEffect(() => {
    const cursor = document.querySelector(".customCursor");
    const custom = () => {
      document.addEventListener("mousemove", (e) => {
        cursor.style.display = "block";
        cursor.style.top = `${e.clientY - 10}px`;
        cursor.style.left = `${e.clientX - 10}px`;
      });
      document.addEventListener("click", (e) => {
        cursor.style.animation = "animHover 0.3s forwards";
        setTimeout(() => {
          cursor.style.animation = "animIdle 0.3s forwards";
        }, 300);
      });
      document.addEventListener("mouseleave", function (event) {
        cursor.style.display = "none";
      });
    };
    custom();
  }, []);
  return <div className="customCursor"></div>;
}

export default Cursor;

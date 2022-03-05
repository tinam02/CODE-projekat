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
      document.addEventListener("mouseover", function (event) {
        if (event.target.tagName.toLowerCase() === "a") {
          cursor.style.animation = "animHover 0.3s forwards";
        }
      });
      document.addEventListener("mouseout", function (event) {
        if (event.target.tagName.toLowerCase() === "a") {
          cursor.style.animation = "animIdle 0.3s forwards";
        }
      });
      console.log(`cus`);
    };
    console.log(`object`);
    custom();
  }, []);
  return (
    <div className="customCursor">
      {/* <div id="customCursor-span"></div> */}
    </div>
  );
}

export default Cursor;

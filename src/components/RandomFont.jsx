import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { transition } from "../functions/constants.js";

function RandomFont(params) {
  useEffect(() => {
    const getFont = () => {
      let fontsArr = ["lynojean", "lynostan", "lynowalt", "lynoulys"];
      var randomNumber = Math.floor(Math.random() * fontsArr.length);
      let fontName = fontsArr[randomNumber];
      return fontName;
    };
    const changeFonts = () => {
      let x = document.getElementById("demo");
      // ovde se koristi textcontent jer innerhtml i innertext dodaju  i html tagove!!
      let txt = x.textContent;
      let newText = "";
      const randomizeEachLetter = () => {
        for (let i = 0; i < txt.length; i++) {
          newText += `<span key={${i}} style="font-family:'${getFont()}'">${txt.charAt(
            i
          )}</span>`;
        }
      };
      randomizeEachLetter();
      x.innerHTML = newText;
    };
    changeFonts();
  }, []);

  return (
    <motion.h1
      id="demo"
      initial={{ y: -200, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: "-70%", opacity: 0 }}
      transition={transition}
    >
      {params.text}
    </motion.h1>
  );
}

export default RandomFont;

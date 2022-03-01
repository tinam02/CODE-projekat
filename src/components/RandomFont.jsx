import React, { useEffect } from "react";

function RandomFont(params) {
  useEffect(() => {
    const text = document.querySelector("h1");
    const getFont = () => {
      let fontsArr = ["lynojean", "lynostan", "lynowalt", "lynoulys"];
      var randomNumber = Math.floor(Math.random() * fontsArr.length);
      let fontName = fontsArr[randomNumber];
      return fontName;
    };
    const changeFonts = () => {
      let x = document.getElementById("demo");
      let txt = x.innerHTML;
      let newText = "";
      const forFonts = () => {
        let l = txt.length;
        for (let i = 0; i < l; i++) {
          newText += `<span style="font-family:'${getFont()}'">${txt.charAt(
            i
          )}</span>`;
          console.log("a");
        }
      };
      forFonts();
      x.innerHTML = newText;
    };
    changeFonts();
  }, []);

  return <h1 id="demo">{params.text}</h1>;
}

export default RandomFont;

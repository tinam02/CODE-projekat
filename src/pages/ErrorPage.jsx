import React from "react";
import { Link } from "react-router-dom";import RandomFont from "../components/RandomFont";
function ErrorPage() {
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "rgba(0,0,0,1)",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          zIndex: 10,
          color: "rgba(255,255,255,1)",
        }}
      >
        <h1
          style={{
            fontSize: "10rem",
            color: "rgba(255,255,255,1)",
          }}
        >
          <RandomFont text="404"/>
        </h1>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          this page does not exist!
          <Link style={{ color: "white", padding: "3rem" }} to="/">
            &#10036; click to go back &#10036;
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default ErrorPage;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
//outlet renders child elem;
import { useAuthStatus } from "../functions/useAuthStatus.js";

const PrivRoute = () => {
  const {loggedIn,statusToggle} = useAuthStatus();

  if(statusToggle) {
      return <h3>Loading</h3>
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivRoute;

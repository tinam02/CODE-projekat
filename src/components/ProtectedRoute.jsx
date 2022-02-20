import React from "react";
import { Outlet, Navigate } from "react-router-dom";
//outlet renders child elem;
import { useAuthStatus } from "../functions/useAuthStatus.js";
import Loading from "./Loading";

const ProtectedRoute = () => {
  const { loggedIn, statusToggle } = useAuthStatus();

  if (statusToggle) {
    return <Loading/>;
  }

  return !loggedIn ? <Navigate to="/signin" /> : <Outlet />;
};

export default ProtectedRoute;

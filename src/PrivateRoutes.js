import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoutes({ children }) {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const location = useLocation();
  return userData ? (
    children
  ) : (
    <Navigate
      replace
      to={{
        pathname: "/login",
        search: `?next=${location.pathname}`,
      }}
    />
  );
}
export default PrivateRoutes;

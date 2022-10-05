import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";

function PrivateRoutes({ children }) {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const location = useLocation();
  return user_data?.access ? (
    children
  ) : (
    <Navigate
      replace
      to={{
        pathname: "login",
        search: `?next=${location.pathname}`,
      }}
    />
  );
}
export default PrivateRoutes;

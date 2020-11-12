import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router";
import AppShell from "../AppShell";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() =>
        authContext.isAuthenticated() && authContext.isAdmin() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;

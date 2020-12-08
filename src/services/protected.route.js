import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth.service";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  console.log("is user authinticated: " + auth.isAuthenticated())
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
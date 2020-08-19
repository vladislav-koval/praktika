import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthorized } from "../../services/AuthServise";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthorized()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
);
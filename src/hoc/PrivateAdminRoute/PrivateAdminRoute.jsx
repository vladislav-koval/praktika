import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthorized } from "../../services/AuthServise";
import Cookies from "js-cookie";
import { ADMIN, ROLE } from "../../services/ApiConstants";

export const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthorized() && Cookies.get(ROLE) === ADMIN
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
);
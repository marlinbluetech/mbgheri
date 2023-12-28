// PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      path={path}
      element={authenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;

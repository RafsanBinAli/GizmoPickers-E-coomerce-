import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteAuthenticated = ({isAuthenticated}) => {
    const auth = isAuthenticated

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
   
    return auth ? <Outlet />  : <Navigate to="/user/login" />;
}
const PrivateRouteUnauthenticated = ({isAuthenticated}) => {
    const auth = isAuthenticated

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
   
    return auth ? <Outlet />  : <Navigate to="/" />;
}

export { PrivateRouteAuthenticated, PrivateRouteUnauthenticated };
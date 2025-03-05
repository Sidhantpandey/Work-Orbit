import React, { useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginForm from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Project from '../screens/Project';
import RefreshHandler from '../RefreshHandler';
import Link from '../screens/Link'
import UpdateProfile from "../screens/UpdateProfile"
import ResetPassword from "../screens/ResetPassword"

const AppRoutes = () => {
  const [authenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Private Route Handler
  const PrivateRouting = ({ element }) => {
    return authenticated ? element : <Navigate to="/login" />;
  };

  // Public Route Handler (Prevent logged-in users from accessing login/register)
  const PublicRouting = ({ element }) => {
    return authenticated ? <Navigate to="/" /> : element;
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<PrivateRouting element={<Home />} />} />
        <Route path="/login" element={<PublicRouting element={<LoginForm />} />} />
        <Route path="/register" element={<PublicRouting element={<Register />} />} />
        <Route path="/reset-password" element={<PublicRouting element={<ResetPassword />} />} />
        <Route path="/project" element={<PrivateRouting element={<Project />} />} />
        <Route path="/update" element={<UpdateProfile/>}/>

        <Route path="*" element={<Link/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

import React, { useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import LoginForm from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Project from '../screens/Project';
import RefreshHandler from '../RefreshHandler';

const AppRoutes = () => {
  const [authenticated, setIsAuthenticated] = useState(false);

  // Private Route Handler
  const PrivateRouting = ({ element }) => {
    return authenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<PrivateRouting element={<Home />} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project" element={<PrivateRouting element={<Project />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

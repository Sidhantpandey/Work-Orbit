import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r bg-white text-center px-6">
      <h1 className="text-6xl font-extrabold text-red-600 drop-shadow-lg animate-bounce">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mt-2 max-w-lg">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex space-x-4">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
       
      </div>

      <div className="absolute bottom-10 text-gray-500 text-sm">
        Need help? <Link to="/faq" className="text-blue-500 hover:underline">Visit our FAQ</Link>
      </div>
    </div>
  );
};

export default NotFound;

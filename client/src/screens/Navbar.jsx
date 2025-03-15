import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-teal-50 text-center text-sm py-2 text-gray-700 border-b border-blue-200">
        <strong>Lorem ipsum dolor sit amet.®</strong> is now generally available. A new era for AI <a href="#" className="underline hover:text-blue-600">Try it now</a>.
      </div>

      {/* Main Navbar */}
      <nav className="flex justify-between items-center px-6 sm:px-10 py-4 border-b bg-white shadow-sm">
        {/* Logo + Brand */}
        <div className="flex items-center  gap-2">
          <img src="https://imgs.search.brave.com/wJFYQ4i4bT3U2cFcgg0BnpvZ0N-hwGHACdezL7ZABbs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzAxLzQ4Lzc1/LzM2MF9GXzYwMTQ4/NzU1NV8yY1JWMkVI/NmZQUHZzT3I1ZnJw/WmxWRllnbzRnVUFr/SS5qcGc" alt="Logo" className="h-9 w-auto" />
          <span className="text-lg font-semibold text-gray-900">AI Gen </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium text-gray-800">
          <Link to="#">Products </Link>
          <Link to="#">Pricing</Link>
          <Link to="#">Resources </Link>
          <Link to="#">Docs</Link>
          <Link to="#" className="text-indigo-600">Blog</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Sidhantpandey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2  text-gray-800 hover:text-black"
          >
            <FaGithub size={18} />
            <span>Git hub </span>
          </a>
          <Link
            to="/login"
            className="px-4 py-1.5 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 text-sm"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

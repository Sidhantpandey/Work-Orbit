import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-[#e0f7fa] to-[#b2ebf2] text-center text-sm py-2 text-[#004d40] border-b border-teal-300">
        <strong>Lorem ipsum dolor sit amet.®</strong> is now generally available. A new era for AI{" "}
        <a href="#" className="underline hover:text-[#00796b]">Try it now</a>
      </div>

      {/* Main Navbar */}
      <nav className="flex justify-between items-center px-6 sm:px-12 py-4 border-b border-gray-200 bg-white shadow-md">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img
            src="https://imgs.search.brave.com/wJFYQ4i4bT3U2cFcgg0BnpvZ0N-hwGHACdezL7ZABbs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzAxLzQ4Lzc1/LzM2MF9GXzYwMTQ4/NzU1NV8yY1JWMkVI/NmZQUHZzT3I1ZnJw/WmxWRllnbzRnVUFr/SS5qcGc"
            alt="Logo"
            className="h-8 w-auto rounded-md"
          />
          <span className="text-lg font-semibold text-gray-800">AI Gen</span>
        </div>

        {/* Center Nav Links (Pill style) */}
        <div className="hidden md:flex items-center bg-gray-100 px-6 py-2 rounded-full text-lg font-semibold text-gray-700 shadow-inner">
          <Link to="#" className="px-4 py-1 hover:text-blue-600 transition">Products</Link>
          <Link to="#" className="px-4 py-1 hover:text-blue-600 transition">Pricing</Link>
          <Link to="#" className="px-4 py-1 hover:text-blue-600 transition">Resources</Link>
          <Link to="#" className="px-4 py-1 hover:text-blue-600 transition">Docs</Link>
          <Link to="#" className="px-4 py-1 text-blue-600 hover:text-black transition">Blog</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Sidhantpandey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <FaGithub size={18} />
            <span className="text-sm hidden sm:inline">41.5K</span>
          </a>

          <Link
            to="/login"
            className="px-4 py-1.5 text-gray-700 border border-blue-500 rounded-md hover:bg-blue-100 transition text-sm"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

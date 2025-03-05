import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";
import loginImage from "../assets/header_img.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });

      if (res.data.token) {
        // First set the token
        localStorage.setItem("token", res.data.token);

        // Update axios default headers
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        // Then set user data
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);

        toast.success("Login Successful!", { position: "top-right" });
        navigate("/");
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login Failed!", {
        position: "top-right",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center bg-gradient-to-r from-blue-100 to-blue-300 justify-center animate-fade-in-down bg-gray-50">
      <div className="flex w-4/5 max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
        {/* Left Section - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-black text-2xl font-semibold mb-6 text-center">Login</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-xl">
              Login
            </button>
          </form>
          <p className="text-gray-700 text-center mt-6">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-medium">Create one</Link>
          </p>
          <p className="text-gray-700 text-center mt-6">
            <Link to="/reset-password" className="text-blue-600 hover:underline font-medium">Forgot Password?</Link>
          </p>
        </div>

        {/* Right Section - Image/Animation */}
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
          <img src={loginImage} alt="Login Illustration" className="w-3/4 animate-fade-in" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

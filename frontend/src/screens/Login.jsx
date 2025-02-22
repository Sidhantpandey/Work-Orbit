import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";

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
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={submitHandler}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 animate-fade-in-down"
      >
        <h2 className="text-white text-2xl mb-6 text-center">Login</h2>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="w-full p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="w-full p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition duration-200"
        >
          Login
        </button>
        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
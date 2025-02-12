import React, { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";
import {toast} from 'react-toastify'
import {UserContext} from '../context/user.context'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(UserContext)


  const navigate = useNavigate();
  function submitHandler(e) {
    e.preventDefault();
    axios.post("http://localhost:4000/users/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user)
        toast.success("Login Successful!", { position: "top-right" });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.errors || "Login Failed!", {
          position: "top-right",
        });
        console.log(err);
      });
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={submitHandler}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-90 animate-fade-in-down"
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

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";
import registerImage from "../assets/header_img.png"; // Replace with your image/animation

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("/users/register", { name, email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast.success("Registration Successful!", { position: "top-right" });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.errors || "Registration Failed!", {
          position: "top-right",
        });
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="flex w-4/5 max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
        {/* Left Section - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-black text-2xl font-semibold mb-6 text-center">Create an Account</h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
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
              Register Now
            </button>
          </form>
          <p className="text-gray-700 text-center mt-6">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign In</Link>
          </p>
        </div>

        {/* Right Section - Image/Animation */}
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
          <img src={registerImage} alt="Register Illustration" className="w-3/4 animate-fade-in" />
        </div>
      </div>
    </div>
  );
};

export default Register;

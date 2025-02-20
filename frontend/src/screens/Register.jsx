import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("/users/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast.success("Registration Successful!", { position: "top-right" });

        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.errors || "Registraion Failed!", {
          position: "top-right",
        });
        console.log(err);
      });
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 w-full">
      <form
        onSubmit={submitHandler}
        className="bg-gray-800 p-12 rounded-lg shadow-lg w-96 animate-fade-in-down"
      >
        <h2 className="text-white text-2xl mb-6 text-center">Register</h2>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="w-full p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Name"
            required
          />
        </div>
        <div className="mb-6 ">
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
          Register
        </button>
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../components/Loader/Loader.css";
import Navbar from "./Navbar.jsx";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser, projects, fetchProjects, loading } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  // Typing animation states
  const fullText = "Build dreams Lead boldly Inspire "
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const speed = isDeleting ? 40 : 100;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
        }
      } else {
        setDisplayText(fullText.substring(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  function logout() {
    axios
      .get("/users/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          navigate("/login");
          toast.success("Logged Out Successfully", { position: "top-right" });
        }
      })
      .catch(() => {
        toast.error("Logout Failed", { position: "top-right" });
      });
  }

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        if (res.status === 201) {
          fetchProjects();
          setIsModalOpen(false);
          setProjectName("");
          toast.success("Project Created Successfully!", { position: "top-right" });
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Project Creation Failed!", {
          position: "top-right",
        });
      });
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 sm:px-6">
      <Navbar />

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-3xl text-gray-500 mb-2 mt-6 size">Welcome</p>


        <h1 className="text-5xl font-bold mb-5 mt-5 h-20">
          {displayText}
          <span className="border-r-2 border-gray-900 animate-pulse ml-1" />
        </h1>

        <p className="text-gray-600 mb-10 text-2xl">
          Hello, <span className="font-semibold">{user?.name?.split(" ")[0]}</span> 👋
        </p>

        <div className="flex justify-center gap-4 flex-wrap mb-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Create Project
          </button>
          <button
            onClick={() => navigate("/update")}
            className="px-6 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
          >
            Update Profile
          </button>
          <button
            onClick={logout}
            className="px-6 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate("/project", { state: { project } })}
                className="cursor-pointer text-left p-6 rounded border hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                <p className="text-gray-500">{project.users.length} collaborators</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Enter project name"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;

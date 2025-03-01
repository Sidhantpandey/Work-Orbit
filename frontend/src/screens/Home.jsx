import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios.js";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import '../components/Loader/Loader.css'

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser, projects, fetchProjects, loading } =
    useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

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
      .catch((err) => {
        console.error(err);
        toast.error("Logout Failed", { position: "top-right" });
      });
  }

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        if (res.status === 201) {
          fetchProjects(); // Refetch projects after creating
          setIsModalOpen(false);
          setProjectName("");
          toast.success("Project Created Successfully!", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Project Creation Failed!", {
          position: "top-right",
        });
      });
  }

  return (
    <main className="p-4">
      <div className="projects flex flex-wrap gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="project p-4 border border-slate-300 rounded-md"
        >
          Create New Project
          <i className="ri-sticky-note-add-line ml-2"></i>
        </button>

        <button
          onClick={logout}
          className="project p-4 border border-slate-300 rounded-md"
        >
          Logout
          <i className="ri-sticky-note-add-line ml-2"></i>
        </button>

        <button onClick={()=>{navigate('/update')}} className="project p-4 border border-slate-300 rounded-md">
          Update Profile
        </button>

        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white">
             <div className="flex items-center justify-center h-screen w-screen bg-white">
              
          <div className="loader"></div>
          </div>
          </div>
          
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => {
                navigate("/project", {
                  state: { project },
                });
              }}
              className="project p-4 border border-slate-300 rounded-md cursor-pointer"
            >
              <h2 className="font-semibold">{project.name}</h2>
              <div className="flex gap-2">
                <i className="ri-user-fill"></i>
                <p>
                  {project.users.length} <small>Collaborators</small>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="projectName"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
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

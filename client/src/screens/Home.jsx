import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../components/Loader/Loader.css";
import Navbar from "./Navbar.jsx";
import { Zap, Code, Users, Star, ArrowRight, Copy } from "lucide-react";
import {
  FaDiscord,
  FaGithub,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import Testimonals from "./Testimonals.jsx";

const logos = [
  {
    name: "Documenso",
    src: "https://imgs.search.brave.com/ermhmmdWusuW9Vc8K-THsACbQdu5kjw6FmeHdfXpPS4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTgv/MDgvMjMxNTU1MTMv/MTg5Mjc1NTAtNzY4/eDU4Mi5wbmc",
  },
  {
    name: "Grover",
    src: "https://imgs.search.brave.com/K2hqemd7-t4wAJVS2qPYSqr6cmv02SYHkL0u-ehZGXY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90ZW1w/bGF0ZS5jYW52YS5j/b20vRUFEbjJ1VWp4/MEUvMi8wLzQwMHct/ZTZ6N2UzbjI3T28u/anBn",
  },
  {
    name: "Formbricks",
    src: "https://imgs.search.brave.com/Tsx5p38kInagWNEeEKwAAKNt7NxrrvnZZembX0ZgCaQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzY4LzI0LzQ0/LzM2MF9GXzU2ODI0/NDQwM19ad1hjdzRR/aFhaQ3o2ZnZOenM0/dnVlRUU0ZVlFM1Fy/Ui5qcGc",
  },
  {
    name: "dub",
    src: "https://imgs.search.brave.com/OqlrME_xxPBRPJ6k63Mrn09pOFNW4oXYZ956bwppPrA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9keW5h/bWljLmJyYW5kY3Jv/d2QuY29tL2Fzc2V0/L2xvZ28vN2VmMjk1/ZjItNTdiMC00N2Qx/LThiMGMtNjIxMjdk/ODA5NjRlL2xvZ28t/c2VhcmNoLWdyaWQt/MXg_bG9nb1RlbXBs/YXRlVmVyc2lvbj0x/JnY9NjM4NTY5ODA2/NjczMDMwMDAw.jpeg",
  },
  {
    name: "kapa",
    src: "https://imgs.search.brave.com/4la5-eURWE1TG4wGou0QRkJa7spNONay1LiTPwdeyLo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/emFybGEuY29tL2lt/YWdlcy96YXJsYS1j/bGVhbi1saW5lcy0x/eDEtMjQwMHgyNDAw/LTIwMjEwOTA4LTN3/bXlkZzN2YmRtazM0/d3loazR5LnBuZz9j/cm9wPTE6MSxzbWFy/dCZ3aWR0aD0yNTAm/ZHByPTI",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser, projects, fetchProjects, loading } =
    useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const fullText = "Create Amazing Projects ";
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
          setTimeout(() => setIsDeleting(true), 1500);
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
          toast.success("Project Created Successfully!", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Project Creation Failed!", {
          position: "top-right",
        });
      });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Welcome back, {user?.name?.split(" ")[0]}! 👋
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 h-20">
              {displayText}
              <span className="border-r-2 border-purple-500 animate-pulse ml-1" />
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Build, collaborate, and innovate with your team using our powerful project management platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                Create New Project
              </button>
              <button
                onClick={() => navigate("/update")}
                className="bg-white/50 backdrop-blur-sm border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-xl hover:bg-white/80 transition-all duration-300 font-semibold"
              >
                Update Profile
              </button>
              <button
                onClick={logout}
                className="bg-white/50 backdrop-blur-sm border-2 border-red-300 text-red-600 px-8 py-4 rounded-xl hover:bg-white/80 transition-all duration-300 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold mb-2">{projects.length}</div>
            <div className="text-purple-100">Active Projects</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold mb-2">
              {projects.reduce((acc, project) => acc + project.users.length, 0)}
            </div>
            <div className="text-pink-100">Team Members</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-blue-100">Success Rate</div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Projects
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project._id}
                onClick={() => navigate("/project", { state: { project } })}
                className={`cursor-pointer p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  index % 3 === 0
                    ? "bg-gradient-to-br from-purple-400 to-purple-500"
                    : index % 3 === 1
                    ? "bg-gradient-to-br from-pink-400 to-pink-500"
                    : "bg-gradient-to-br from-blue-400 to-blue-500"
                } text-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Code size={24} />
                  </div>
                  <ArrowRight size={20} className="opacity-70" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <div className="flex items-center gap-2 opacity-80">
                  <Users size={16} />
                  <span>{project.users.length} collaborators</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feature Section 1 */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Everything you need to manage projects efficiently and collaborate seamlessly
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Real-time Collaboration</h3>
              <p className="text-purple-100 mb-6">
                Work together in real-time with your team members. See changes instantly and never lose track of progress.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                  <span>John Doe is editing...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                  <span>Sarah Chen joined the project</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Project Progress</span>
                  <span className="text-green-300">87%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full w-[87%]"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm opacity-80">Tasks Done</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm opacity-80">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Developer Friendly
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Developers, by Developers
            </h2>
            <p className="text-gray-600 mb-6">
              Integrate seamlessly with your existing workflow. Use our powerful API and webhooks to automate your processes.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>RESTful API with comprehensive documentation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Webhook support for real-time updates</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>SDK available in multiple languages</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-900 text-green-400 p-6 rounded-2xl font-mono text-sm overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <button
                className="text-gray-400 hover:text-white transition"
                onClick={() => navigator.clipboard.writeText(`const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'New Project',
    description: 'Project description'
  })
});`)}
              >
                <Copy size={16} />
              </button>
            </div>
            <pre className="whitespace-pre-wrap">
{`const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'New Project',
    description: 'Project description'
  })
});

const project = await response.json();
console.log('Project created:', project);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Logo Carousel */}
      <section className="bg-white py-12 mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by teams worldwide</h3>
          <p className="text-gray-600">Join thousands of companies already using our platform</p>
        </div>
        <div className="overflow-hidden">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-16">
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.name}
                className="h-16 opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      <Testimonals />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-20 px-6 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who have already revolutionized their project management process
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
              <Star size={20} />
              Get Started Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">PRODUCT</h4>
              <div className="space-y-3">
                <a href="#" className="block hover:text-white transition">Features</a>
                <a href="#" className="block hover:text-white transition">Pricing</a>
                <a href="#" className="block hover:text-white transition">Integrations</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">RESOURCES</h4>
              <div className="space-y-3">
                <a href="#" className="block hover:text-white transition">Documentation</a>
                <a href="#" className="block hover:text-white transition">API Reference</a>
                <a href="#" className="block hover:text-white transition">Customer Stories</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">SUPPORT</h4>
              <div className="space-y-3">
                <a href="#" className="block hover:text-white transition">Help Center</a>
                <a href="#" className="block hover:text-white transition">Community</a>
                <a href="#" className="block hover:text-white transition">Contact Us</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">COMPANY</h4>
              <div className="space-y-3">
                <a href="#" className="block hover:text-white transition">About</a>
                <a href="#" className="block hover:text-white transition">Blog</a>
                <a href="#" className="block hover:text-white transition">Careers</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500">
                © {new Date().getFullYear()} - All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-xl">
                <FaDiscord className="hover:text-white transition cursor-pointer" />
                <FaXTwitter className="hover:text-white transition cursor-pointer" />
                <FaYoutube className="hover:text-white transition cursor-pointer" />
                <FaWhatsapp className="hover:text-white transition cursor-pointer" />
                <FaGithub className="hover:text-white transition cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create New Project
            </h2>
            <form onSubmit={createProject} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your project name"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition font-medium"
                >
                  Create Project
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